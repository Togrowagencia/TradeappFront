import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar'
import Header from '../components/Historial/Header'
import Tabla from '../components/Historial/Tabla'
import Loader from '../components/Loader'
import { getAllNotifications, getNotificationLogos } from '../api/notifications';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/toast.css';

const Historial = () => {
    const [selectedSymbol, setSelectedSymbol] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("Status");
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [symbols, setSymbols] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [notificationsData, logosData] = await Promise.all([
                    getAllNotifications(),
                    getNotificationLogos()
                ]);
                setNotifications(notificationsData);
                console.log('Información completa de notificaciones:', notificationsData);

                // Transformar los datos del endpoint al formato esperado
                const transformedSymbols = Object.entries(logosData.logos).map(([symbol, logo]) => ({
                    symbol,
                    logo
                }));
                setSymbols(transformedSymbols);
                console.log('Símbolos transformados:', transformedSymbols);
            } catch (error) {
                console.error('Error al cargar datos:', error);
                toast.error("No se pudieron cargar los datos", {
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

        fetchData();
    }, []);

    return (
        <div className="w-full h-[100vh] relative">
            <div className="absolute inset-0 bg-[url('/images/fondo-historial.png')] bg-center bg-cover bg-no-repeat mix-blend-soft-light" />
            <div className="relative w-full h-full px-4 py-2 flex justify-center items-center">
                <Sidebar />
                <div className='w-[83%] ml-[1%] h-[98%] px-8'>
                    {loading ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <Loader />
                        </div>
                    ) : (
                        <>
                            <Header
                                onSymbolSelect={setSelectedSymbol}
                                symbols={symbols}
                                selectedStatus={selectedStatus}
                                onStatusChange={setSelectedStatus}
                            />
                            <div className='w-full'>
                                <Tabla
                                    selectedSymbol={selectedSymbol}
                                    notifications={notifications}
                                    selectedStatus={selectedStatus}
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
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default Historial