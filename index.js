const library = document.getElementById("library");
const form = document.getElementById("new-book-form");

const myLibrary = [];

function Book(title, author, type, length, bookID) {
    this.title = title;
    this.author = author;
    this.type = type;
    this.length = length;
    this.bookID = bookID;
    this.isRead = false;
}

function addBookToLibrary(title, author, type, length) {
    const bookID = crypto.randomUUID();
    const newBook = new Book(title, author, type, length, bookID);
    myLibrary.push(newBook);
    renderLibrary();
}

function renderLibrary() {
    library.innerHTML = ""; // Clear the current display
    myLibrary.forEach((book) => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.textContent = `${book.title} by ${book.author} (${book.type}, ${book.length} pages)`;
        library.appendChild(bookElement);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            renderLibrary();
        });
        bookElement.appendChild(deleteButton);
        const readButton = document.createElement("button");
        readButton.textContent = book.isRead ? "you read this √" : "you didn't read this x";
        readButton.addEventListener("click", () => {
            book.isRead = !book.isRead;

            renderLibrary();
        });
        bookElement.appendChild(readButton);
    });
}

// Handle form submission
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page refresh

    // Get form input values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const type = document.getElementById("type").value;
    const length = parseInt(document.getElementById("length").value); // Convert to number

    // Add book to library
    addBookToLibrary(title, author, type, length);


    // Reset form
    form.reset();
});

// Initial book
addBookToLibrary("Cat and the Hat", "Dr. Seuss", "Fiction", 20);