'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

const Roleteste = () => {
    const { data: session } = useSession()

    const log = () => {
        alert(session?.user.role)
    }
    return (
        <div onClick={() => log()}>aaaaaaaa</div>
    )
}

export default Roleteste