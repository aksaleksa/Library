const display = document.querySelector("#display");
const addButton =  document.querySelector("#add");
const popup = document.querySelector("#popup");
const submitButton = document.querySelector("#submit");
const form = document.querySelector("form");
const closeButton = document.querySelector("#close");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");

// If the user has interacted with the app before, retrieve their items from localStorage.
let myLibrary = JSON.parse(window.localStorage.getItem("Library"));
if (!myLibrary) myLibrary = [];

class Book {
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

// Create each new book with the correct HTML elements.
function displayBooks(index) {
    while (index < myLibrary.length) {
        let book = myLibrary[index];
        let card = document.createElement("div");
        let cardButtons = document.createElement("div");
        let deleteButton = document.createElement("button");
        let toggleButton = document.createElement("button");
    
        let title = document.createElement("div");
        let author = document.createElement("div");
        let pages = document.createElement("div");
        title.textContent = `${book.title}`;
        author.textContent = `${book.author}`;
        pages.textContent = `${book.pages} pages`;
    
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete", "btn")
        deleteButton.addEventListener("click", () => deleteBook(card));
        toggleButton.textContent = `${book.read}`;
        toggleButton.classList.add("btn");
        if(book.read === "Read") {
            toggleButton.classList.add("btn-success");
        }
        else {
            toggleButton.classList.add("btn-light");
        }

        toggleButton.addEventListener("click", () => toggle(book, toggleButton));
        cardButtons.setAttribute("id", "card-buttons");
    
        card.appendChild(title), card.appendChild(author), card.appendChild(pages);
        cardButtons.appendChild(toggleButton);
        cardButtons.appendChild(deleteButton);
        card.appendChild(cardButtons);
        display.appendChild(card);

        index++
    }
}

addButton.addEventListener("click", () => {
    popup.showModal();
    closeButton.addEventListener("click", () => {
        form.reset();
        popup.close();
    });
});

title.addEventListener("input", () => {
    if (!title.value) {
        title.setCustomValidity("Please add a book title");
    }
    else {
        title.setCustomValidity("");
    }
})

author.addEventListener("input", () => {
    if (!author.value) {
        author.setCustomValidity("Please include the author's name");
    }
    else {
        author.setCustomValidity("");
    }
})

pages.addEventListener("input", () => {
    if (!pages.value) {
        pages.setCustomValidity("Please add the book's length");
    }
    else if (pages.value < 0) {
        pages.setCustomValidity("The number of pages must positive");
    }
    else {
        pages.setCustomValidity("");
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (title.value && author.value && pages.value) {
        let title = document.querySelector("#title").value;
        let author = document.querySelector("#author").value;
        let pages = document.querySelector("#pages").value;
        let read;
    
        (document.querySelector("#read").checked === true)? read = "Read": read = "Not yet read";
        addBookToLibrary(title, author, pages, read);
        displayBooks(myLibrary.length - 1);
    
        form.reset();
        popup.close();
    }
})

function addBookToLibrary(title, author, pages, read){
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    window.localStorage.setItem("Library", JSON.stringify(myLibrary));
}

function deleteBook(card) {
    myLibrary.splice(myLibrary.indexOf(card), 1);
    display.removeChild(card);
    window.localStorage.setItem("Library", JSON.stringify(myLibrary));
}

function toggle(book, button) {
    if (book.read === "Read") {
        book.read = "Not yet read";
        button.classList.remove("btn-success");
        button.classList.add("btn-light");
    }
    else {
        book.read = "Read";
        button.classList.remove("btn-light");
        button.classList.add("btn-success");
    }
    button.textContent = book.read;
    window.localStorage.setItem("Library", JSON.stringify(myLibrary));
}

// When the app initially loads, render all books in the library. Otherwise render only
// the latest addition to avoid repeats.
if (myLibrary.length) displayBooks(0);