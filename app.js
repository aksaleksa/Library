const display = document.querySelector("#display");
const addButton =  document.querySelector("#add");
const popup = document.querySelector("#popup");
const submitButton = document.querySelector("#submit");
const form = document.querySelector("form");
const closeButton = document.querySelector("#close");

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read){
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
    let book = myLibrary[myLibrary.length - 1];
    let card = document.createElement("div");
    let deleteButton = document.createElement("div");
    let toggleButton = document.createElement("div");

    let title = document.createElement("div");
    let author = document.createElement("div");
    let pages = document.createElement("div");
    title.textContent = `${book.title}`;
    author.textContent = `${book.author}`;
    pages.textContent = `${book.pages} pages`;

    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("class", "delete");
    deleteButton.addEventListener("click", () => deleteBook(card));
    toggleButton.textContent = `${book.read}`;
    if(book.read === "Read") {
        toggleButton.setAttribute("class", "read");
    }
    else {
        toggleButton.setAttribute("class", "unread");
    }
    toggleButton.addEventListener("click", () => toggle(book, toggleButton));

    card.appendChild(title), card.appendChild(author), card.appendChild(pages);
    card.appendChild(toggleButton);
    card.appendChild(deleteButton);
    display.appendChild(card);
}

addButton.addEventListener("click", () => {
    popup.showModal()
    closeButton.addEventListener("click", () => {
        form.reset();
        popup.close();
    });
});

submitButton.addEventListener("click", (e) => {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read;

    (document.querySelector("#read").checked === true)? read = "Read": read = "Not yet read";
    addBookToLibrary(title, author, pages, read);
    displayBooks();

    form.reset();
    popup.close();
    e.preventDefault();
})


function deleteBook(card) {
    myLibrary.splice(myLibrary.indexOf(card), 1);
    display.removeChild(card);
}

function toggle(book, button) {
    if (book.read === "Read") {
        book.read = "Not yet read";
        button.removeAttribute("class", "read");
        button.setAttribute("class", "unread");
    }
    else {
        book.read = "Read";
        button.removeAttribute("class", "unread");
        button.setAttribute("class", "read");
    }
    button.textContent = book.read;
}