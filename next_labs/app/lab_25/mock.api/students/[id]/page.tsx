import Image from 'next/image'
import React from 'react'

async function OneStudent_Page({ params } : { params : Promise<{ id : string}>}) {
    const { id } = await params
    const data = await fetch(`https://68ca44d5430c4476c348cdf4.mockapi.io/students/${id}`, {
        cache: "no-store",
    })

    const student = await data.json();

    return (
        <>
            <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl overflow-hidden p-6">

                {/* Profile Image */}
                <div className="flex justify-center">
                    <div className="relative w-32 h-32">
                        <Image
                            src={student.avatar}
                            alt={student.name}
                            fill
                            className="rounded-full object-cover"
                        />
                    </div>
                </div>

                {/* Student Info */}
                <div className="text-center mt-6">
                    <h2 className="text-2xl font-bold">{student.name}</h2>
                    <p className="text-gray-500 mt-1">{student.city}</p>

                    <div className="mt-4">
                        <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm">
                            {student.department}
                        </span>
                    </div>

                    <p className="mt-4 text-gray-600">
                        📞 {student.phone}
                    </p>
                </div>
            </div>
        </>
    )
}

export default OneStudent_Page