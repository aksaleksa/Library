const display = document.querySelector("#display");
const addButton =  document.querySelector("#add");
const popup = document.querySelector("#popup");
const submitButton = document.querySelector("#submit");

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
    card.textContent = `Title: ${book.title} \n Author: ${book.author} \n
    Pages: ${book.pages} \n Read: ${book.read}`;
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
    (document.querySelector("#read").checked === true)? read = "Yes": read = "No";
    addBookToLibrary(title, author, pages, read);
    displayBooks();
    popup.close();
    e.preventDefault();
})