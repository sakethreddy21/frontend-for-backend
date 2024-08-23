import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string; // Adjust this based on the actual response structure
}

interface JwtPayload {
  userType: string;
  isprofilecomplete: string;
}

interface UseLoginReturn {
  login: (data: LoginData) => Promise<void>;
  loading: boolean;
  response: LoginResponse | null;
  error: string | null;
}

const useLogin = (): UseLoginReturn => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await axios.post('https://plateup-task-backend.vercel.app/api/auth/login', data);
      console.log(process.env.JWT_SECRET);
      const decodedPayload:JwtPayload= jwtDecode(result.data.token);
      const expirationTime = new Date().getTime() + 10 * 60 * 1000; 
      localStorage.setItem('auth', result.data.token);
      localStorage.setItem('userType', decodedPayload.userType);
      localStorage.setItem('tokenExpiration', expirationTime.toString());
      if (decodedPayload.userType === 'speaker') {
        localStorage.setItem('isComplete' , decodedPayload.isprofilecomplete);
      }
      setResponse(result.data);

    } catch (err:any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, response, error };
};

export default useLogin;
