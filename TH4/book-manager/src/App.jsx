import React, { useState, useEffect } from 'react';
import BookList from './components/BookList.jsx';
import BookForm from './components/BookForm.jsx';
import ReactPaginate from 'react-paginate';
import './App.css';

function App() {
  const [books, setBooks] = useState(() => {
    const stored = localStorage.getItem('books');
    return stored ? JSON.parse(stored) : [
      { id: 1, title: 'React Cơ Bản', author: 'Nguyễn Văn A', year: 2023, image: '/images/book1.jpg' },
      { id: 2, title: 'JavaScript Nâng Cao', author: 'Trần Thị B', year: 2022, image: '/images/book2.jpg' },
    ];
  });
  const [editingBook, setEditingBook] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 14;

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
    setShowAddModal(false);
  };

  const handleUpdateBook = (updatedBook) => {
    setBooks(books.map((b) => (b.id === updatedBook.id ? updatedBook : b)));
    setEditingBook(null);
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  const handleEditClick = (book) => {
    setEditingBook(book);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageCount = Math.ceil(filteredBooks.length / booksPerPage);
  const offset = currentPage * booksPerPage;
  const currentBooks = filteredBooks.slice(offset, offset + booksPerPage);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>Quản Lý Sách</h1>
        <p className="slogan">Thư viện số - Nơi tri thức lan tỏa</p>
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
        <ul>
          <li>Sách</li>
          <li>Sách đã mượn</li>
          <li>Thêm sách mới</li>
          <li>Album ảnh</li>
          <li>Video</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Tìm kiếm theo tiêu đề hoặc tác giả..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="add-btn-below-search" onClick={() => setShowAddModal(true)}>
            Thêm
          </button>
        </div>

        {/* Add Book Modal */}
        {showAddModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-btn" onClick={() => setShowAddModal(false)}>
                ×
              </span>
              <BookForm
                onAdd={handleAddBook}
                onUpdate={handleUpdateBook}
                editingBook={null}
              />
            </div>
          </div>
        )}

        {/* Edit Book Modal */}
        {editingBook && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-btn" onClick={() => setEditingBook(null)}>
                ×
              </span>
              <BookForm
                onAdd={handleAddBook}
                onUpdate={handleUpdateBook}
                editingBook={editingBook}
              />
            </div>
          </div>
        )}

        <div className="book-list">
          <BookList
            books={currentBooks}
            onEdit={handleEditClick}
            onDelete={handleDeleteBook}
          />
        </div>
        {pageCount > 1 && (
          <ReactPaginate
            previousLabel={'Trước'}
            nextLabel={'Sau'}
            pageCount={pageCount}
            onPageChange={({ selected }) => setCurrentPage(selected)}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        )}
      </main>
    </div>
  );
}

export default App;