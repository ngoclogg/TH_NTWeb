import React, { useState, useEffect } from 'react';

function BookForm({ onAdd, onUpdate, editingBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState(''); // Will store base64 string
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setYear(editingBook.year.toString());
      setImage(editingBook.image || ''); // Load existing base64 or empty
    } else {
      setTitle('');
      setAuthor('');
      setYear('');
      setImage('');
    }
    setErrors({});
  }, [editingBook]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Tiêu đề là bắt buộc';
    if (!author.trim()) newErrors.author = 'Tác giả là bắt buộc';
    if (!year || isNaN(year) || year < 1000 || year > new Date().getFullYear())
      newErrors.year = `Năm xuất bản phải từ 1000 đến ${new Date().getFullYear()}`;
    return newErrors;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set base64 string
      };
      reader.readAsDataURL(file); // Convert to base64
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const bookData = {
      id: editingBook ? editingBook.id : Date.now(),
      title: title.trim(),
      author: author.trim(),
      year: parseInt(year, 10),
      image: image || '', // Use base64 or empty string
    };

    if (editingBook) {
      onUpdate(bookData);
    } else {
      onAdd(bookData);
    }

    setTitle('');
    setAuthor('');
    setYear('');
    setImage('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2>{editingBook ? 'Sửa Sách' : 'Thêm Sách'}</h2>
      <div className="form-group">
        <label>Tiêu đề:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập tiêu đề"
          className={errors.title ? 'input-error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      <div className="form-group">
        <label>Tác giả:</label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Nhập tác giả"
          className={errors.author ? 'input-error' : ''}
        />
        {errors.author && <span className="error-message">{errors.author}</span>}
      </div>
      <div className="form-group">
        <label>Năm XB:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Nhập năm xuất bản"
          className={errors.year ? 'input-error' : ''}
        />
        {errors.year && <span className="error-message">{errors.year}</span>}
      </div>
      <div className="form-group">
        <label>Hình ảnh:</label>
        <div className="image-upload">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="imageUpload"
            style={{ display: 'none' }} // Hide the default file input
          />
          <label htmlFor="imageUpload" className="upload-btn">
            Tải lên hình ảnh
          </label>
          {image && <p className="image-preview">Hình ảnh đã chọn</p>}
        </div>
        {errors.image && <span className="error-message">{errors.image}</span>}
      </div>
      <button type="submit">{editingBook ? 'Cập nhật' : 'Thêm'}</button>
    </form>
  );
}

export default BookForm;