const display = document.querySelector("#display");
const addButton =  document.querySelector("#add");
const popup = document.querySelector("#popup");
const submitButton = document.querySelector("#submit");
const form = document.querySelector("form");

const myLibrary = [{
    title: "title1",
    author: "author1",
    pages: 100,
    read: "No"
},
{
    title: "title2",
    author: "author2",
    pages: 200,
    read: "No"
}
];

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
    let deleteButton = document.createElement("button");
    let toggleStatus = document.createElement("div");

    let title = document.createElement("div");
    let author = document.createElement("div");
    let pages = document.createElement("div");
    let read = book.read;
    title.textContent = `Title: ${book.title}`;
    author.textContent = `Author: ${book.author}`;
    pages.textContent = `Pages: ${book.pages}`;

    deleteButton.textContent = "Delete";
    // deleteButton.setAttribute("class", "delete");
    deleteButton.addEventListener("click", () => deleteBook(card));
    toggleStatus.textContent = `${read}`;
    toggleStatus.addEventListener("click", () => {
        (read === "Read")? read = "Not yet read": read = "Read";
        toggleStatus.textContent = read;
    });

    // card.setAttribute("class", "card");
    // card.textContent = `Title: ${book.title} Author: ${book.author}
    // Pages: ${book.pages}`;
    card.appendChild(title), card.appendChild(author), card.appendChild(pages);
    card.appendChild(toggleStatus);
    card.appendChild(deleteButton);
    display.appendChild(card);
}

addButton.addEventListener("click", () => {
    popup.showModal();
})

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

// function toggleStatus(button) {
    
// }