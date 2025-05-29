import React from 'react';

function BookList({ books, onEdit, onDelete }) {
  const handleDeleteClick = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sách này không?')) {
      onDelete(id);
    }
  };

  return (
    <div className="book-list">
      {books.length === 0 ? (
        <p className="no-books">Không có sách nào.</p>
      ) : (
        books.map((book) => (
          <div key={book.id} className="book-card">
            <img
              src={book.image || '/images/default.jpg'}
              alt={book.title}
              className="book-image"
            />
            <div className="book-details">
              <h3>{book.title}</h3>
              <p>Tác giả: {book.author}</p>
              <p>Năm XB: {book.year}</p>
            </div>
            <div className="book-actions">
              <button className="edit-btn" onClick={() => onEdit(book)}>
                Sửa
              </button>
              <button className="delete-btn" onClick={() => handleDeleteClick(book.id)}>
                Xóa
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default BookList;