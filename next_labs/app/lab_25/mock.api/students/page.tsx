import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Student = {
    id: string
    name: string
    city: string
    department: string
    avatar: string
}

async function Students_Page() {
    const data = await fetch("https://68ca44d5430c4476c348cdf4.mockapi.io/students", {
        cache: "no-store"
    });

    const students: Student[] = await data.json();

    return (
        <>
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold text-center mb-6">Student List</h1>

                <div className="grid md:grid-cols-3 gap-6">
                    {students.map((student: Student) => (
                        <div
                            key={student.id}
                            className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition"
                        >
                            <Image
                                src={student.avatar}
                                alt={student.name}
                                width={200}
                                height={200}
                                className="rounded-full"
                            />
                            <h2 className="text-xl font-semibold">{student.name}</h2>
                            <p className="text-gray-600">{student.city}</p>
                            <span className="inline-block mt-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                                {student.department}
                            </span> <br />
                            <Link href={"/Lab_25/mock.api/students/" + student.id}>
                                <button className="mt-3 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                                    More info
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Students_Page