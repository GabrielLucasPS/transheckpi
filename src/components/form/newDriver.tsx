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



const FormSchema = z.object({
    driverName: z.string().min(1, "Entregador Necessario"),
    clientName: z.string().min(1, "Nome do Cliente Necessario"),
    destination: z.string().min(1, "Destino Necessario"),
    description: z.string().min(1, "Descrição Necessaria"),
    curretLocation: z.string().min(1, "Local atual Necessario")
});

const NewEntregaForm = () => {

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
                    <FormField
                        control={form.control}
                        name='destination'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Destino da Entrega</FormLabel>
                                <FormControl>
                                    <Input placeholder='Uberlandia' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='curretLocation'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Local Atual da Entrega</FormLabel>
                                <FormControl>
                                    <Input placeholder='São Paulo' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição da Entrega</FormLabel>
                                <FormControl>
                                    <Input placeholder='Descrição da entrega' {...field} />
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

export default NewEntregaForm;
