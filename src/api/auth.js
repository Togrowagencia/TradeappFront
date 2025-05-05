import axios from "axios";
import { baseurl } from "../utils/baseurl";

export const login = async (username, password) => {
  try {
    console.log('Intentando login en:', `${baseurl}/auth/login`);
    const response = await axios.post(`${baseurl}/auth/login`, {
      username,  // Changed from username to email based on API expectation
      password
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 5000 // Añadimos un timeout de 5 segundos
    });
    
    console.log('Respuesta del servidor:', response.data);
    return response;
  } catch (error) {
    console.error('Error in login:', error);
    if (error.response?.status === 401) {
      throw new Error('Invalid credentials');
    }
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to server');
    }
    if (error.code === 'ENOTFOUND') {
      throw new Error('Server not found');
    }
    throw new Error('Error during login');
  }
};

export const requestResetPassword = async (email) => {
  try {
    console.log('Solicitando restablecimiento de contraseña para:', email);
    const response = await axios.post(`${baseurl}/auth/request-reset-password`, {
      email
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 5000
    });
    
    console.log('Respuesta del servidor:', response.data);
    return response;
  } catch (error) {
    console.error('Error requesting password reset:', error);
    if (error.response?.status === 404) {
      throw new Error('Email not found');
    }
    if (error.response?.status === 400) {
      throw new Error('Invalid email format');
    }
    throw new Error('Error requesting password reset');
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    console.log('Restableciendo contraseña con token:', token);
    const response = await axios.post(`${baseurl}/auth/reset-password`, {
      token: token,
      newPassword: newPassword
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 5000
    });
    
    console.log('Respuesta del servidor:', response.data);
    return response;
  } catch (error) {
    console.error('Error resetting password:', error);
    if (error.response?.status === 400) {
      throw new Error('Invalid token or password');
    }
    if (error.response?.status === 404) {
      throw new Error('Token not found or expired');
    }
    throw new Error('Error resetting password');
  }
};