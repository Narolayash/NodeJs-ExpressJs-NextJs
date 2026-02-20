'use client';

import { useState } from 'react';

export default function ClientProfilePage() {
    const [name, setName] = useState('Rahul Sharma');
    const [email, setEmail] = useState('rahul@gmail.com');
    const [phone, setPhone] = useState('9876543210');

    const handleSave = () => {
        alert('Profile updated!');
        // TODO: API call
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">
                Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <label className="block text-sm mb-1">Full Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Enter full name"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                        value={email}
                        disabled
                        className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Phone</label>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Enter phone number"
                    />
                </div>
            </div>

            <div className="mt-6">
                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}