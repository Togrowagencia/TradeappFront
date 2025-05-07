import React from "react";
import PropTypes from "prop-types";
import { Drawer } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { updateNotificationStatus } from "../../api/notifications";

const Popup = ({ isPopupOpen, handlePopupClose, item }) => {
  const [selectedStatus, setSelectedStatus] = React.useState(
    item?.status || ""
  );
  const [loading, setLoading] = React.useState(false);

  const CustomNextArrow = ({ onClick }) => (
    <div className="custom-arrow custom-next" onClick={onClick}>
      <img src="\svg\Historial\next.svg" alt="Next" />
    </div>
  );

  const CustomPrevArrow = ({ onClick }) => (
    <div className="custom-arrow custom-prev" onClick={onClick}>
      <img src="\svg\Historial\prev.svg" alt="Previous" />
    </div>
  );

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="relative">
      <Drawer
        rootClassName="custom-popup"
        placement="right"
        onClose={handlePopupClose}
        open={isPopupOpen}
        width={812}
        closable={false}
        headerStyle={{ display: "none" }}
        drawerStyle={{
          borderRadius: "10px",
          backgroundColor: "#16171C",
          border: "1px solid #fff",
        }}
      >
        {/* Botón de cierre personalizado */}
        <div
          className="absolute top-5 right-6 cursor-pointer"
          onClick={handlePopupClose}
        >
          <img src="/svg/Historial/cerrar.svg" alt="Cerrar" />
        </div>

        <div>
          <h3 className="blanco">Resume signal</h3>
        </div>

        <table className="w-full mt-4">
          <thead>
            <tr className="text-left">
              <th className="py-2 pr-2 pl-5">
                <h4 className="blanco">Symbol</h4>
              </th>
              <th className="py-2 pr-2 pl-5">
                <h4 className="blanco">Time Frame</h4>
              </th>
              <th className="py-2 pr-2 pl-5">
                <h4 className="blanco">Expiration time</h4>
              </th>
              <th className="py-2 pr-2 pl-5">
                <h4 className="blanco">Order Type</h4>
              </th>
              <th className="py-2 pr-2 pl-5">
                <h4 className="blanco">Entry 1</h4>
              </th>
              <th className="py-2 pr-2 pl-5">
                <h4 className="blanco">Entry 2</h4>
              </th>
            </tr>
          </thead>

          <tbody>
            {item && (
              <tr className="bg-[#333]">
                <td className="py-2 pr-2 pl-5 textos blanco rounded-l-[20px]">
                  <div className="flex items-center gap-2">
                    <img src={item.Image} alt="" />
                    {item.symbol}
                  </div>
                </td>
                <td className="py-2 pr-2 pl-5 textos blanco">
                  {item.timeFrame}
                </td>
                <td className="py-2 pr-2 pl-5 textos blanco">
                  {item.expirationTime}
                </td>
                <td className="py-2 pr-2 pl-5 textos blanco">
                  {item.orderType}
                </td>
                <td className="py-2 pr-2 pl-5 textos blanco">
                  {Number(
                    Number(item.potentialEntry1).toFixed(2)
                  ).toLocaleString("es-CO")}
                </td>
                <td className="py-2 pr-2 pl-5 textos blanco rounded-r-[20px]">
                  {Number(
                    Number(item.potentialEntry2).toFixed(2)
                  ).toLocaleString("es-CO")}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Comentarios + Carrusel */}
        <div className="flex w-[98%] mt-6 justify-between">
          <div className="flex flex-col w-[50%] h-[50%] gap-1">
            {/* Comentarios */}
            <div className="w-full">
              <textarea
                value={item?.comments}
                readOnly
                className="w-full h-[6.5rem] bg-[#333] rounded-[10px] p-2 blanco h4 resize-none focus:outline-none"
              />
            </div>

            {item?.link && item?.link !== "" && item?.link !== "No link given" ? (
              <div className="w-full flex my-1">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blanco hover:underline hover:text-[#00C853] textos bg-[#333] py-1.5 px-4 rounded-[10px] hover:bg-[#1e1e1e]"
                >
                  Link
                </a>
              </div>
            ) : (
              <div className="w-full flex my-1">
                <button
                  className="blanco textos bg-[#333] py-1.5 px-4 rounded-[10px] hover:bg-[#292929] cursor-not-allowed opacity-60"
                  disabled
                >
                  No link given
                </button>
              </div>
            )}


            <div className="w-full h-[2rem] flex gap-6 mx-2">
              <h4 className="flex items-center gap-2 blanco">
                Discard signal
                <input
                  type="checkbox"
                  checked={selectedStatus === "Discard"}
                  onChange={() => setSelectedStatus("Discard")}
                  className="appearance-none w-3 h-3 rounded-[2px] border-[1px] border-[#D9D9D9] bg-transparent checked:bg-[#E53935] checked:border-[#D9D9D9] cursor-pointer relative"
                />
              </h4>
              <h4 className="flex items-center gap-2 blanco">
                Won
                <input
                  type="checkbox"
                  checked={selectedStatus === "Won"}
                  onChange={() => setSelectedStatus("Won")}
                  className="appearance-none w-3 h-3 rounded-[2px] border-[1px] border-[#D9D9D9] bg-transparent checked:bg-[#E53935] checked:border-[#D9D9D9] cursor-pointer relative"
                />
              </h4>
              <h4 className="flex items-center gap-2 blanco">
                Lost
                <input
                  type="checkbox"
                  checked={selectedStatus === "Lost"}
                  onChange={() => setSelectedStatus("Lost")}
                  className="appearance-none w-3 h-3 rounded-[2px] border-[1px] border-[#D9D9D9] bg-transparent checked:bg-[#E53935] checked:border-[#D9D9D9] cursor-pointer relative"
                />
              </h4>
            </div>
            <div className="w-full flex justify-end">
              <button
                className={
                  "rojo-intenso-bg textos-peques2 blanco-suave rounded-[20px] py-2 px-4 flex items-center text-center " +
                  (loading ? "opacity-50 cursor-not-allowed text-updating" : "")
                }
                onClick={async () => {
                  if (!selectedStatus) return;
                  setLoading(true);
                  try {
                    await updateNotificationStatus(item.id, selectedStatus);
                    // Aquí puedes mostrar un toast de éxito o cerrar el popup, etc.
                  } catch (error) {
                    // Aquí puedes mostrar un toast de error
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
              >
                {loading ? "" : "Update signal"}
              </button>
            </div>
          </div>
          {/* Carrusel alineado a la derecha */}
          <div className="w-[45%] flex justify-end">
            <div className="w-full max-w-[100%]">
              {item?.images?.length > 1 ? (
                <Slider {...sliderSettings}>
                  {item.images.map((imageObj) => (
                    <div
                      key={imageObj.id}
                      className="flex justify-center items-center h-[200px]"
                    >
                      <img
                        src={imageObj.url}
                        alt={`Imagen ${imageObj.id}`}
                        className="w-full h-full object-contain rounded-[10px]"
                      />
                    </div>
                  ))}
                </Slider>
              ) : item?.images?.length === 1 ? (
                <div className="flex justify-center items-center h-[200px]">
                  <img
                    src={item.images[0].url}
                    alt={`Imagen ${item.images[0].id}`}
                    className="w-full h-full object-contain rounded-[10px]"
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center h-[200px]">
                  <p className="textos blanco">No hay imágenes disponibles</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

Popup.propTypes = {
  isPopupOpen: PropTypes.bool.isRequired,
  handlePopupClose: PropTypes.func.isRequired,
  item: PropTypes.object,
};

export default Popup;
