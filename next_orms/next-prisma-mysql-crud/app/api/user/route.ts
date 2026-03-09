import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const users = await prisma.users.findMany();

    return NextResponse.json(users);
}

// export async function POST(request: NextRequest) {
//     // const data = await request.json();

//     const user = await prisma.users.create({
//         data: {
//             name: "Yash Narola",
//             email: "yashnarola@gmail.com",
//             password: '123456',
//             age: 15,
//             gender: 'Male',
//             city: 'Surat',
//         }
//     })

//     return NextResponse.json(user);
// }
