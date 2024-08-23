// hooks/useSignup.ts
import axios from 'axios';
import { useState } from 'react';

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: "user" | "speaker";
}

interface SignupResponse {
  message: string;
}

interface SignupError {
  error: string;
}

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<SignupResponse | undefined>();
  const [error, setError] = useState<SignupError | null>(null);
  const [otp, setOtp] = useState<string | null>(null);

  const signup = async (formData: SignupFormData) => {
    setLoading(true);
    setError(null); // Clear previous errors
    setOtp(null);
    try {
      const res = await fetch('https://plateup-task-backend.vercel.app/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        console.log('Signup successful:');
        const otpResponse = await axios.get(`https://plateup-task-backend.vercel.app/api/auth/otp?email=${formData.email}`);
        const otp = otpResponse.data.otp;
        setResponse(data);
        setOtp(otp);
      } else {
        setError({ error: data.error || 'Something went wrong' });
      }
    } catch (err) {
      setError({ error: 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, response, error, otp };
};

export default useSignup;
