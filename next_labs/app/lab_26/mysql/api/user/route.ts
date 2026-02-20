import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const [rows, fields] = await db.query(
            `SELECT * FROM users`
        );

        console.log(rows);
        console.log(fields);
        return NextResponse.json(rows);
    }
    catch (error) {

    }
}