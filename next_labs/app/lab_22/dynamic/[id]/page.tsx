import React from 'react'

async function Dynamic_Route_Demo_Page({ params } : { params: Promise<{ id: string }>}) {
    const { id } = await params;

    return (
        <>
            <h1>This page id is { id }</h1>
        </>
    )
}

export default Dynamic_Route_Demo_Page