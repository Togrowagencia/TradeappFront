import React, { useMemo } from "react";
import BarChart from "./graficos/Bar";
import Pie from "./graficos/Pie";
import Data from "../../Data/Historial/Data"
import { chartData } from "../../Data/Dashboard/Data";

const General = ({ data, dateRange, notifications, users }) => {
  const pieData = useMemo(() => {
    const calls = notifications.filter(item => item.orderType === "Call").length;
    const puts = notifications.filter(item => item.orderType === "Put").length;
    return [calls, puts];
  }, [notifications]);

  const totalActive = useMemo(() => {
    const activeDataset = chartData.datasets.find(dataset => dataset.label === "Active");
    if (!activeDataset) return 0;

    if (!dateRange || !dateRange[0] || !dateRange[1]) {
      return activeDataset.data.reduce((sum, item) => sum + item.value, 0);
    }

    const [startDate, endDate] = dateRange;
    return activeDataset.data
      .filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      })
      .reduce((sum, item) => sum + item.value, 0);
  }, [dateRange]);

  const lastSignal = useMemo(() => {
    if (notifications.length === 0) return null;
    
    const sortedData = [...notifications].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    return sortedData[0];
  }, [notifications]);

  const lastAlertDate = useMemo(() => {
    if (!lastSignal) return 'No alerts';
    
    return new Date(lastSignal.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }, [lastSignal]);

  const blockedUsers = useMemo(() => {
    console.log('Lista completa de usuarios:', users);
    return users.filter(user => !user.blocked).length;
  }, [users]);

  return (
    <div className="w-[94.9%] h-[69%] gap-[7%] flex flex-col">
      {/*last alert*/}
      <div className="w-full h-[33.5%] flex flex-col items-start gris-carbon-bg rounded-[10px] py-6 px-4 justify-between">
        <div className="flex justify-between items-center w-full px-4">
          <div className="flex items-center gap-3">
            <h3 className="blanco">Last Alert Sent</h3>
            <h4 className="blanco">{lastAlertDate}</h4>
          </div>
          <div className="flex justify-center items-start h-full">
            <a href="/historial">
              <img src="/svg/dashboard/flecha.svg" alt="Go to history" className="cursor-pointer w-[2rem] h-[2rem]" />
            </a>
          </div>
        </div>

        <div className="w-[92%]">
          <table className="w-full">
            {/* Encabezados de la tabla */}
            <thead>
              <tr className="text-left">
                <th className="py-3 px-7 lpm:px-2 lpm:py-2"> <h4 className="blanco">Symbol</h4> </th>
                <th className="py-3 px-7 lpm:px-2 lpm:py-2"> <h4 className="blanco">Time Frame</h4> </th>
                <th className="py-3 px-7 lpm:px-2 lpm:py-2"> <h4 className="blanco">Expiration Time</h4> </th>
                <th className="py-3 px-7 lpm:px-2 lpm:py-2"> <h4 className="blanco">Order Type</h4> </th>
                <th className="py-3 px-7 lpm:px-2 lpm:py-2"> <h4 className="blanco">Entry 1</h4> </th>
                <th className="py-3 px-7 lpm:px-2 lpm:py-2"> <h4 className="blanco">Entry 2</h4> </th>
              </tr>
            </thead>

            {/* Filas de datos */}
            <tbody>
              {lastSignal && (
                <tr className="bg-[#333]">
                  <td className="py-3 px-7 lpm:px-2 lpm:py-2 textos blanco rounded-l-[20px]">
                    <div className="flex items-center gap-1">
                      <img src={lastSignal.logo} alt="" className="w-7.5 h-4"/>
                      {lastSignal.symbol}
                    </div>
                  </td>
                  <td className="py-3 px-7 lpm:px-2 lpm:py-2 textos blanco">{lastSignal.timeFrame}</td>
                  <td className="py-3 px-7 lpm:px-2 lpm:py-2 textos blanco">{lastSignal.expirationTime}</td>
                  <td className="py-3 px-7 lpm:px-2 lpm:py-2 textos blanco">{lastSignal.orderType}</td>
                  <td className="py-3 px-7 lpm:px-2 lpm:py-2 textos blanco">{Number(Number(lastSignal.potentialEntry1).toFixed(2)).toLocaleString('es-CO')}</td>
                  <td className="py-3 px-7 lpm:px-2 lpm:py-2 textos blanco rounded-r-[20px]">{Number(Number(lastSignal.potentialEntry2).toFixed(2)).toLocaleString('es-CO')}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* second part */}
      <div className="w-full h-[59%] flex justify-between">
        <div className="flex flex-col w-[47.3%] h-[97%] justify-between">
          {/* active users */}
          <div className="w-full h-[43%] flex items-center gris-carbon-bg border-[1px] border-[#00E676] rounded-[10px] px-5">
            <div className="flex items-center justify-between w-full">
              <div className="w-[53%]">
                <h3 className="blanco">Active Users</h3>
              </div>
              <div className="verde-exito-bg rounded-[10px] px-3">
                <h2 className="negro h-[48px] lp:h-[38.4px]">{blockedUsers}</h2>
              </div>
            </div>
          </div>

          {/* order type */}
          <div className="w-full h-[43%] flex items-center gris-carbon-bg border-[1px] border-[#E53935] rounded-[10px] px-5">
            <div className="flex items-center justify-between w-full">
              <div className="w-[73%] flex flex-col gap-[1.7rem]">
                <h3 className="blanco">Orders Issued</h3>
                <div className="flex gap-1.5">
                  <img src="\svg\dashboard\elipse-v.svg" alt="" />
                  <h4 className="blanco">Call Option</h4>
                  <img
                    src="\svg\dashboard\elipse-r.svg"
                    alt=""
                    className="pl-4"
                  />{" "}
                  <h4 className="blanco">Put Option</h4>
                </div>
              </div>

              <div className="w-[27%]">
                <Pie dynamicData={pieData} />
              </div>
            </div>
          </div>
        </div>

        {/* Active vs. Expired Alerts */}
        <div className="flex flex-col w-[47.3%] h-[97%] gris-carbon-bg rounded-[10px] py-8 px-6 lp:py-6 lp:px-5">
          {/*<div className="flex flex-col gap-3">
            <h3 className="blanco ">Active vs. Expired Alerts</h3>
            <div className="flex gap-2">
              <p className="verde-exito-bg rounded-[20px] textos py-2 px-3">
                Active
              </p>
              <p className="bg-[#9a9a9a] rounded-[20px] textos py-2 px-4 blanco">
                Expired
              </p>
            </div>
          </div>
          <BarChart dateRange={dateRange}/>*/}
        </div>
      </div>
    </div>
  );
};

export default General;
