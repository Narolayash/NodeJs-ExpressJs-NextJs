export default function Layout({ children, currentPage, onNavigate }) {
    return (
        <div className="app-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h1 className="sidebar-title">📚 Library MS</h1>
                    <p className="text-muted" style={{ fontSize: '0.875rem' }}>Management System</p>
                </div>

                <nav>
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                                onClick={() => onNavigate('dashboard')}
                            >
                                <span>📊</span>
                                <span>Dashboard</span>
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${currentPage === 'books' ? 'active' : ''}`}
                                onClick={() => onNavigate('books')}
                            >
                                <span>📖</span>
                                <span>Books</span>
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${currentPage === 'members' ? 'active' : ''}`}
                                onClick={() => onNavigate('members')}
                            >
                                <span>👥</span>
                                <span>Members</span>
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${currentPage === 'issues' ? 'active' : ''}`}
                                onClick={() => onNavigate('issues')}
                            >
                                <span>📋</span>
                                <span>Issues</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="main-content">
                {children}
            </main>
        </div>
    );
}
