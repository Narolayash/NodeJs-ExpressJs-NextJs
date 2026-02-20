'use client';

import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Content */}
            <main className="p-8">

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <KpiCard title="Users" value="1,245" />
                    <KpiCard title="Orders" value="856" />
                    <KpiCard title="Revenue" value="₹ 2,45,000" />
                    <KpiCard title="Tickets" value="19" />
                </div>

                {/* Panels */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Recent Users */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="font-semibold mb-4">Recent Users</h2>
                        <ul className="space-y-3">
                            <ListItem name="Rahul Sharma" email="rahul@gmail.com" />
                            <ListItem name="Neha Patel" email="neha@gmail.com" />
                            <ListItem name="Amit Verma" email="amit@gmail.com" />
                        </ul>
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-white rounded-2xl shadow p-6 lg:col-span-2">
                        <h2 className="font-semibold mb-4">Recent Orders</h2>

                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-gray-500 border-b">
                                    <th className="py-2 text-left">Order ID</th>
                                    <th className="py-2 text-left">Customer</th>
                                    <th className="py-2 text-left">Amount</th>
                                    <th className="py-2 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <OrderRow id="#1023" name="Rahul" amount="₹1,200" status="Paid" />
                                <OrderRow id="#1024" name="Neha" amount="₹3,400" status="Pending" />
                                <OrderRow id="#1025" name="Amit" amount="₹2,100" status="Failed" />
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

/* ---------------- Components ---------------- */

function KpiCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow transition">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
    );
}

function ListItem({ name, email }: { name: string; email: string }) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="font-medium">{name}</p>
                <p className="text-xs text-gray-500">{email}</p>
            </div>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                View
            </span>
        </div>
    );
}

function OrderRow({
    id,
    name,
    amount,
    status,
}: {
    id: string;
    name: string;
    amount: string;
    status: 'Paid' | 'Pending' | 'Failed';
}) {
    const statusColor =
        status === 'Paid'
            ? 'text-green-600'
            : status === 'Pending'
                ? 'text-yellow-600'
                : 'text-red-600';

    return (
        <tr className="border-b last:border-none">
            <td className="py-2">{id}</td>
            <td className="py-2">{name}</td>
            <td className="py-2">{amount}</td>
            <td className={`py-2 font-medium ${statusColor}`}>
                {status}
            </td>
        </tr>
    );
}
