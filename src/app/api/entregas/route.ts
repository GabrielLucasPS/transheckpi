import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import z from "zod";



const EntregasSchema = z
    .object({
        username: z.string().min(1, 'Username is required').max(100),
    })


export async function GET(req: Request) {

    try {
        const body = await req.json();
        const { username } = EntregasSchema.parse(body)

        const entregas = await db.entrega.findMany({
            where: {
                clientName: username,
            },
        })
        return NextResponse.json(entregas, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Não foi possivel pegas as entregas" }, { status: 500 })
    }
}