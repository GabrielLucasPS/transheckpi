import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from 'zod'



export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const { deliverId } = body


        await db.entrega.delete({
            where: {
                deliverId: deliverId
            }
        })


        return new Response(null, { status: 204 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            massage: "Alguma coisa deu errado ao Deletar :(",
            status: 400
        });
    }
}



export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { deliverId, curretLocation } = body
        let date = new Date()


        await db.entrega.update({
            where: {
                deliverId: deliverId
            },
            data: {
                curretLocation: curretLocation,
                updateUt: date
            }
        })


        return NextResponse.json({
            massage: "edição sucesso",
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