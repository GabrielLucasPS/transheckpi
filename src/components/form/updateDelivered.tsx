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
    entrega: {
        deliverId: number
        delivered: boolean | null;
    }
}


const UpdatedeDelivered = (entrega: Props): JSX.Element => {

    const router = useRouter()

    const [deliverStatus, setDeliverStatus] = useState(entrega.entrega.delivered)
    let DeliverID = entrega.entrega.deliverId;

    const { toast } = useToast()


    const onSubmit = async (status: boolean | null, id: number) => {

        let newStatus = !status

        console.log(status, id)
        const response = await fetch('/api/delivered', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                delivered: newStatus,
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
                <button className='text-xl text-slate-900 px-6 py-3 bg-orange-500-500 rounded-md bg-cyan-500 hover:bg-cyan-300 font-bold duration-300 w-[100%]' onClick={() => onSubmit(deliverStatus, DeliverID)}>Finalizar Entrega</button>
            </div>
        </form>
    )

};

export default UpdatedeDelivered;
