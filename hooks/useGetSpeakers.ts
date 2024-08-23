import { useState, useEffect } from 'react';
import axios from 'axios';

interface Speaker {
  speaker_id: number;
  first_name: string;
  last_name: string;
  expertise: string;
  price_per_session: string;
}

const useGetSpeakers = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await axios.get('https://plateup-task-backend.vercel.app/api/public/speakers');
        
        // Extract speakers array from the response
        const data = response.data;
        if (data && Array.isArray(data.speakers)) {
          setSpeakers(data.speakers);
        } else {
          setError('Unexpected data format');
        }
      } catch (err: any) {
        // Log detailed error information to the console
        console.error('Error fetching speakers:', err);
        
        // Extracting more detailed error information
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
          console.error('Response headers:', err.response.headers);
          setError(`Error: ${err.response.status} - ${err.response.data.error || 'Failed to fetch speakers'}`);
        } else if (err.request) {
          // The request was made but no response was received
          console.error('Request data:', err.request);
          setError('No response received from the server.');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', err.message);
          setError('An error occurred while setting up the request.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  return { speakers, loading, error };
};

export default useGetSpeakers;
