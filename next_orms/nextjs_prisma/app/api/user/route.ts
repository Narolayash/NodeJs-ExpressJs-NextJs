import { prisma } from "@/lib/prisma_mariadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest) {
    const users = await prisma.users.findMany();
    return NextResponse.json({
        success: true,
        message: 'All user fetch successfully',
        data: users
    })
}
