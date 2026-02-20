import Link from 'next/link'
import React, { ReactNode } from 'react'

function Lab_21_Layout({ children } : { children : ReactNode}) {
    return (
        <>
            <div>
                <Link href='/lab_21/template_1'>Template 1</Link> &nbsp;
                <Link href='/lab_21/template_2'>Template 2</Link> &nbsp;
                <Link href='/lab_21/template_3'>Template 3</Link> &nbsp;
            </div>
            { children }
        </>
    )
}

export default Lab_21_Layout