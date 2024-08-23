import { useState } from 'react';


interface VerifyOtpFormData {
  email: string;
  otp: string;
}

interface VerifyOtpResponse {
  message: string;
  token: string; // Assuming the token is returned by the backend
}

interface VerifyOtpError {
  error: string;
}

const useVerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<VerifyOtpResponse | undefined>();
  const [error, setError] = useState<VerifyOtpError | null>(null);

  const verifyOtp = async (formData: VerifyOtpFormData) => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const res = await fetch('https://plateup-task-backend.vercel.app/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        console.log('OTP verification successful:', data);
        
        
       setResponse(data);
      } else {
        console.log('OTP verification failed:', data.error);
        setError({ error: data.error || 'Verification failed' });
      }
    } catch (err) {
      setError({ error: 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  return { verifyOtp, loading, response, error };
};

export default useVerifyOtp;
