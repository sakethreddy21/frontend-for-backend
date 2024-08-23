"use client"
import { Login_SignUP } from "@/components/loginsignupcomponent";
import { Button } from "@/components/ui/button";
import useGetSpeakers from "@/hooks/useGetSpeakers";
import Image from "next/image";

export default function Home() {

  const { speakers, loading, error } = useGetSpeakers();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex justify-between items-center w-full p-4 ">
        <div className="flex-1 text-center">
          Choose your speaker now 
        </div>
        <div className="text-right">
        <Login_SignUP/>
        </div>
      </div>
      <div className="flex flex-row gap-x-40">
      {speakers.map(speaker => (
        <div key={speaker.speaker_id}>
          <h3>{speaker.first_name} {speaker.last_name}</h3>
          <p>Expertise: {speaker.expertise}</p>
          <p>Price per session: ${speaker.price_per_session}</p>
          <Button>Book your session</Button>
        </div>
        
      ))}
      </div>

    </div>
  );
}


