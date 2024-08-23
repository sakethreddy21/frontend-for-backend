import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from './ui/button';
import useSetupSpeakerProfile from '@/hooks/useCompleteProfile';
import { getToken } from '@/hooks/getToken';
import { toast } from './ui/use-toast';
const CompleteProfile = () => {
    const { setupProfile, loading, error, data } = useSetupSpeakerProfile();
    const [expertise, setExpertise] = useState('');
    const [pricePerSession, setPricePerSession] = useState(0);
    const [token, setToken] = useState(getToken() ?? '')
    const handleSubmit = () => {
        setupProfile(expertise, pricePerSession, token);
      };
if(data){
    toast({
        title: 'Profile Created',
        description: 'Your profile has been created successfully',
      });
      //set local storage item isComplete to true
        localStorage.setItem('isComplete', 'true');
}
      
  return (
    <Card>
    <CardHeader>
      <CardTitle>Login</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="name">Expertise</Label>
        <Input id="name" type="string"         value={expertise}
        onChange={(e) => setExpertise(e.target.value)}
        placeholder="Expertise"
/>
      </div>
      <div className="space-y-1">
        <Label htmlFor="username">Password</Label>
        <Input id="username" type="number"  value={pricePerSession}
        onChange={(e) => setPricePerSession(Number(e.target.value))}
        placeholder="Price per session"
/>
      </div>
    </CardContent>
    <CardFooter>
    <Button  onClick={handleSubmit} disabled={loading}>
    {loading ? 'Submitting...' : 'Submit Profile'}
</Button>
    </CardFooter>
  </Card>
  )
}

export default CompleteProfile