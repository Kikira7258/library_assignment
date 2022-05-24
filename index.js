// - PORT
// --------------------
// Base Variables
// --------------------
require('dotenv').config({path: './secrets.env'})
const express = require('express');
const path = require('path')
const conn = require('./lib/db')

const app = express()
// --------------------


// --------------------
// View engine and static files
// --------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));
// --------------------


// --------------------
// ROUTES SECTION | GET ROUTES
// --------------------
// - homepage
app.get('/', (req, res) => {
    res.render('index')
});

// - books [getting book information from database]
app.get('/books', (req, res) => {
    conn.query('SELECT * FROM books ORDER BY id', (err, rows, fields) => {
        if(!err) {
            res.render('books', 
            {
                books: [
                    {
                        book_nm: "name",
                        img_url: "image",
                        author_nm: "author"
                    }
                ],
                data: rows
            })
        } else {
            res.redirect('/')
        }
    })
});



// active books | protectected route
app.get('/active-books', (req, res) => {
    conn.query('SELECT * FROM active_books ORDER BY id', (err, rows, fields) => {
        if(!err) {
            res.render('active_book', {
                details: [
                    {
                        student_id: "students_id",
                        // student_id: req.params.id,
                        book_id: "book_id"
                    }
                ],
                data: rows
            })
        }
    })
})
// --------------------













// - port
const port = process.env.PORT || 4200
app.listen(port, () => console.log(`Listening on Port: ${4200}`));