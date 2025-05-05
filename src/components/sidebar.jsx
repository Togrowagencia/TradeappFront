import { useLocation } from 'react-router-dom';

export const Sidebar = () => {

  const location = useLocation();

  // Aquí usamos la ruta actual para definir el enlace seleccionado
  const getSelectedLink = (path) => {
    switch (path) {
      case '/dashboard':
        return location.pathname === path ? "selected-dashboard" : "";
      case '/historial':
        return location.pathname === path ? "selected-dashboard" : "";
      case '/users':
        return location.pathname === path ? "selected-dashboard" : "";
      case '/create-signals':
        return location.pathname === path ? "selected-dashboard" : "";
      default:
        return "";
    }
  };


  return (
    <div className="w-[13.7%] h-[94%] fondo-bg border-[#FFF] border flex flex-col items-center gap-[1%] pt-[4%] rounded-[10px]">

      <img src={`/images/logo.png`} className={`w-[35.2%] h-[11.7%] lp:h-[11%] lpm:h-[7.5%]`} />

      <div className='content-sidebar my-10'>

        <a href="/dashboard" className={getSelectedLink("/dashboard")}>
          <img src="/svg/sidebar/dashboard.svg" className="noselected-img" />
          <img src="/svg/sidebar/dashboard-selected.svg" className="selected-img" />
          <h4 >Dashboard</h4>
        </a>

        <a href="/create-signals" className={getSelectedLink("/create-signals")}>
          <img src="/svg/sidebar/signals.svg" className="noselected-img" />
          <img src="/svg/sidebar/signals-selected.svg" className="selected-img" />
          <h4 >Create signals</h4>
        </a>

        <a href="/historial" className={getSelectedLink("/historial")}>
          <img src="/svg/sidebar/historial.svg" className="noselected-img" />
          <img src="/svg/sidebar/historial-selected.svg" className="selected-img" />
          <h4 >Historial</h4>
        </a>

        <a href="/users" className={getSelectedLink("/users")}>
          <img src="/svg/sidebar/usuarios.svg" className="noselected-img" />
          <img src="/svg/sidebar/usuarios-selected.svg" className="selected-img" />
          <h4 >Users</h4>
        </a>
      </div>

      <div className="flex flex-col w-full h-[45%] gap-[2%] justify-end">
        <a href="/">
          <button className="flex items-center w-full h-[15%] gap-[5%] pl-[16%]">
            <img src="/svg/sidebar/cerrar.svg" />
            <h4 className="rojo-alerta">Log Out</h4>
          </button>
        </a>

        <div className="flex justify-center items-center w-full h-[15%] gap-[0%]">
          <p className="textos text-[#999]">Develop by</p>
          <img src="/images/logo-togrow.png" alt="" />
        </div>
      </div>

    </div>
  )
}

export default Sidebar;