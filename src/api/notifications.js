import axios from 'axios';
import { baseurl } from '../utils/baseurl';

export const getAllNotifications = async () => {
  try {
    const token = localStorage.getItem('authResponse');
    console.log('Token para notificaciones:', token);

    if (!token) {
      throw new Error('No hay token de autenticación disponible');
    }

    const response = await axios.get(`${baseurl}/notifications/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.trim()}`
      }
    });

    console.log('Respuesta de notificaciones:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting notifications:', error);
    if (error.response?.status === 401) {
      throw new Error('Unauthorized access');
    }
    throw new Error('Error retrieving notifications');
  }
};

export const getNotificationLogos = async () => {
  try {
    const token = localStorage.getItem('authResponse');
    
    if (!token) {
      throw new Error('No hay token de autenticación disponible');
    }

    const response = await axios.get(`${baseurl}/notifications/logos`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.trim()}`
      }
    });

    console.log('Logos de notificaciones obtenidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener logos de notificaciones:', error);
    if (error.response) {
      console.error('Detalles del error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });
    }
    throw error;
  }
};

export const registerNotification = async (formData) => {
  try {
    const token = localStorage.getItem('authResponse');
    
    if (!token) {
      throw new Error('No hay token de autenticación disponible');
    }

    const response = await axios.post(`${baseurl}/notifications/register`, formData, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.trim()}`,
        // No establecemos Content-Type para que axios lo establezca automáticamente con el boundary correcto
      }
    });

    console.log('Notificación registrada:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating notification:', error);
    if (error.response?.status === 401) {
      throw new Error('Unauthorized access');
    }
    if (error.response?.status === 400) {
      throw new Error('Invalid notification data');
    }
    throw new Error('Error creating notification');
  }
};

export const updateNotification = async (notificationId, formData) => {
  try {
    const token = localStorage.getItem('authResponse');
    
    if (!token) {
      throw new Error('No hay token de autenticación disponible');
    }

    const response = await axios.put(`${baseurl}/notifications/${notificationId}`, formData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.trim()}`
      }
    });

    console.log('Notificación actualizada:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating notification:', error);
    if (error.response?.status === 401) {
      throw new Error('Unauthorized access');
    }
    if (error.response?.status === 404) {
      throw new Error('Notification not found');
    }
    throw new Error('Error updating notification');
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    const token = localStorage.getItem('authResponse');
    
    if (!token) {
      throw new Error('No hay token de autenticación disponible');
    }

    const response = await axios.delete(`${baseurl}/notifications/${notificationId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.trim()}`
      }
    });

    console.log('Notificación eliminada:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting notification:', error);
    if (error.response?.status === 401) {
      throw new Error('Unauthorized access');
    }
    if (error.response?.status === 404) {
      throw new Error('Notification not found');
    }
    throw new Error('Error deleting notification');
  }
};

export const updateNotificationStatus = async (notificationId, status) => {
  try {
    const token = localStorage.getItem('authResponse');
    
    if (!token) {
      throw new Error('No hay token de autenticación disponible');
    }

    const response = await axios.patch(`${baseurl}/notifications/${notificationId}/status`, { status }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.trim()}`
      }
    });

    console.log('Estado de notificación actualizado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error actualizando estado de notificación:', error);
    if (error.response?.status === 401) {
      throw new Error('Unauthorized access');
    }
    if (error.response?.status === 404) {
      throw new Error('Notification not found');
    }
    throw new Error('Error updating notification status');
  }
};
