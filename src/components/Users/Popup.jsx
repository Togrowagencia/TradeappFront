import React from "react";
import PropTypes from "prop-types";
import { Drawer } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Popup = ({ isPopupOpen, handlePopupClose, item }) => {

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
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />
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
                <div className="absolute top-5 right-6 cursor-pointer" onClick={handlePopupClose}>
                    <img src="/svg/Historial/cerrar.svg" alt="Cerrar" />
                </div>

                <div>
                    <h3 className="blanco">Resume signal</h3>
                </div>

                <table className="w-full mt-4">
                    <thead>
                        <tr className="text-left">
                            <th className="py-2 pr-2 pl-5"><h4 className="blanco">Symbol</h4></th>
                            <th className="py-2 pr-2 pl-5"><h4 className="blanco">Time Frame</h4></th>
                            <th className="py-2 pr-2 pl-5"><h4 className="blanco">Expiration time</h4></th>
                            <th className="py-2 pr-2 pl-5"><h4 className="blanco">Order Type</h4></th>
                            <th className="py-2 pr-2 pl-5"><h4 className="blanco">Entry 1</h4></th>
                            <th className="py-2 pr-2 pl-5"><h4 className="blanco">Entry 2</h4></th>
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
                                <td className="py-2 pr-2 pl-5 textos blanco">{item.timeFrame}</td>
                                <td className="py-2 pr-2 pl-5 textos blanco">{item.expirationTime}</td>
                                <td className="py-2 pr-2 pl-5 textos blanco">{item.orderType}</td>
                                <td className="py-2 pr-2 pl-5 textos blanco">{item.potentialEntry1}</td>
                                <td className="py-2 pr-2 pl-5 textos blanco rounded-r-[20px]">{item.potentialEntry2}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Comentarios + Carrusel */}
                <div className="flex w-[98%] mt-6 justify-between">
                    {/* Comentarios */}
                    <div className="w-[50%]">
                        <textarea
                            value={item?.comments}
                            readOnly
                            className="w-full h-[200px] bg-[#333] rounded-[10px] p-2 blanco h4 resize-none"
                        />
                    </div>

                    {/* Carrusel alineado a la derecha */}
                    <div className="w-[45%] flex justify-end">
                        <div className="w-full max-w-[100%]">
                            <Slider {...sliderSettings}>
                                {item && item.img.map((image, index) => (
                                    <div key={index} className="flex justify-center items-center h-[200px]">
                                        <img
                                            src={image}
                                            alt={`Image ${index + 1}`}
                                            className="w-full h-full object-cover rounded-[10px]"
                                        />
                                    </div>
                                ))}
                            </Slider>
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