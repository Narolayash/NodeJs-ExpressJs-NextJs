import Link from 'next/link'
import React from 'react'

function Lab20Layout({ children }: { children: React.ReactNode }) {
    return <>
        <Link href="/lab_20/home">Home</Link> &nbsp;
        <Link href="/lab_20/about">About</Link> &nbsp;
        <Link href="/lab_20/contact">Contact</Link> &nbsp;
        

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">MyApp</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">Profile</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>

        <div className="container-fluid">
            <div className="row">

                <nav className="col-md-3 col-lg-2 d-md-block sidebar p-3">
                    <h6 className="text-muted">Menu</h6>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Users</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Reports</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Settings</a>
                        </li>
                    </ul>
                </nav>

                <main className="col-md-9 col-lg-10 content">
                    {children}
                </main>
            </div>
        </div>

        <footer className="footer">
            © 2026 MyApp. All rights reserved.
        </footer>
    </>
}

export default Lab20Layout
