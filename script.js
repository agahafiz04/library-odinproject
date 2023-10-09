// Initialization
const myLibrary = [];

const addButtonModalEl = document.querySelector(".add-button-modal");
const formEl = document.querySelector(".input-container");

const authorInputEl = document.querySelector("#author");
const titleInputEl = document.querySelector("#title");
const pageNumberInputEl = document.querySelector("#page");
const isReadEl = document.querySelector("#isRead");

const cardContainerEl = document.querySelector(".card-container");

const modalEl = document.querySelector(".modal");
const overlayEl = document.querySelector(".overlay");

const addButtonEl = document.querySelector(".add-button");
const dummyButtonEl = document.querySelector(".dummy-button");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
});

addButtonModalEl.addEventListener("click", function () {
  addBookToLibrary();
});

addButtonEl.addEventListener("click", function () {
  modalDisplay("openModal");
});

dummyButtonEl.addEventListener("click", function () {
  if (myLibrary.length <= 0) {
    let theHobbit = new Book(
      "--The Book Title--",
      "--The Author--",
      900,
      "false"
    );
    let harryPotter = new Book("Harry Potter", "J.K. Rowling", 475, "true");
    let theMazeRunner = new Book(
      "The Maze Runner",
      "James Dashner",
      320,
      "false"
    );

    myLibrary.push(theHobbit, harryPotter, theMazeRunner);

    createCard();
    checkCardEl();
  }
});

createCard();
checkCardEl();

// Function Collection
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = isRead;

  // this.isRead = function () {
  //   if (isRead == true) {
  //     this.read = "true";
  //   } else if (isRead == false) {
  //     this.read = "false";
  //   }
  // };

  // this.info = function () {
  //   return `${title} by ${author}, ${pages} pages, ${this.read}`;
  // };
}

Book.prototype.isRead = function () {
  if (isRead == true) {
    this.read = "true";
  } else if (isRead == false) {
    this.read = "false";
  }
};

Book.prototype.info = function () {
  return `${title} by ${author}, ${pages} pages, ${this.read}`;
};

function addBookToLibrary() {
  if (
    authorInputEl.value == "" ||
    titleInputEl.value == "" ||
    pageNumberInputEl.value == ""
  ) {
    return false;
  } else {
    let book = new Book(
      `${titleInputEl.value}`,
      `${authorInputEl.value}`,
      `${pageNumberInputEl.value}`,
      `${isReadEl.checked}`
    );

    myLibrary.push(book);

    createCard();
    checkCardEl();
    resetForm();
    modalDisplay("closeModal");
  }
}

function createCard() {
  const card = document.querySelectorAll(".card");

  card.forEach((item) => {
    if (item !== null) {
      item.remove();
    }
  });

  myLibrary.forEach((item) => {
    const newCard = document.createElement("div");
    const newCardTitle = document.createElement("p");
    const newCardAuthor = document.createElement("p");
    const newCardPages = document.createElement("p");
    const newButtonRead = document.createElement("button");
    const newButtonRemove = document.createElement("button");

    cardContainerEl.appendChild(newCard);
    newCard.classList.add("card");

    newButtonRemove.classList.add("remove-button");

    if (item.read == "true") {
      newButtonRead.classList.add("read-button", "true");
    } else if (item.read == "false") {
      newButtonRead.classList.add("read-button", "false");
    }

    newCard.append(
      newCardTitle,
      newCardAuthor,
      newCardPages,
      newButtonRead,
      newButtonRemove
    );

    newCardTitle.textContent = item.title;
    newCardPages.textContent = `${item.pages} page`;
    newCardAuthor.textContent = item.author;
    newButtonRead.textContent = "Read ?";
    newButtonRemove.textContent = "Remove";
  });
}

function checkCardEl() {
  // Change The Grid Layout
  if (myLibrary.length <= 3) {
    cardContainerEl.classList.add("card-container-change");
  } else {
    cardContainerEl.classList.remove("card-container-change");
  }

  // Grab The Object (And change is Read Value)
  const readButtonEl = document.querySelectorAll(".read-button");
  if (myLibrary.length >= 1) {
    readButtonEl.forEach((readButton) => {
      readButton.addEventListener("click", function () {
        const card = readButton.parentElement;

        const title = card.children[0].textContent;
        const author = card.children[1].textContent;
        const read = card.children[3].classList[1];

        myLibrary.forEach((obj) => {
          if (
            readButton.className.includes("false") &&
            obj.author == author &&
            obj.title == title &&
            obj.read == read
          ) {
            readButton.classList.replace("false", "true");
            obj.read = "true";
          } else if (
            readButton.className.includes("true") &&
            obj.author == author &&
            obj.title == title &&
            obj.read == read
          ) {
            readButton.classList.replace("true", "false");
            obj.read = "false";
          }
        });
      });
    });
  }

  // Removing The Object From Array
  const removeButtonEl = document.querySelectorAll(".remove-button");
  if (myLibrary.length >= 0) {
    removeButtonEl.forEach((removeButton) => {
      removeButton.addEventListener("click", function () {
        console.log("Woy Remove");
        const card = removeButton.parentElement;

        const title = card.children[0].textContent;
        const author = card.children[1].textContent;
        const read = card.children[3].classList[1];

        myLibrary.forEach((obj) => {
          if (obj.author == author && obj.title == title && obj.read == read) {
            const arrayIndex = myLibrary.indexOf(obj);
            myLibrary.splice(arrayIndex, 1);
            createCard();
            checkCardEl();
          }
        });

        console.log(myLibrary);
      });
    });
  }
}

function addForm() {
  const allRequiredInputEl = document.querySelectorAll(
    `input:is(input[type="text"], input[type="number"])`
  );

  allRequiredInputEl.forEach((input) => {
    input.setAttribute("required", "");
  });
}

function resetForm() {
  const allRequiredInputEl = document.querySelectorAll(
    `input:is(input[type="text"], input[type="number"])`
  );

  allRequiredInputEl.forEach((input) => {
    input.removeAttribute("required");
  });

  formEl.reset();
}

function modalDisplay(modalChange) {
  if (modalChange == "openModal") {
    openModal();
  } else if (modalChange == "closeModal") {
    closeModal();
  }
  // Open Modal
  function openModal() {
    modalEl.classList.remove("hidden");
    overlayEl.classList.remove("hidden");

    addForm();
  }

  // Close Modal
  function closeModal() {
    modalEl.classList.add("hidden");
    overlayEl.classList.add("hidden");
  }

  overlayEl.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modalEl.classList.contains("hidden")) {
      closeModal();
    }
  });
}

// Todo List

// Get the array object based on the card (V)
// Implement isRead Object Properties To Change From The Click Button (V)
// Change the readvalue from the click button (V)
// Implement remove option for per card based on the object (V)
// Implement localStorage
