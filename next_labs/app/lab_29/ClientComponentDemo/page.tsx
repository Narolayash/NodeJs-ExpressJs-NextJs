'use client'

import React, { useState } from 'react'

function ClinetComponent() {
    const [count, setCount] = useState(0);

    return (
        <>
            <h2>This is a demo for clinet side component.</h2>
            <p>Current Count: {count}</p>
            <button
                className="px-3 py-2 bg-blue-600 text-white rounded-md font-bold text-lg hover:bg-blue-700 transition-colors"
                onClick={() => setCount(count + 1)}
            >
                increment
            </button>
        </>
    )
}

export default ClinetComponent