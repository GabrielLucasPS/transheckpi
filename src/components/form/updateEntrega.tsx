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
    currentLocation: {
        curretLocation: string | null,
        deliverId: number
    }
}


const UpdateForm = (currentLocation: Props): JSX.Element => {

    const router = useRouter()

    const [location, setLocation] = useState(currentLocation.currentLocation.curretLocation as string)
    let DeliverID = currentLocation.currentLocation.deliverId;

    const { toast } = useToast()


    const onSubmit = async (newlocation: string | null, id: number) => {
        console.log(newlocation, id)
        const response = await fetch('/api/entregahandler', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                curretLocation: newlocation,
                deliverId: id,
            })
        })

        if (response.ok) {
            console.log('ok')
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
            <div className='flex flex-1 justify-center '>
                <input
                    type="text"
                    placeholder={location}
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="rounded-md mr-2 text-xl font-bold outline-none px-2"
                />
                <button className='text-xl text-slate-900 px-6 py-3 bg-orange-500-500 rounded-md bg-cyan-500 hover:bg-cyan-300 font-bold duration-300' onClick={() => onSubmit(location, DeliverID)}>Editar</button>
            </div>
        </form>
    )

};

export default UpdateForm;



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