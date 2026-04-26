import {
  enableValidation,
  resetValidation,
  settings,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import "./index.css";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5b17d03d-6b3f-48ef-81a1-073b72ff2378",
    "Content-Type": "application/json",
  },
});

const editProfileBtn = document.querySelector(".profile__edit-button");
const newPostBtn = document.querySelector(".profile__add-button");
const editAvatarBtn = document.querySelector(".profile__avatar-edit-button");

const editProfileModal = document.querySelector("#edit-profile-modal");
const newPostModal = document.querySelector("#new-post-modal");
const previewModal = document.querySelector("#preview-modal");
const deleteCardModal = document.querySelector("#delete-card-modal");
const editAvatarModal = document.querySelector("#edit-avatar-modal");

const editCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const previewCloseBtn = previewModal.querySelector(".modal__close-btn");
const deleteCloseBtn = deleteCardModal.querySelector(".modal__close-btn");
const avatarCloseBtn = editAvatarModal.querySelector(".modal__close-btn");

const editProfileForm = editProfileModal.querySelector(".modal__form");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const deleteCardForm = deleteCardModal.querySelector(".modal__form");
const editAvatarForm = editAvatarModal.querySelector(".modal__form");

const editProfileSubmitBtn =
  editProfileForm.querySelector(".modal__submit-btn");
const addCardSubmitBtn = addCardFormElement.querySelector(".modal__submit-btn");
const deleteCardSubmitBtn = deleteCardForm.querySelector(".modal__submit-btn");
const editAvatarSubmitBtn = editAvatarForm.querySelector(".modal__submit-btn");

const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input",
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input",
);
const profileAvatarInput = editAvatarModal.querySelector(
  "#profile-avatar-input",
);

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileAvatarEl = document.querySelector(".profile__avatar");

const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const [nameInput, linkInput] =
  addCardFormElement.querySelectorAll(".modal__input");

let selectedCard = null;
let selectedCardId = null;

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");

    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

function closeOnOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeButtonEl = cardElement.querySelector(".card__like-button");
  const deleteButtonEl = cardElement.querySelector(".card__delete-button");

  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  if (data.isLiked) {
    likeButtonEl.classList.add("card__like-button_active");
  }

  likeButtonEl.addEventListener("click", () => {
    const isLiked = likeButtonEl.classList.contains("card__like-button_active");

    const likeRequest = isLiked
      ? api.unlikeCard(data._id)
      : api.likeCard(data._id);

    likeRequest
      .then((updatedCard) => {
        if (updatedCard.isLiked) {
          likeButtonEl.classList.add("card__like-button_active");
        } else {
          likeButtonEl.classList.remove("card__like-button_active");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });

  deleteButtonEl.addEventListener("click", () => {
    selectedCard = cardElement;
    selectedCardId = data._id;
    openModal(deleteCardModal);
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

editProfileBtn.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(editProfileForm, settings);
  openModal(editProfileModal);
});

newPostBtn.addEventListener("click", () => {
  resetValidation(addCardFormElement, settings);
  openModal(newPostModal);
});

editAvatarBtn.addEventListener("click", () => {
  editAvatarForm.reset();
  resetValidation(editAvatarForm, settings);
  openModal(editAvatarModal);
});

editCloseBtn.addEventListener("click", () => closeModal(editProfileModal));
newPostCloseBtn.addEventListener("click", () => closeModal(newPostModal));
previewCloseBtn.addEventListener("click", () => closeModal(previewModal));
deleteCloseBtn.addEventListener("click", () => closeModal(deleteCardModal));
avatarCloseBtn.addEventListener("click", () => closeModal(editAvatarModal));

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", closeOnOverlay);
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  editProfileSubmitBtn.textContent = "Saving...";

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((userData) => {
      profileNameEl.textContent = userData.name;
      profileDescriptionEl.textContent = userData.about;
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editProfileSubmitBtn.textContent = "Save";
    });
});

addCardFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addCardSubmitBtn.textContent = "Saving...";

  api
    .addCard({
      name: nameInput.value,
      link: linkInput.value,
    })
    .then((cardData) => {
      const cardElement = getCardElement(cardData);
      cardsList.prepend(cardElement);

      addCardFormElement.reset();
      closeModal(newPostModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addCardSubmitBtn.textContent = "Create";
    });
});

deleteCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  deleteCardSubmitBtn.textContent = "Deleting...";

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteCardModal);
      selectedCard = null;
      selectedCardId = null;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      deleteCardSubmitBtn.textContent = "Delete";
    });
});

editAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  editAvatarSubmitBtn.textContent = "Saving...";

  api
    .updateAvatar({
      avatar: profileAvatarInput.value,
    })
    .then((userData) => {
      profileAvatarEl.src = userData.avatar;
      profileAvatarEl.alt = userData.name;
      editAvatarForm.reset();
      closeModal(editAvatarModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editAvatarSubmitBtn.textContent = "Save";
    });
});

api
  .getAppData()
  .then(([userData, cards]) => {
    profileNameEl.textContent = userData.name;
    profileDescriptionEl.textContent = userData.about;
    profileAvatarEl.src = userData.avatar;
    profileAvatarEl.alt = userData.name;

    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
  })
  .catch((err) => {
    console.error(err);
  });

enableValidation(settings);
