const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  
    res.send(JSON.stringify(books,null,4)); value
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  const book = books[isbn];

  if (book) {
      res.send(JSON.stringify(book, null, 4));
  } else {
      res.status(404).send("Libro no encontrado con ese ISBN.");
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const authorRequested = req.params.author;
    const matchedBooks = [];

    // Obtener todas las claves del objeto books
    const bookKeys = Object.keys(books);

    // Recorrer todos los libros y verificar el autor
    bookKeys.forEach((key) => {
        const book = books[key];
        if (book.author.toLowerCase() === authorRequested.toLowerCase()) {
            matchedBooks.push(book);
        }
    });

    // Responder con los libros encontrados o mensaje si no hay coincidencias
    if (matchedBooks.length > 0) {
        res.send(JSON.stringify(matchedBooks, null, 4));
    } else {
        res.status(404).send("No se encontraron libros de ese autor.");
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {

    const titleRequested = req.params.title;
    const matchedBooks = [];

    // Obtener todas las claves del objeto books
    const bookKeys = Object.keys(books);
    bookKeys.forEach((key) => {
        const book = books[key];
        if (book.title.toLowerCase() === titleRequested.toLowerCase()) {
            matchedBooks.push(book);
        }
    });
    if (matchedBooks.length > 0) {
        res.send(JSON.stringify(matchedBooks, null, 4));
    } else {
        res.status(404).send("No se encontraron libros de ese titulo.");
    }
});

//  Get book review
public_users.get('/review/:title', function (req, res) {
    const titleRequested = req.params.title;
    const matchedReviews = [];
  
    const bookKeys = Object.keys(books);
    bookKeys.forEach((key) => {
      const book = books[key];
      if (book.title.toLowerCase() === titleRequested.toLowerCase()) {
        matchedReviews.push(book.reviews);
      }
    });
  
    if (matchedReviews.length > 0) {
      res.send(JSON.stringify(matchedReviews, null, 4));
    } else {
      res.status(404).send("No se encontraron reseñas para ese título.");
    }
  });




module.exports.general = public_users;
