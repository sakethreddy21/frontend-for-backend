import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useLogin from '@/hooks/useLogin';
import { toast } from './ui/use-toast';
const Logintab = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, response, error } = useLogin();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await login({ email, password });
    };

    useEffect(() => {
        if (response) {
          toast({
            title: response.token,
            description: 'login in successful',
          });
    
          // Set button active when OTP is received
        
        }
        if (error) {
          toast({
            title: typeof error === 'string' ? error : JSON.stringify(error),
          });
        }
      }, [response, error]);
  return (
    <form onSubmit={handleSubmit}>
    <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Email</Label>
              <Input id="name" type="email" value={email}  onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Password</Label>
              <Input id="username" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter>
          <Button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
          </CardFooter>
        </Card>
        </form>
  )
}

export default Logintab