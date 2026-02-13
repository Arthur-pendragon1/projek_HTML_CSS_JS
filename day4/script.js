document.addEventListener('DOMContentLoaded', function() {
    const bookForm = document.getElementById('bookForm');
    const bookList = document.getElementById('bookList');
    const submitBtn = document.getElementById('submitBtn');
    let books = JSON.parse(localStorage.getItem('books')) || [];
    let editIndex = -1;

    function renderBooks() {
        bookList.innerHTML = '';
        books.forEach((book, index) => {
            const bookItem = document.createElement('div');
            bookItem.className = 'book-item';
            bookItem.innerHTML = `
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>Penulis: ${book.author}</p>
                    <p>Tahun: ${book.year}</p>
                </div>
                <div class="book-actions">
                    <button class="btn btn-edit" onclick="editBook(${index})">Edit</button>
                    <button class="btn btn-delete" onclick="deleteBook(${index})">Hapus</button>
                </div>
            `;
            bookList.appendChild(bookItem);
        });
    }

    function saveBooks() {
        localStorage.setItem('books', JSON.stringify(books));
    }

    window.addBook = function() {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const year = document.getElementById('year').value;

        if (title && author && year) {
            if (editIndex === -1) {
                books.push({ title, author, year: parseInt(year) });
            } else {
                books[editIndex] = { title, author, year: parseInt(year) };
                editIndex = -1;
                submitBtn.textContent = 'Tambah Buku';
            }
            saveBooks();
            renderBooks();
            bookForm.reset();
        }
    };

    window.editBook = function(index) {
        const book = books[index];
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('year').value = book.year;
        editIndex = index;
        submitBtn.textContent = 'Update Buku';
    };

    window.deleteBook = function(index) {
        if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
            books.splice(index, 1);
            saveBooks();
            renderBooks();
        }
    };

    bookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addBook();
    });

    renderBooks();
});