import React from 'react';
import { ConfigProvider, DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const RangoFecha = ({ onDateChange }) => {

    const handleRangeChange = (dates) => {
        if (dates) {
            const [start, end] = dates;
            onDateChange(start?.toISOString(), end?.toISOString());
        } else {
            onDateChange(null, null); // Reset filter when dates are cleared
        }
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    DatePicker: {
                        // Fondo del contenedor
                        colorBgContainer: '#16171c',
                        activeBg: '#16171c',
                        hoverBg: '#16171c',

                        // Colores de borde
                        colorBorder: '#434343',
                        activeBorderColor: '#00e676',
                        hoverBorderColor: '#00e676',

                        // Elimina el resplandor de focus
                        activeShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
                    },
                },
            }}
        >
            <Space>
                <RangePicker
                    onChange={handleRangeChange}
                    rootClassName="custom-rangepicker"
                    style={{ backgroundColor: '#16171c', borderColor: '#434343' }}
                />
            </Space>
        </ConfigProvider>
    );
};

export default RangoFecha;
