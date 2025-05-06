import React, { useState, useEffect } from 'react'
import Sidebar from '../components/sidebar'
import Header from '../components/Users/Header'
import Tabla from '../components/Users/Tabla'
import Loader from '../components/Loader'
import { getAllUsers, editUser, deleteUser } from '../api/user'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/toast.css'

const Users = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const showToast = (type, message) => {
        const options = {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        }

        if (type === 'success') {
            toast.success(message, options)
        } else if (type === 'error') {
            toast.error(message, options)
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers()
                console.log("Usuarios recibidos del backend:", data)
                setUsers(data)
            } catch (error) {
                console.error('Error al cargar usuarios:', error)
                showToast('error', "No se pudieron cargar los usuarios")
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    const handleStatusChange = async (checked, userId) => {
        try {
            const currentUser = users.find(user => user.id === userId)
            if (!currentUser) {
                throw new Error('Usuario no encontrado')
            }

            const userData = {
                username: currentUser.username,
                email: currentUser.email,
                blocked: checked,
                authStrategy: currentUser.authStrategy || 'local'
            }

            const response = await editUser(userId, userData)
            console.log('Respuesta de actualización:', response)

            setUsers(users.map(user =>
                user.id === userId ? { ...user, blocked: checked } : user
            ))

            showToast('success', "El estado del usuario ha sido actualizado exitosamente")

        } catch (error) {
            console.error('Error al actualizar el estado:', error)
            if (error.response?.status === 401) {
                showToast('error', "Tu sesión ha expirado. Por favor, inicia sesión nuevamente")
            } else {
                showToast('error', error.message || "No se pudo actualizar el estado del usuario")
            }
        }
    }

    const handleDelete = async (user) => {
        try {
            const response = await deleteUser(user.id)
            console.log('Respuesta de eliminación:', response)

            setUsers(users.filter(u => u.id !== user.id))
            showToast('success', "Usuario eliminado exitosamente")

        } catch (error) {
            console.error('Error al eliminar usuario:', error)
            if (error.response?.status === 401) {
                showToast('error', "Tu sesión ha expirado. Por favor, inicia sesión nuevamente")
            } else {
                showToast('error', "No se pudo eliminar el usuario")
            }
        }
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div className="w-full h-[100vh] relative">
            <div className="absolute inset-0 bg-[url('/images/fondo-users.png')] bg-center bg-cover bg-no-repeat mix-blend-soft-light" />
            <div className="relative w-full h-full px-4 py-2 flex justify-center items-center">
                <Sidebar />
                <div className='w-[83%] ml-[1%] h-[98%] px-8'>
                    {loading ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <Loader />
                        </div>
                    ) : (
                        <>
                            <Header />
                            <div className='w-full'>
                                <Tabla 
                                    users={users}
                                    searchTerm={searchTerm}
                                    onSearch={handleSearch}
                                    onStatusChange={handleStatusChange}
                                    onDelete={handleDelete}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer
                position="top-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                limit={3}
                style={{ zIndex: 9999 }}
            />
        </div>
    )
}

export default Users