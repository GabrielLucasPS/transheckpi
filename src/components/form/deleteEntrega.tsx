'use client';

import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { useSession } from 'next-auth/react';
import { useState } from 'react';



type Props = {
    deletarId: {
        id: number;
        driverName: string;
        clientName: string;
        createdAt: Date;
        updateUt: Date;
        curretLocation: string | null;
        destination: string;
        description: string;
        delivered: boolean | null;
        deliverId: number;
    }
}


const DeletarForm = (deletarId: Props): JSX.Element => {

    const router = useRouter()

    const { toast } = useToast()
    //const [idDelete, setID] = useState(deletarId.deletarId.deliverId);
    let idDelete = deletarId.deletarId.deliverId


    const onSubmit = async (deliverId: number) => {
        console.log(deliverId)
        const response = await fetch('/api/entregahandler', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deliverId: deliverId,
            })
        })

        if (response.ok) {
            router.refresh();
        } else {
            toast({
                title: "Erro",
                description: "Oops! Alguma coisa deu errado :(",
                variant: 'destructive'
            })
        }
    };


    return (
        <form>
            <div className=''>
                <button className='text-xl text-slate-200 px-4 py-2 bg-red-700 rounded-xl text-center hover:bg-red-500' onClick={() => onSubmit(idDelete)}>Deletar</button>

            </div>
        </form>
    )

};

export default DeletarForm;



/*'use client';

import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { useSession } from 'next-auth/react';



const FormSchema = z.object({
    driverName: z.string().min(1, "Entregador Necessario"),
    clientName: z.string().min(1, "Nome do Cliente Necessario"),
    destination: z.string().min(1, "Destino Necessario"),
    description: z.string().min(1, "Descrição Necessaria"),
    curretLocation: z.string().min(1, "Local atual Necessario")
});
type Props = {
    entrega: {
        id: number;
        driverName: string;
        clientName: string;
        createdAt: Date;
        updateUt: Date;
        curretLocation: string | null;
        destination: string;
        description: string;
        delivered: boolean | null;
        deliverId: number;
    }
}

const DeletarForm = (entrega: number): Prosp => {

    const { data: session } = useSession()

    const router = useRouter()

    const { toast } = useToast()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            driverName: session?.user.username,
            clientName: '',
            destination: '',
            description: '',
            curretLocation: '',
        },
    });


    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const response = await fetch('/api/newEntrega', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                driverName: values.driverName,
                clientName: values.clientName,
                destination: values.destination,
                description: values.description,
                curretLocation: values.curretLocation
            })
        })

        if (response.ok) {
            router.refresh();
        } else {
            toast({
                title: "Erro",
                description: "Oops! Alguma coisa deu errado :(",
                variant: 'destructive'
            })
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <div className='space-y-2'>
                    <FormField
                        control={form.control}
                        name='clientName'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome do Cliente</FormLabel>
                                <FormControl>
                                    <Input placeholder='Nome do Cliente' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className='w-full mt-6' type='submit'>
                    Começar
                </Button>
            </form>

        </Form>
    );
};

export default DeletarForm;
 */