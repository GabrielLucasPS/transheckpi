import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from 'zod'

const EntregaSchema = z
    .object({
        driverName: z.string().min(1, 'Entregador Necessario').max(100),
        clientName: z.string().min(1, "Nome do Cliente Necessario"),
        destination: z.string().min(1, "Destino Necessario"),
        description: z.string().min(1, "Descrição Necessaria"),

    })

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { driverName, clientName, destination, description } = EntregaSchema.parse(body)

        // ver se o Entregador ja esta em uma entrega 

        /*const existingEntregaByDriverName = await db.entrega.findFirst({
            where: { driverName: driverName }
        });
        if (existingEntregaByDriverName) {
            return NextResponse.json({
                user: null,
                message: "Você ja esta em uma entrega",
                status: 409
            })
        }
        */


        // CRIANDO NOVA ENTREGA

        const newEntrega = await db.entrega.create({
            data: {
                driverName,
                clientName,
                destination,
                description,
            }
        })

        const { ...rest } = newEntrega;

        return NextResponse.json({
            entrega: rest,
            massage: "Entrega criada com sucesso",
            status: 201
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            massage: "Alguma coisa deu errado :(",
            status: 400
        });
    }
}