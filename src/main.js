// Variables that target DOM elements
var form = document.querySelector('.form-view');
var homeView = document.querySelector('.home-view');
var savedView = document.querySelector('.saved-view');
var coverTitle = document.querySelector('.cover-title');
var descriptorOne = document.querySelector('.tagline-1');
var descriptorTwo = document.querySelector('.tagline-2');
var coverImageSource = document.querySelector('.cover-image');
var savedCoversSection = document.querySelector('.saved-covers-section');

// Variables that target HTML button elements
var homeButton = document.querySelector('.home-button');
var makeNewButton = document.querySelector('.make-new-button');
var coverButton = document.querySelector('.random-cover-button');
var viewSavedButton = document.querySelector('.view-saved-button');
var saveCoverButton = document.querySelector('.save-cover-button');
var createNewBookButton = document.querySelector('.create-new-book-button');

// Variables that target input fields
var coverInputValue = document.querySelector('.user-cover');
var titleInputValue = document.querySelector('.user-title');
var firstDescriptorInputValue = document.querySelector('.user-desc1');
var secondDescriptorInputValue = document.querySelector('.user-desc2');

// We've provided a few variables below
var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];
var currentCover;

// Event listeners
window.addEventListener('load', changeCover);
homeButton.addEventListener('click', displayHome);
coverButton.addEventListener('click', changeCover);
saveCoverButton.addEventListener('click', saveCover);
makeNewButton.addEventListener('click', displayForm);
viewSavedButton.addEventListener('click', displaySaved);
savedCoversSection.addEventListener('dblclick', removeCover);
createNewBookButton.addEventListener('click', displayCustomCover);

// Calculates a random index number
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

// Randomly selects values from the respective arrays, 
// applys them to a class and inserts them on the DOM
function changeCover() {
  currentCover = new Cover(
    covers[getRandomIndex(covers)],
    titles[getRandomIndex(titles)],
    descriptors[getRandomIndex(descriptors)],
    descriptors[getRandomIndex(descriptors)]
  );

  coverImageSource.src = currentCover.cover;
  coverTitle.innerText = currentCover.title;
  descriptorOne.innerText = currentCover.tagline1;
  descriptorTwo.innerText = currentCover.tagline2;
}

// Applies values from the arrays to an
// instantied class and inserts them on the DOM
function makeNewCover() {
  currentCover = new Cover(
    covers[covers.length - 1],
    titles[titles.length - 1],
    descriptors[descriptors.length - 2],
    descriptors[descriptors.length - 1]
  );

  coverImageSource.src = currentCover.cover;
  coverTitle.innerText = currentCover.title;
  descriptorOne.innerText = currentCover.tagline1;
  descriptorTwo.innerText = currentCover.tagline2;
}

// Displays 'Form' view
function displayForm() {
  form.classList.remove('hidden');
  displayHomeButton();
  hideHome();
  hideCoverButton();
  hideSaveCoverButton();
  hideSavedCoversPage();
}

// Displays 'Saved Covers' view
function displaySaved() {
  savedView.classList.remove('hidden');
  displaySavedCovers();
  displayHomeButton();
  hideForm();
  hideHome();
  hideCoverButton();
  hideSaveCoverButton();
}

// Display 'Home' view
function displayHome() {
  homeView.classList.remove('hidden');
  hideHomeButton();
  displaySaveCoverButton();
  displayCoverButton();
  hideForm();
  hideSavedCoversPage();
}

// Applies the user's input to create a new cover and displays it
function displayCustomCover(event) {
  event.preventDefault();
  displayHome();
  storeCoverInputValue();
  storeTitleInputValue();
  storeDescriptorOneInputValue();
  storeDescriptorTwoInputValue();
  makeNewCover();
}

// Displays the 'Home' button
function displayHomeButton() {
  homeButton.classList.remove('hidden');
}

// Displays the 'Save Cover' button
function displaySaveCoverButton() {
  saveCoverButton.classList.remove('hidden');
}

// Displays the 'Show New Random Cover' button
function displayCoverButton() {
  coverButton.classList.remove('hidden');
}

// Hides the 'Form' view
function hideForm() {
  form.classList.add('hidden');
}

// Hides the 'Home' button
function hideHomeButton() {
  homeButton.classList.add('hidden');
}

// Hides the 'Home' view
function hideHome() {
  homeView.classList.add('hidden');
}

// Hides the 'Show New Random Cover' button
function hideCoverButton() {
  coverButton.classList.add('hidden');
}

// Hides the 'Save Cover' button
function hideSaveCoverButton() {
  saveCoverButton.classList.add('hidden');
}

// Hides the 'Saved Covers' view
function hideSavedCoversPage() {
  savedView.classList.add('hidden');
}

// Gets the value from the 'Cover' input field
// and stores it in the covers array
function storeCoverInputValue() {
  var coverValue = coverInputValue.value;
  covers.push(coverValue);
}

// Gets the value fom the 'Title' input field
// and stores it in the titles array
function storeTitleInputValue() {
  var titleValue = titleInputValue.value;
  titles.push(titleValue);
}

// Gets the value from the 'First descriptor' input
// field and stores it in the descriptors array 
function storeDescriptorOneInputValue() {
  var descriptorOneValue = firstDescriptorInputValue.value;
  descriptors.push(descriptorOneValue);
}

// Gets the value from the 'Second descriptor' input
// field and stores it in the descriptors array
function storeDescriptorTwoInputValue() {
  var descriptorTwoValue = secondDescriptorInputValue.value;
  descriptors.push(descriptorTwoValue);
}

// Does not add the cover to the 'savedCovers' array if one already exists (prevents duplicates)
function saveCover() {
  if (!savedCovers.includes(currentCover)) {
    savedCovers.push(currentCover);
  }
}

// Creates mini sized covers and displays them on the 'Saved Covers' view
function displaySavedCovers() {
  savedCoversSection.innerHTML = ``;
  for (var i = 0; i < savedCovers.length; i++) {
    savedCoversSection.innerHTML += 
    `<section class="mini-cover">
       <img class="cover-image" id=${savedCovers[i].id} src=${savedCovers[i].cover} alt="No Image Available">
       <h2 class="cover-title">${savedCovers[i].title}</h2>
       <h3 class="tagline">A tale of <span class="tagline-1">${savedCovers[i].tagline1}</span> and <span class="tagline-2">${savedCovers[i].tagline2}</span></h3>
     </section>`
  }
}

// Removes a cover when the user double clicks it
function removeCover(event) {
  var coverId = event.target.id;
  for (var i = 0; i < savedCovers.length; i++) {
    if (`${savedCovers[i].id}` === coverId) {
      savedCovers.splice(i, 1);
    }
  }
  displaySavedCovers();
}
