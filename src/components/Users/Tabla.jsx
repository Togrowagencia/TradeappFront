/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Switch } from 'antd';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { getAllUsers, editUser, deleteUser } from '../../api/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/toast.css';

const Tabla = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                console.log("Usuarios recibidos del backend:", data);
                setUsers(data);
            } catch (error) {
                console.error('Error al cargar usuarios:', error);
                toast.error("No se pudieron cargar los usuarios", {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const onChange = async (checked, userId) => {
        try {
            console.log('ID del usuario a editar:', userId); // Para depuración

            // Encontrar el usuario actual
            const currentUser = users.find(user => user.id === userId);
            if (!currentUser) {
                throw new Error('Usuario no encontrado');
            }

            // Preparar los datos exactamente como los espera el backend
            const userData = {
                username: currentUser.username,
                email: currentUser.email,
                blocked: checked,
                authStrategy: currentUser.authStrategy || 'local'
            };

            console.log('Datos a enviar:', userData);

            // Asegurar que el ID se pasa correctamente
            if (!userId) {
                throw new Error('ID de usuario no válido');
            }

            await editUser(userId, userData);

            // Actualizar el estado local
            setUsers(users.map(user =>
                user.id === userId ? { ...user, blocked: checked } : user
            ));

            toast.success("El estado del usuario ha sido actualizado", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error('Error al actualizar el estado:', error);
            if (error.response?.status === 401) {
                toast.error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente", {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error(error.message || "No se pudo actualizar el estado del usuario", {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    const handleDelete = async (user) => {
        Swal.fire({
            title: "Are you sure you want to delete the user?",
            text: "Once deleted, you will not be able to recover the information associated with this genre.",
            imageUrl: '/svg/Users/eliminarR.svg',
            showCancelButton: true,
            confirmButtonColor: "#E53935",
            cancelButtonColor: "#1E1E1E",
            confirmButtonText: "Delete user",
            cancelButtonText: "Cancel",
            background: "#292929",
            color: "#fff",
            customClass: {
                popup: 'custom-popup-class',
                confirmButton: 'custom-confirm-button',
                cancelButton: 'custom-cancel-button',
                image: 'custom-image-class'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteUser(user.id);
                    // Actualizar el estado local eliminando el usuario
                    setUsers(users.filter(u => u.id !== user.id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "The user has been deleted.",
                        icon: "success",
                        background: "#16171C",
                        color: "#fff",
                        confirmButtonColor: "#00E676",
                        customClass: {
                            popup: 'custom-popup-class',
                            confirmButton: 'custom-confirm-button'
                        }
                    });
                } catch (error) {
                    console.error('Error al eliminar usuario:', error);
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo eliminar el usuario",
                        icon: "error",
                        background: "#16171C",
                        color: "#fff",
                        confirmButtonColor: "#E53935"
                    });
                }
            }
        });
    };

    // Filter data based on search term
    const filteredData = users.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    if (loading) {
        return (
            <div className="w-[101.5%] fondo-alternativo-bg rounded-[10px] pl-6 pr-[3.5%] pt-11 pb-8 flex flex-col items-center justify-center">
                <h3 className="blanco">Cargando usuarios...</h3>
            </div>
        );
    }

    return (
        <>
            <ToastContainer
                position="top-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="w-[101.5%] fondo-alternativo-bg rounded-[10px] pl-6 pr-[3.5%] pt-11 pb-8 flex flex-col">
                <div className="flex w-[97.6%] justify-between">
                    <h3 className="blanco">User Management</h3>

                    <div className="border-[1px] border-[#333] rounded-[18px] flex px-3 py-1 items-center">
                        <img src="\svg\Users\buscar.svg" alt="buscar" className="h-5 w-5 flex items-center" />
                        <input
                            type="text"
                            placeholder="Search by name or email"
                            className="bg-transparent placeholder:text-[#333] textos text-end blanco w-full outline-none"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className="max-h-[67.5vh] w-[101.5%] overflow-y-scroll custom-scroll fondo-alternativo-bg rounded-[10px] pt-6">
                    <table className="w-[97%]">
                        <thead>
                            <tr className="text-left">
                                <th className="py-2 pr-2 pl-5"> <h4 className="blanco">Name</h4> </th>
                                <th className="py-2 pr-2 pl-5"> <h4 className="blanco">Email</h4> </th>
                                <th className="py-2 pr-2 pl-5"> <h4 className="blanco">Role</h4> </th>
                                <th className="py-2 pr-2 pl-5"> <h4 className="blanco">Status</h4> </th>
                                <th className="py-2 pr-2 pl-5"> <h4 className="blanco">Created At</h4> </th>
                                <th className="py-2 pr-2 pl-5"> <h4 className="blanco">Actions</h4> </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={item.id} className={index % 2 === 0 ? "bg-[#333]" : ""}>
                                    <td className={index % 2 === 0 ? "py-2 pr-2 pl-5 textos blanco rounded-l-[20px]" : "py-6 pr-2 pl-5 textos blanco rounded-l-[20px]"}>{item.name}</td>
                                    <td className={index % 2 === 0 ? "py-2 pr-2 pl-5 textos blanco" : "py-6 pr-2 pl-5 textos blanco"}>{item.email}</td>
                                    <td className={index % 2 === 0 ? "py-2 pr-2 pl-5 textos blanco" : "py-6 pr-2 pl-5 textos blanco"}>{item.role}</td>
                                    <td className={index % 2 === 0 ? "py-2 pr-2 pl-5 textos blanco" : "py-6 pr-2 pl-5 textos blanco"}>
                                        <Switch
                                            checked={!item.blocked}
                                            onChange={(checked) => onChange(!checked, item.id)}
                                        />
                                    </td>
                                    <td className={index % 2 === 0 ? "py-2 pr-2 pl-5 textos blanco" : "py-6 pr-2 pl-5 textos blanco"}>
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className={index % 2 === 0 ? "py-2 pr-2 pl-5 textos blanco rounded-r-[20px]" : "py-6 pr-2 pl-5 textos blanco rounded-r-[20px]"}>
                                        <div className="flex gap-8">
                                            <a href={`/edit-user?id=${item.id}`}>
                                                <img src="/svg/Users/editar.svg" alt="Editar" className="cursor-pointer" />
                                            </a>
                                            <img
                                                src="/svg/Users/eliminar.svg"
                                                alt="Eliminar"
                                                onClick={() => handleDelete(item)}
                                                className="cursor-pointer"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Tabla;