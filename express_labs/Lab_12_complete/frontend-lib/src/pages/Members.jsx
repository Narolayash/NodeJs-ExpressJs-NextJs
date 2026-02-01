import { useState, useEffect } from 'react';
import { membersAPI } from '../services/api';
import Modal from '../components/Modal';
import Badge from '../components/Badge';

export default function Members() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        rollNo: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        loadMembers();
    }, []);

    const loadMembers = async () => {
        try {
            const response = await membersAPI.getAll();
            setMembers(response.data || []);
        } catch (error) {
            alert('Error loading members: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingMember) {
                await membersAPI.update(editingMember._id, formData);
            } else {
                await membersAPI.create(formData);
            }
            setShowModal(false);
            resetForm();
            loadMembers();
        } catch (error) {
            alert('Error saving member: ' + error.message);
        }
    };

    const handleEdit = (member) => {
        setEditingMember(member);
        setFormData({
            name: member.name,
            rollNo: member.rollNo,
            email: member.email,
            phone: member.phone || '',
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this member?')) return;
        try {
            await membersAPI.delete(id);
            // Optimistic update
            setMembers(members.filter(m => m._id !== id));
            await loadMembers();
        } catch (error) {
            alert('Error deleting member: ' + error.message);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            rollNo: '',
            email: '',
            phone: '',
        });
        setEditingMember(null);
    };

    const handleOpenModal = () => {
        resetForm();
        setShowModal(true);
    };

    if (loading) {
        return (
            <div className="flex-center" style={{ minHeight: '400px' }}>
                <p className="text-muted">Loading members...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="page-header">
                <div className="flex-between">
                    <div>
                        <h1 className="page-title">Members</h1>
                        <p className="page-description">Manage library members</p>
                    </div>
                    <button className="btn btn-primary" onClick={handleOpenModal}>
                        ➕ Add Member
                    </button>
                </div>
            </div>

            <div className="card">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll No</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Joined Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center text-muted">
                                        No members found. Add your first member!
                                    </td>
                                </tr>
                            ) : (
                                members.map((member) => (
                                    <tr key={member._id}>
                                        <td>{member.name}</td>
                                        <td>{member.rollNo}</td>
                                        <td>{member.email}</td>
                                        <td>{member.phone || '-'}</td>
                                        <td>
                                            <Badge status={member.status} type="member" />
                                        </td>
                                        <td>{new Date(member.joinedDate).toLocaleDateString()}</td>
                                        <td>
                                            <div className="flex gap-sm">
                                                <button
                                                    className="btn btn-sm btn-secondary"
                                                    onClick={() => handleEdit(member)}
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(member._id)}
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
                title={editingMember ? 'Edit Member' : 'Add New Member'}
            >
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Name *</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Roll Number *</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.rollNo}
                            onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email *</label>
                        <input
                            type="email"
                            className="form-input"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input
                            type="tel"
                            className="form-input"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                            {editingMember ? 'Update Member' : 'Add Member'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
