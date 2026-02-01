import { useState, useEffect } from 'react';
import { issuesAPI, booksAPI, membersAPI } from '../services/api';
import Modal from '../components/Modal';
import Badge from '../components/Badge';

export default function Issues() {
    const [issues, setIssues] = useState([]);
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        bookId: '',
        memberId: '',
        dueDate: '',
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [issuesRes, booksRes, membersRes] = await Promise.all([
                issuesAPI.getAll(),
                booksAPI.getAll(),
                membersAPI.getAll(),
            ]);
            setIssues(issuesRes.data || []);
            setBooks(booksRes.data || []);
            setMembers(membersRes.data || []);
        } catch (error) {
            alert('Error loading data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await issuesAPI.create(formData);
            setShowModal(false);
            resetForm();
            loadData();
        } catch (error) {
            console.error('Issue Error:', error);
            // Construct a better error message
            let errorMessage = error.message;
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
                if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
                    errorMessage = error.response.data.errors.map(err => err.msg).join('\n');
                }
            } else if (error.errors && Array.isArray(error.errors)) {
                // Direct error object processing if api.js bubbles it up differently
                errorMessage = error.errors.map(err => err.msg).join('\n');
            }

            alert('Error issuing book:\n' + errorMessage);
        }
    };

    const handleReturn = async (id) => {
        if (!confirm('Mark this book as returned?')) return;
        try {
            await issuesAPI.returnBook(id);
            loadData();
        } catch (error) {
            alert('Error returning book: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this issue record?')) return;
        try {
            await issuesAPI.delete(id);
            loadData();
        } catch (error) {
            alert('Error deleting issue: ' + error.message);
        }
    };

    const resetForm = () => {
        setFormData({
            bookId: '',
            memberId: '',
            dueDate: '',
        });
    };

    const handleOpenModal = () => {
        resetForm();
        // Set default due date to 7 days from now
        const date = new Date();
        date.setDate(date.getDate() + 7);
        const defaultDate = date.toISOString().split('T')[0];

        setFormData(prev => ({ ...prev, dueDate: defaultDate }));
        setShowModal(true);
    };

    // Get default due date (7 days from now)
    const getDefaultDueDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        return date.toISOString().split('T')[0];
    };

    if (loading) {
        return (
            <div className="flex-center" style={{ minHeight: '400px' }}>
                <p className="text-muted">Loading issues...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="page-header">
                <div className="flex-between">
                    <div>
                        <h1 className="page-title">Issues</h1>
                        <p className="page-description">Manage book issues and returns</p>
                    </div>
                    <button className="btn btn-primary" onClick={handleOpenModal}>
                        ➕ Issue Book
                    </button>
                </div>
            </div>

            <div className="card">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Book</th>
                                <th>Member</th>
                                <th>Issue Date</th>
                                <th>Due Date</th>
                                <th>Return Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {issues.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center text-muted">
                                        No issues found. Issue your first book!
                                    </td>
                                </tr>
                            ) : (
                                issues.map((issue) => (
                                    <tr key={issue._id}>
                                        <td>
                                            {issue.book?.title || 'N/A'}
                                            <br />
                                            <small className="text-muted">
                                                {issue.book?.author || ''}
                                            </small>
                                        </td>
                                        <td>
                                            {issue.member?.name || 'N/A'}
                                            <br />
                                            <small className="text-muted">
                                                {issue.member?.rollNo || ''}
                                            </small>
                                        </td>
                                        <td>{new Date(issue.issueDate).toLocaleDateString()}</td>
                                        <td>
                                            {issue.dueDate
                                                ? new Date(issue.dueDate).toLocaleDateString()
                                                : '-'
                                            }
                                        </td>
                                        <td>
                                            {issue.returnDate
                                                ? new Date(issue.returnDate).toLocaleDateString()
                                                : '-'
                                            }
                                        </td>
                                        <td>
                                            <Badge status={issue.status} type="issue" />
                                        </td>
                                        <td>
                                            <div className="flex gap-sm">
                                                {issue.status === 'ISSUED' && (
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => handleReturn(issue._id)}
                                                    >
                                                        ✓ Return
                                                    </button>
                                                )}
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(issue._id)}
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
                title="Issue Book"
            >
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Select Book *</label>
                        <select
                            className="form-select"
                            value={formData.bookId}
                            onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
                            required
                        >
                            <option value="">-- Select a book --</option>
                            {books
                                .filter(book => book.availableCopies > 0)
                                .map((book) => (
                                    <option key={book._id} value={book._id}>
                                        {book.title} by {book.author} (Available: {book.availableCopies})
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Select Member *</label>
                        <select
                            className="form-select"
                            value={formData.memberId}
                            onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                            required
                        >
                            <option value="">-- Select a member --</option>
                            {members
                                .filter(member => member.status === 'ACTIVE')
                                .map((member) => (
                                    <option key={member._id} value={member._id}>
                                        {member.name} ({member.rollNo})
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Due Date</label>
                        <input
                            type="date"
                            className="form-input"
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
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
                            Issue Book
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
