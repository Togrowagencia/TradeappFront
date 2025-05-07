import { useState, useEffect } from "react";
import { useClear } from ".//ClearContext";
import SymbolSection from "./Sections/SymbolSection";
import TimeFrameSection from "./Sections/TimeFrameSection";
import ExpirationTimeSection from "./Sections/ExpirationTimeSection";
import EntrySection from "./Sections/EntrySection";
import StopOrTakeSection from "./Sections/StopOrTakeSection";
import OrderTypeSection from "./Sections/OrderTypeSection";
import CarruselSection from "./Sections/CarruselSection";
import CommentsSection from "./Sections/CommentsSection";
import LinkSection from "./Sections/LinkSection";

const Create = ({ formData, setFormData, symbols, loading }) => {
  // Función genérica para actualizar el estado
  const handleUpdate = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const { reset } = useClear();
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [selectedExpiration, setSelectedExpiration] = useState("");
  const [isExpirationSelected, setIsExpirationSelected] = useState(false);
  const [selectedOrderType, setSelectedOrderType] = useState("");
  const [isOrderSelected, setIsOrderSelected] = useState(false);
  const [entry1, setEntry1] = useState("");
  const [entry2, setEntry2] = useState("");
  const [stop, setStop] = useState("");
  const [take, setTake] = useState("");
  const [link, setLink] = useState("");

  const clearStopAndTake = () => {
    setStop("");
    setTake("");
    handleUpdate('stoplLoss', '');
    handleUpdate('takeProfit', '');
  };

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

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const handleStopChange = (e) => {
    const value = e.target.value.replace(/[$,\s]/g, "");
    setStop(value);
    handleUpdate('stoplLoss', value);
  };

  const handleTakeChange = (e) => {
    const value = e.target.value.replace(/[$,\s]/g, "");
    setTake(value);
    handleUpdate('takeProfit', value);
  };

  const handleEntry1Change = (e) => {
    const value = e.target.value.replace(/[$,\s]/g, "");
    setEntry1(value);
    handleUpdate('entry1', value);
  };

  const handleEntry2Change = (e) => {
    const value = e.target.value.replace(/[$,\s]/g, "");
    setEntry2(value);
    handleUpdate('entry2', value);
  };

  const handleOrderTypeClick = (value) => {
    setSelectedOrderType(value);
    setIsOrderSelected(true);
    handleUpdate('orderType', value);
  };

  const handleExpirationClick = (value) => {
    setSelectedExpiration(value);
    setIsExpirationSelected(true);
    handleUpdate('expirationTime', value);
  };

  const handleTimeFrameClick = (value) => {
    setSelectedTimeFrame(value);
    setIsSelected(true);
    handleUpdate('timeFrame', value);
  };

  const handleSymbolChange = (symbol) => {
    handleUpdate('symbol', symbol);
  };

  const handleImagesUpdate = (images) => {
    console.log('Imágenes actualizadas:', images);
    handleUpdate('images', images);
  };

  const handleLinkChange = (e) => {
    const value = e.target.value;
    handleUpdate('link', value);
  };

  useEffect(() => {
    if (reset > 0) {
      // Resetear estados locales
      setSelectedTimeFrame("");
      setIsSelected(false);
      setSelectedExpiration("");
      setIsExpirationSelected(false);
      setSelectedOrderType("");
      setIsOrderSelected(false);
      setEntry1("");
      setEntry2("");
      setStop("");
      setTake("");
      setLink("");

      // Resetear formData
      setFormData({
        symbol: null,
        timeFrame: "",
        expirationTime: "",
        orderType: "",
        entry1: "",
        entry2: "",
        stoplLoss: "",
        takeProfit: "",
        images: [],
        comments: "",
        link: ""
      });
    }
  }, [reset, setFormData]);

  const dataToSend = {
    ...formData,
  };

  console.log("Enviando datos de notificación: ", dataToSend);

  return (
    <div className="w-full h-[90%] flex flex-col gap-1">
      <div className="w-full h-[30%] flex justify-between items-center">
        <SymbolSection
          selectedSymbol={formData.symbol}
          setSelectedSymbol={handleSymbolChange}
          symbols={symbols}
          loading={loading}
        />
        <TimeFrameSection
          selectedTimeFrame={formData.timeFrame}
          isSelected={isSelected}
          handleTimeFrameClick={handleTimeFrameClick}
        />
        <ExpirationTimeSection
          selectedExpiration={formData.expirationTime}
          isExpirationSelected={isExpirationSelected}
          handleExpirationClick={handleExpirationClick}
        />
      </div>

      <div className="w-full h-[30%] flex justify-between">
        <OrderTypeSection
          selectedOrderType={formData.orderType}
          isOrderSelected={isOrderSelected}
          handleOrderTypeClick={handleOrderTypeClick}
        />
        <EntrySection
          entry1={formData.entry1}
          entry2={formData.entry2}
          handleEntry1Change={handleEntry1Change}
          handleEntry2Change={handleEntry2Change}
        />
        <StopOrTakeSection
          stop={formData.stoplLoss}
          take={formData.takeProfit}
          handleStopChange={handleStopChange}
          handleTakeChange={handleTakeChange}
          clearStopAndTake={clearStopAndTake}
        />
      </div>

      <div className="w-full h-[30%] flex justify-between">
        <CommentsSection
          comments={formData.comments}
          handleCommentsChange={(value) => handleUpdate('comments', value)}
          handleUpdate={handleUpdate}
        />
        <CarruselSection
          images={formData.images}
          handleImagesUpdate={handleImagesUpdate}
          carouselSettings={carouselSettings}
        />
      </div>
      <div className="w-full h-[30%] flex">
        <LinkSection 
          link={formData.link}
          handleLinkChange={value => handleUpdate('link', value)}
        />
      </div>
    </div>
  );
};

export default Create;