import { useState } from 'react';
import axios from 'axios';

const useSetupSpeakerProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const setupProfile = async (expertise: string, pricePerSession: number, token: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://plateup-task-backend.vercel.app/api/speaker/setup-profile',
        {
          expertise,
          pricePerSession,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
    } catch (err:any) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { setupProfile, loading, error, data };
};

export default useSetupSpeakerProfile;
