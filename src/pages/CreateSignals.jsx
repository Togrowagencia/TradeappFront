import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/CreateSignals/Header';
import Create from '../components/CreateSignals/Create';
import { ClearProvider } from '../components/CreateSignals/ClearContext';
import { getNotificationLogos, getAllNotifications } from '../api/notifications';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/toast.css';

const CreateSignals = () => {
    const [selectedSymbol, setSelectedSymbol] = useState(null);
    const [selectedTimeFrame, setSelectedTimeFrame] = useState("");
    const [selectedExpiration, setSelectedExpiration] = useState("");
    const [selectedOrderType, setSelectedOrderType] = useState("");
    const [entry1, setEntry1] = useState("");
    const [entry2, setEntry2] = useState("");
    const [symbols, setSymbols] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener logos y notificaciones en paralelo
                const [logosResponse, notificationsResponse] = await Promise.all([
                    getNotificationLogos(),
                    getAllNotifications()
                ]);

                console.log('Respuesta de logos:', logosResponse);
                console.log('Respuesta de notificaciones:', notificationsResponse);

                if (logosResponse && logosResponse.logos) {
                    // Contar frecuencia de símbolos en las notificaciones
                    const symbolFrequency = {};
                    notificationsResponse.forEach(notification => {
                        const symbol = notification.symbol;
                        symbolFrequency[symbol] = (symbolFrequency[symbol] || 0) + 1;
                    });

                    // Ordenar símbolos por frecuencia
                    const sortedSymbols = Object.entries(symbolFrequency)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 6)
                        .map(([symbol]) => symbol);

                    // Transformar los datos al formato esperado, priorizando los más usados
                    const transformedSymbols = Object.entries(logosResponse.logos)
                        .map(([symbol, image]) => ({
                            symbol,
                            image,
                            isMostUsed: sortedSymbols.includes(symbol)
                        }))
                        .sort((a, b) => {
                            if (a.isMostUsed && !b.isMostUsed) return -1;
                            if (!a.isMostUsed && b.isMostUsed) return 1;
                            return 0;
                        });

                    console.log('Símbolos transformados:', transformedSymbols);
                    setSymbols(transformedSymbols);
                } else {
                    console.error('Formato de respuesta inválido:', logosResponse);
                    setSymbols([]);
                }
            } catch (error) {
                console.error('Error al obtener datos:', error);
                setSymbols([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Estados principales
    const [formData, setFormData] = useState({
        symbol: null,
        timeFrame: "",
        expiration: "",
        orderType: "",
        entry1: "",
        entry2: "",
        stoplLoss: "",
        takeProfit: "",
        link: ""
    });

    return (
        <ClearProvider>
            <div className="w-full h-[100vh] relative">
                <div className="absolute inset-0 bg-[url('/images/fondo-createsignals.png')] bg-center bg-cover bg-no-repeat mix-blend-soft-light" />
                <div className="relative w-full h-full px-4 py-2 flex justify-center items-center">
                    <Sidebar />
                    <div className='w-[83%] ml-[1%] h-[98%] px-8'>
                        <Header formData={formData} />
                        <div className='w-full'>
                            <Create 
                                formData={formData} 
                                setFormData={setFormData}
                                symbols={symbols}
                                loading={loading}
                            />
                        </div>
                    </div>
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
        </ClearProvider>
    )
}

export default CreateSignals;