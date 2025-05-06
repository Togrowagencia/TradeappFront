/* eslint-disable no-unused-vars */
import React from "react";
import { Switch } from 'antd';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const Tabla = ({ users, searchTerm, onSearch, onStatusChange, onDelete }) => {
    // Filter data based on search term
    const filteredData = users.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (user) => {
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
                onDelete(user);
            }
        });
    };

    return (
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
                        onChange={onSearch}
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
                                        onChange={(checked) => onStatusChange(!checked, item.id)}
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
    );
};

export default Tabla;