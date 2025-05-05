import { useEffect, useState } from "react";
import { useClear } from "../ClearContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";

const { Dragger } = Upload;

const CarruselSection = ({ images = [], handleImagesUpdate, carouselSettings }) => {
  const { reset } = useClear();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Estados para los archivos
  const [files, setFiles] = useState(Array(6).fill(null));
  
  useEffect(() => {
    if (reset > 0) {
      // Resetear todo el estado
      setCurrentSlide(0);
      // Limpiar todas las imágenes y revocar URLs
      files.forEach(file => {
        if (file?.preview) URL.revokeObjectURL(file.preview);
      });
      setFiles(Array(6).fill(null));
      handleImagesUpdate([]);
    }
  }, [reset, handleImagesUpdate]);

  // Función para actualizar archivos
  const handleFileChange = (index, file) => {
    const newFiles = [...files];
    if (file) {
      file.preview = URL.createObjectURL(file);
      newFiles[index] = file;
    } else {
      if (newFiles[index]?.preview) URL.revokeObjectURL(newFiles[index].preview);
      newFiles[index] = null;
    }
    setFiles(newFiles);
    
    // Filtrar los archivos que no son null y actualizar el estado padre
    const validFiles = newFiles.filter(file => file !== null);
    handleImagesUpdate(validFiles);
  };

  // Props para el Dragger
  const createDragProps = (index) => ({
    name: "file",
    multiple: false,
    fileList: files[index] ? [files[index]] : [],
    beforeUpload: (file) => {
      handleFileChange(index, file);
      return false;
    },
    onRemove: () => handleFileChange(index, null),
    showUploadList: false,
  });

  return (
    <div className="w-[64.3%] h-[21vh] bg-[#1E1E1E] rounded-[10px] flex flex-col items-center justify-center m-2">
      <Slider
        {...carouselSettings}
        className="w-[90%] flex flex-col justify-center items-center"
      >
        {files.map((file, index) => (
          <div key={index} className="w-full h-full">
            <Dragger
              {...createDragProps(index)}
              className="w-[90%] h-[10pc] flex flex-col items-center justify-center overflow-hidden"
            >
              {file ? (
                <img
                  src={file.preview}
                  alt="preview"
                  className="max-w-full max-h-full object-cover object-center"
                />
              ) : (
                <p className="ant-upload-drag-icon flex justify-center items-center">
                  <img src="\svg\CreateSignals\image.svg" alt="" />
                </p>
              )}
            </Dragger>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarruselSection;