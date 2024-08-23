import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import useVerifyOtp from "@/hooks/useVerifyOTP";
  import { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
  
  interface VerfiyOProps {
    isButtonActive: boolean;
    formData: any;
  }
  
  export function VerfiyO({ isButtonActive, formData }: VerfiyOProps) {
    const [formVerifyData, setFormVerifyData] = useState({ email: formData.email, otp: '' });
    const { verifyOtp, loading, response, error } = useVerifyOtp();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormVerifyData(prevData => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log('formVerifyData', formVerifyData);
      await verifyOtp(formVerifyData);
     
    };
    useEffect(() => {
        if (response) {
          toast({
            title: response.message || 'Signup successful',
            description: 'OTP IS VERIFIED',
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
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button type="button" >
            Verify OTP
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form onSubmit={handleSubmit}>
            <AlertDialogHeader>
              <AlertDialogTitle>Verify OTP</AlertDialogTitle>
              <AlertDialogDescription>
                <Card>
                  <CardHeader className="flex flex-row justify-between w-full">
                    <CardTitle>Login</CardTitle>
                    <div>Resend OTP</div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="otpEmail">Email</Label>
                      <Input
                        id="otpEmail"
                        name="email"
                        value={formVerifyData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="otp">OTP</Label>
                      <Input
                        id="otp"
                        name="otp"
                        value={formVerifyData.otp}
                        onChange={handleChange}
                      />
                    </div>
                  </CardContent>
                </Card>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit" >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  