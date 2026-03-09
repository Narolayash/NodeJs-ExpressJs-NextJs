'use client'

import React, { ReactEventHandler, useState } from 'react'

function BasicCal() {
    const [result, setResult] = useState(0);

    const [dis, setDis] = useState(0);
    const [op, setOp] = useState('');

    const handleNumberPress = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (op === '')
            console.log(e)
            // setDis(dis * 10 + e)
    }

    return (
        <>
            <div className="calculator max-w-xs mx-auto mt-16 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <span>display cache</span>
                <input
                    type="text"
                    className="display w-full mb-4 p-3 text-right text-2xl font-mono bg-gray-100 rounded focus:outline-none border border-gray-300"
                    readOnly
                    name='displayBox'
                    value={ dis }
                />
                <div className="buttons grid grid-cols-4 gap-3">
                    <button 
                        className="py-3 bg-gray-200 rounded hover:bg-gray-300 font-semibold text-lg"
                        value={7}
                        onClick={handleNumberPress}
                    >
                        7
                    </button>
                    <button 
                        className="py-3 bg-gray-200 rounded hover:bg-gray-300 font-semibold text-lg"
                        value={8}
                        onClick={handleNumberPress}
                    >
                        8
                    </button>
                    <button 
                        className="py-3 bg-gray-200 rounded hover:bg-gray-300 font-semibold text-lg"
                        value={9}
                        onClick={handleNumberPress}
                    >
                        9
                    </button>
                    <button className="py-3 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold text-lg">/</button>

                    <button 
                        className="py-3 bg-gray-200 rounded hover:bg-gray-300 font-semibold text-lg"
                        value={4}
                        onClick={handleNumberPress}
                    >
                        4
                    </button>
                    <button 
                        className="py-3 bg-gray-200 rounded hover:bg-gray-300 font-semibold text-lg"
                        value={5}
                        onClick={handleNumberPress}
                    >
                        5
                    </button>
                    <button 
                        className="py-3 bg-gray-200 rounded hover:bg-gray-300 font-semibold text-lg"
                        value={6}
                        onClick={handleNumberPress}
                    >
                        6
                    </button>
                    <button className="py-3 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold text-lg">*</button>

                    <button 
                        className="py-3 bg-gray-200 rounded hover:bg-gray-300 font-semibold text-lg"
                        value={1}
                        onClick={handleNumberPress}
                    >
                        1
                    </button>
                    <button 
                        className="py-3 bg-gray-200 rounded hover:bg-gray-300 font-semibold text-lg"
                        value={2}
                        onClick={handleNumberPress}
                    >
                        2
                    </button>
                    <button 
                        className="py-3 bg-gray-200 rounded hover:bg-gray-300 font-semibold text-lg"
                        value={3}
                        onClick={handleNumberPress}
                    >
                        3
                    </button>
                    <button className="py-3 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold text-lg">-</button>

                    <button 
                        className="py-3 bg-gray-200 rounded hover:bg-gray-300 font-semibold text-lg"
                        value={0}
                        onClick={handleNumberPress}
                    >
                        0
                    </button>
                    <button className="py-3 bg-gray-200 rounded hover:bg-gray-300 font-semibold text-lg">.</button>
                    <button className="py-3 bg-green-500 text-white rounded hover:bg-green-600 font-bold text-lg col-span-1">=</button>
                    <button className="py-3 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold text-lg">+</button>
                </div>
            </div>
        </>
    )
}

export default BasicCal