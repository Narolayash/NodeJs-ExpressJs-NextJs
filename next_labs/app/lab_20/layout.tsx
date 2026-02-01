import Link from 'next/link';
import React, { Children } from 'react'

function Lab_20_Layout({ children } : { children: React.ReactNode }) {
    return (
        <>
            <div className='row'>
                <div className="col-2 border border-primary">
                    logo
                </div>
                <div className="col border border-primary">
                    <Link href="/lab_20/home">Home</Link> &nbsp;
                    <Link href="/lab_20/contact">Contact</Link> &nbsp;
                    <Link href="/lab_20/about">About</Link> &nbsp;
                </div>
            </div>

            <div className='row'>
                <div className="col-3 border border-primary">
                    side bar
                </div>
                <div className="col border border-primary">
                    { children }
                </div>
            </div>

            <div className='row'>
                <div className="col border border-primary">
                    footer
                </div>
            </div>
        </>
    );
}

export default Lab_20_Layout