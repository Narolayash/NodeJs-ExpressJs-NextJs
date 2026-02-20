import React from 'react';
import Link from 'next/link';

export default function ClientProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mx-auto p-3">

            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-bold">My Profile</h2>
                <p className="text-gray-600">
                    Manage your personal information
                </p>

                {/* Profile Tabs */}
                <div className="flex gap-6 mt-4 text-sm border-b">
                    <Link
                        href="/client/profile"
                        className="pb-2 border-b-2 border-blue-600 font-medium"
                    >
                        Profile Info
                    </Link>
                    <Link
                        href="/client/profile/security"
                        className="pb-2 text-gray-500 hover:text-black"
                    >
                        Security
                    </Link>
                    <Link
                        href="/client/profile/settings"
                        className="pb-2 text-gray-500 hover:text-black"
                    >
                        Settings
                    </Link>
                </div>
            </div>

            {/* Profile Content */}
            <div>
                {children}
            </div>
        </div>
    );
}
