import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from "../components/sidebar";
import Header from "../components/dashboard/Header";
import Banner from "../components/dashboard/Banner";
import General from "../components/dashboard/General";
import Alerts from "../components/dashboard/Alerts";
import Data from "../Data/Historial/Data"
import Loader from '../components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import { getAllNotifications } from '../api/notifications';
import { getAllUsers } from '../api/user';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/toast.css';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [notificationsData, usersData] = await Promise.all([
          getAllNotifications(),
          getAllUsers()
        ]);
        setNotifications(notificationsData);
        setUsers(usersData);
        console.log('Usuarios obtenidos:', usersData);
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

  const handleDateChange = (startDate, endDate) => {
    setDateRange([startDate, endDate]);
  };

  const filteredData = useMemo(() => {
    if (!dateRange[0] || !dateRange[1]) return notifications;
    
    return notifications.filter(item => {
      const itemDate = new Date(item.createdAt);
      const startDate = new Date(dateRange[0]);
      const endDate = new Date(dateRange[1]);
      
      return itemDate >= startDate && itemDate <= endDate;
    });
  }, [dateRange, notifications]);

  return (
    <div className="w-full h-[100vh] relative">
      <div className="absolute inset-0 bg-[url('/images/fondo-dashboard.png')] bg-center bg-cover bg-no-repeat mix-blend-soft-light" />
      <div className="relative w-full h-full px-4 py-2 flex justify-center items-center">
        <Sidebar />
        <div className="w-[83%] ml-[1%] h-[98%] px-8">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <Header onDateChange={handleDateChange} />
              <div className="w-full h-[90%] flex">
                <div className="w-[75%] h-full flex-col flex gap-[4.7%] ">
                  <Banner />
                  <General 
                    data={filteredData} 
                    dateRange={dateRange}
                    notifications={filteredData}
                    users={users}
                  />
                </div>
                <div className="w-[29%] h-full px-4">
                  <Alerts notifications={filteredData} />
                </div>
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
  );
};

export default Dashboard;
