const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editprofileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editprofileDescriptionInput.value = profileDescriptionEl.textContent;
  editProfileModal.classList.add("modal_is-opened");
});

editCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

editProfileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editprofileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
});

const addCardFormElement = newPostModal.querySelector(".modal__form");
const inputs = addCardFormElement.querySelectorAll(".modal__input");
const nameInput = inputs[0];
const linkInput = inputs[1];

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log(nameInput.value);
  console.log(linkInput.value);
  newPostModal.classList.remove("modal_is-opened");
  nameInput.value = "";
  linkInput.value = "";
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);
