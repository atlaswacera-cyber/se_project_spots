const editProfilebtn = document.querySelector(".edit__profile-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editCloseBtn = editProfileModal.querySelector(".edit__close-btn");

const newPostBtn = document.querySelector(".profile__newpost-close-btn");
const NewPostModal = document.querySelector("#newpost-modal");
const newPostCloseBtn = NewPostModal.querySelector(".modal__close-btn");

editProfileBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});
editCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  NewPostModal.classList.add("modal_is-opened");
});
newPostCloseBtn.addEventListener("click", function () {
  NewPostModal.classList.remove("modal_is-opened");
});
