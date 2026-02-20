import Card from '@/Components/Card'
import facuties from '@/Data/Faculty.json'
import React from 'react'

type faculty = {
    id: number;
    name: string;
    qualification: string;
    img: string;
};

function Lab_23_Page() {
    return (
        <>
        <div className='d-flex p-3 gap-3'>
            {facuties.map((faculty: faculty) => (
                <Card 
                    key={faculty.id}
                    id={faculty.id} 
                    title={faculty.name} 
                    description={faculty.qualification} 
                    imageUrl={faculty.img}
                />
            ))}
        </div>
        </>
    )
}

export default Lab_23_Page
