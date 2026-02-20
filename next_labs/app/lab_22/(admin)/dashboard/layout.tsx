import React from 'react';
import Link from 'next/link';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Topbar */}
            <header className="bg-white shadow-sm">
                <div className="flex items-center justify-between px-8 py-4">
                    <h2 className="font-bold">Admin Panel</h2>

                    <nav className="flex items-center gap-6 text-sm">
                        <span className="text-sm text-gray-600">admin@site.com</span>
                        <Link
                            href="/lab_22/login"
                            className="text-red-500 hover:underline"
                        >
                            Logout
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Page Content */}
            <main className="p-8">
                {children}
            </main>
        </div>
    );
}
