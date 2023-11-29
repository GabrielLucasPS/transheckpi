import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { deliverId, delivered } = body
        let date = new Date()


        await db.entrega.update({
            where: {
                deliverId: deliverId
            },
            data: {
                delivered: delivered,
                updateUt: date
            }
        })


        return NextResponse.json({
            massage: "Deliver feita",
            status: 200
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            massage: "Alguma coisa deu errado ao editar :(",
            status: 400
        });
    }
}