'use client'

import { authOptions } from "@/lib/auth";
import { getServerSession, Session } from "next-auth";
import { useState } from "react";
import DeletarForm from "./form/deleteEntrega";
import UpdatedeDelivered from "./form/updateDelivered";
import UpdateForm from "./form/updateEntrega";

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
    },
    session: Session | null
}


const TodasEntregas = ({ entrega, session }: Props) => {
    const { updateUt, clientName, deliverId, destination, description, curretLocation, delivered } = entrega;

    return (
        <div>
            <div className='mb-[20px] p-4 bg-[#0f172a] border-2 border-black rounded-md w-[900px] mr-[20px]'>
                <div className="w-[100%] flex justify-between mb-8 items-center">
                    <h3 className='text-4xl font-bold text-cyan-300 mb-4'>{deliverId}</h3>
                    {session?.user.role === "ADMIN" ?
                        <DeletarForm deletarId={entrega} />
                        :
                        <div className="hidden">hidden</div>
                    }
                </div>
                <div className=" justify-between flex mb-4">
                    <p className='text-xl font-bold text-gray-50'>Cliente:</p>
                    <p className='text-xl font-bold text-cyan-300'> {clientName}</p>
                </div>
                <div className=" justify-between flex mb-4">
                    <p className='text-xl font-bold text-gray-50'>Destino:</p>
                    <p className='text-xl font-bold text-cyan-300'> {destination}</p>
                </div>
                <div className=" justify-between flex mb-4">

                    {session?.user.role === "ADMIN" ?
                        <div className="flex justify-between items-center w-[100%]">
                            {entrega.delivered == true ?
                                <div className="flex justify-between items-center w-[100%]">
                                    <p className='text-xl font-bold text-gray-50'>Ultima localização Registrada:</p>
                                    <p className='text-xl font-bold text-cyan-300 '> {curretLocation}</p>
                                </div>
                                :
                                <div className="flex justify-between items-center w-[100%]">
                                    <p className='text-xl font-bold text-gray-50 w-fit mr-4'>Ultima localização Registrada:</p>
                                    <UpdateForm currentLocation={entrega} />
                                </div>

                            }

                        </div>
                        :
                        <div className="flex justify-between items-center w-[100%]">
                            <p className='text-xl font-bold text-gray-50'>Ultima localização Registrada:</p>
                            <p className='text-xl font-bold text-cyan-300 '> {curretLocation}</p>
                        </div>
                    }
                </div>
                <div >
                    <p className='text-xl font-bold text-gray-50'>Descrição:</p>
                    <p className='text-xl font-bold text-cyan-300 mb-6 max-h-44 break-words'> {description}</p>
                </div>

                <div className='flex justify-between items-center mb-6'>
                    <p className='text-lg font-bold text-slate-300'>{updateUt.toString()}</p>
                    {delivered === true ?
                        <p className='text-xl font-bold bg-cyan-400 p-2 rounded-md ml-6'>Entrega Realizada</p>
                        :
                        <p className='text-xl font-bold bg-amber-400 p-2 rounded-md ml-6'>Em Percurso</p>

                    }
                </div>

                {session?.user.role === "ADMIN" ?
                    <div>
                        {
                            entrega.delivered == false ?
                                <UpdatedeDelivered entrega={entrega} />
                                :
                                <div className="hidden"></div>
                        }
                    </div>

                    :
                    <div className="hidden"></div>
                }


            </div>

        </div>
    )
}

export default TodasEntregas;