import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from 'zod'

// defina um schema para validar um input 


const UserSchema = z
    .object({
        username: z.string().min(1, 'Username is required').max(100),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must have than 8 characters'),
    })


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = UserSchema.parse(body)

        // ver se email existe
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });
        if (existingUserByEmail) {
            return NextResponse.json({
                user: null,
                message: "Já existe um usuário com este email",
                status: 409
            })
        }

        // ver se o nome de usuario ja existe

        const existingUserByUserName = await db.user.findUnique({
            where: { username: username }
        });
        if (existingUserByUserName) {
            return NextResponse.json({
                user: null,
                message: "Já existe um alguem com este nome de usurio",
                status: 409
            })
        }

        // CRIANDO NOVO USUARIO
        const hashedPassword = await hash(password, 10)

        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            }
        })

        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({
            user: rest,
            massage: "Usuário criado com sucesso",
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