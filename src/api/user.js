import axios from 'axios';
import { baseurl } from '../utils/baseurl';

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${baseurl}/users/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authResponse')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting users:', error);
    if (error.response?.status === 401) {
      throw new Error('Unauthorized access');
    }
    throw new Error('Error retrieving users');
  }
};

export const editUser = async (id, data) => {
  try {
    const token = localStorage.getItem('authResponse');
    console.log('Token a enviar:', token);
    console.log('ID del usuario a editar:', id); // Para depuración

    // Asegurar que el token no tenga espacios en blanco
    const cleanToken = token.trim();

    // Asegurar que el ID es válido
    if (!id) {
      throw new Error('ID de usuario no proporcionado');
    }

    const response = await axios.put(`${baseurl}/users/edit/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${cleanToken}`
      }
    });

    console.log('Respuesta del servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error editing user:', error);
    if (error.response?.status === 401) {
      throw new Error('Unauthorized access');
    }
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Error updating user');
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${baseurl}/users/delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authResponse')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error.response?.status === 401) {
      throw new Error('Unauthorized access');
    }
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Error deleting user');
  }
};

export const editUserPassword = async (id, data) => {
  try {
    const response = await axios.put(`${baseurl}/users/edit-password/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authResponse')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error editing password:', error);
    if (error.response?.status === 401) {
      throw new Error('Unauthorized access');
    }
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Error updating password');
  }
};

export const registerUser = async (userData) => {
  try {
    // Agregar los campos fijos requeridos por el backend
    const completeUserData = {
      ...userData,
      blocked: false,
      authStrategy: "local",
      resetPasswordToken: null,
      status: true
    };

    console.log('Datos de registro:', completeUserData);

    const response = await axios.post(`${baseurl}/users/register`, completeUserData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('Respuesta del servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in registration:', error);
    if (error.response?.status === 400) {
      throw new Error('The email is already registered');
    }
    if (error.response?.status === 401) {
      throw new Error('Unauthorized access');
    }
    throw new Error('Error during registration');
  }
};
