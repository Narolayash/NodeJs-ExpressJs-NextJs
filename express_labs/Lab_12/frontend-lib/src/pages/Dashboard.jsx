import { useState, useEffect } from 'react';
import { booksAPI, membersAPI, issuesAPI } from '../services/api';

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalBooks: 0,
        availableBooks: 0,
        totalMembers: 0,
        activeMembers: 0,
        activeIssues: 0,
        returnedIssues: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const [booksRes, membersRes, issuesRes] = await Promise.all([
                booksAPI.getAll(),
                membersAPI.getAll(),
                issuesAPI.getAll(),
            ]);

            const books = booksRes.data || [];
            const members = membersRes.data || [];
            const issues = issuesRes.data || [];

            setStats({
                totalBooks: books.length,
                availableBooks: books.filter(b => b.status === 'AVAILABLE').length,
                totalMembers: members.length,
                activeMembers: members.filter(m => m.status === 'ACTIVE').length,
                activeIssues: issues.filter(i => i.status === 'ISSUED').length,
                returnedIssues: issues.filter(i => i.status === 'RETURNED').length,
            });
        } catch (error) {
            console.error('Error loading stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-center" style={{ minHeight: '400px' }}>
                <p className="text-muted">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Dashboard</h1>
                <p className="page-description">Overview of your library management system</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-label">Total Books</div>
                    <div className="stat-value">{stats.totalBooks}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-label">Available Books</div>
                    <div className="stat-value">{stats.availableBooks}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-label">Total Members</div>
                    <div className="stat-value">{stats.totalMembers}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-label">Active Members</div>
                    <div className="stat-value">{stats.activeMembers}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-label">Active Issues</div>
                    <div className="stat-value">{stats.activeIssues}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-label">Returned Books</div>
                    <div className="stat-value">{stats.returnedIssues}</div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Quick Stats</h3>
                </div>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <div className="flex-between">
                        <span className="text-muted">Books Utilization</span>
                        <span className="text-primary">
                            {stats.totalBooks > 0
                                ? `${Math.round((stats.totalBooks - stats.availableBooks) / stats.totalBooks * 100)}%`
                                : '0%'
                            }
                        </span>
                    </div>
                    <div className="flex-between">
                        <span className="text-muted">Active Member Rate</span>
                        <span className="text-primary">
                            {stats.totalMembers > 0
                                ? `${Math.round(stats.activeMembers / stats.totalMembers * 100)}%`
                                : '0%'
                            }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
