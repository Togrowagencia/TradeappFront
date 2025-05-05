import React from 'react'
import Sidebar from '../components/sidebar'
import Header from '../components/Users/Header'
import Tabla from '../components/Users/Tabla'

const Users = () => {
    return (
        <div className="w-full h-[100vh] relative">
            <div className="absolute inset-0 bg-[url('/images/fondo-users.png')] bg-center bg-cover bg-no-repeat mix-blend-soft-light" />
            <div className="relative w-full h-full px-4 py-2 flex justify-center items-center">
                <Sidebar />
                <div className='w-[83%] ml-[1%] h-[98%] px-8'>
                    <Header />
                    <div className='w-full'>
                        <Tabla />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users