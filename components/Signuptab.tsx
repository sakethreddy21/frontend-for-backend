import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useSignup from '@/hooks/useSignup';
import { toast } from './ui/use-toast';
import { VerfiyO } from './verifyOtpmodal';

const Signuptab = () => {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "user" as "user" | "speaker",
  });

  const { signup, loading, response, error, otp } = useSignup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(formData);
  };

  useEffect(() => {
    if (response) {
      toast({
        title: response.message || 'Signup successful',
        description: `OTP is ${otp}`,
      });

      // Set button active when OTP is received
      setIsButtonActive(true);
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
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="userType">User Type</Label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="speaker">Speaker</option>
            </select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
          <VerfiyO
            isButtonActive={isButtonActive}
            formData={formData}
           
          />
        </CardFooter>
      </Card>
    </form>
  );
};

export default Signuptab;
