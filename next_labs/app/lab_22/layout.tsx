import Link from 'next/link'
import React from 'react'

function Layout_lab_22({ children } : { children : React.ReactNode }) {
    return (
        <div>
            <Link href="/lab_22">root</Link> &nbsp;
            <Link href="/lab_22/dashboard">Dashboard</Link> &nbsp;
            <Link href="/lab_22/login">Login</Link> &nbsp;
            <Link href="/lab_22/profile">Profile</Link> &nbsp;
            <Link href="/lab_22/dynamic/0">DefaultDyanaminZero</Link> &nbsp;
            <Link href="/lab_22/dynamic_prime/0/10">Prime Numbers 0 To 10</Link> &nbsp;
            <Link href="/lab_22/pagination/1">Pagination Demo</Link> &nbsp;
            { children }
        </div>
    )
}

export default Layout_lab_22