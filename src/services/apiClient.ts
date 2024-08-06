import { isMobileOnly, isTablet } from "react-device-detect";
import axios from 'axios';
import { RegisterUserRequest, UpdateUserRequest } from '../types/type';
import { API_ENDPOINT } from '../configs';

const apiClient = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

function getDevice() {
  if(isMobileOnly) return "mobile";
  else if(isTablet) return "tablet";
  return  "desktop";
}

const registerUser = async (user: RegisterUserRequest) => {
  try {
    const response = await apiClient.post('/user/register', {
      ...user,
      device: getDevice()
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const updateUser = async (user: UpdateUserRequest) => {
  try {
    const response = await apiClient.put('/user', {
      ...user,
      device: getDevice()
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

const getUser = async (email: string) => {
  try {
    const response = await apiClient.get(`/user?email=${email}`);
    return response.data;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

const getGift = async () => {
  try {
    const response = await apiClient.get(`/gift`);
    return response.data.giftId;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

export { registerUser, updateUser, getUser, getGift };
