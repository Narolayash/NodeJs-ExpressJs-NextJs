import { useState, useEffect } from 'react';
import { booksAPI } from '../services/api';
import Modal from '../components/Modal';
import Badge from '../components/Badge';

export default function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: '',
        isbn: '',
        totalCopies: 0,
        availableCopies: 0,
    });

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            const response = await booksAPI.getAll();
            setBooks(response.data || []);
        } catch (error) {
            alert('Error loading books: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingBook) {
                await booksAPI.update(editingBook._id, formData);
            } else {
                await booksAPI.create(formData);
            }
            setShowModal(false);
            resetForm();
            loadBooks();
        } catch (error) {
            alert('Error saving book: ' + error.message);
        }
    };

    const handleEdit = (book) => {
        setEditingBook(book);
        setFormData({
            title: book.title,
            author: book.author,
            category: book.category || '',
            isbn: book.isbn || '',
            totalCopies: book.totalCopies,
            availableCopies: book.availableCopies,
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this book?')) return;
        try {
            await booksAPI.delete(id);
            // Optimistic update or reload
            setBooks(books.filter(b => b._id !== id));
            await loadBooks();
        } catch (error) {
            alert('Error deleting book: ' + error.message);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            author: '',
            category: '',
            isbn: '',
            totalCopies: 0,
            availableCopies: 0,
        });
        setEditingBook(null);
    };

    const handleOpenModal = () => {
        resetForm();
        setShowModal(true);
    };

    if (loading) {
        return (
            <div className="flex-center" style={{ minHeight: '400px' }}>
                <p className="text-muted">Loading books...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="page-header">
                <div className="flex-between">
                    <div>
                        <h1 className="page-title">Books</h1>
                        <p className="page-description">Manage your library book collection</p>
                    </div>
                    <button className="btn btn-primary" onClick={handleOpenModal}>
                        ➕ Add Book
                    </button>
                </div>
            </div>

            <div className="card">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>ISBN</th>
                                <th>Total Copies</th>
                                <th>Available</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center text-muted">
                                        No books found. Add your first book!
                                    </td>
                                </tr>
                            ) : (
                                books.map((book) => (
                                    <tr key={book._id}>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.category || '-'}</td>
                                        <td>{book.isbn || '-'}</td>
                                        <td>{book.totalCopies}</td>
                                        <td>{book.availableCopies}</td>
                                        <td>
                                            <Badge status={book.status} type="book" />
                                        </td>
                                        <td>
                                            <div className="flex gap-sm">
                                                <button
                                                    className="btn btn-sm btn-secondary"
                                                    onClick={() => handleEdit(book)}
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(book._id)}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    resetForm();
                }}
                title={editingBook ? 'Edit Book' : 'Add New Book'}
            >
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Title *</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Author *</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Category</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">ISBN</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.isbn}
                            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Total Copies *</label>
                        <input
                            type="number"
                            className="form-input"
                            value={formData.totalCopies}
                            onChange={(e) => setFormData({ ...formData, totalCopies: parseInt(e.target.value) || 0 })}
                            min="0"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Available Copies *</label>
                        <input
                            type="number"
                            className="form-input"
                            value={formData.availableCopies}
                            onChange={(e) => setFormData({ ...formData, availableCopies: parseInt(e.target.value) || 0 })}
                            min="0"
                            required
                        />
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                                setShowModal(false);
                                resetForm();
                            }}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {editingBook ? 'Update Book' : 'Add Book'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
