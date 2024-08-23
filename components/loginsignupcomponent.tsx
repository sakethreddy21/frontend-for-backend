import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Login_SignUP_Tabs } from "./loginsignuptabs";
import { getToken } from "@/hooks/getToken";
import { getUserType } from "@/hooks/getUsertype";
import CompleteProfile from "./CompleteProfile";
import { getComplete } from "@/hooks/getIsVerified";

export function Login_SignUP() {
  const [token, setToken] = useState(getToken());
  const [userType, setUserType] = useState(getUserType());
  const [isComplete, setIsComplete] = useState(getComplete());
        
  // Update token and userType whenever they change
  useEffect(() => {
    setToken(getToken());
    setUserType(getUserType());
    setIsComplete(getComplete());

  });


  const renderSpeakerDialog = () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
        {!isComplete ? "Complete Your Profile" : "Profile"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex justify-center items-center flex-col">
        {!isComplete ? <CompleteProfile /> : <h1>Profile</h1>}
      
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" className="mt-2">
              Exit
            </Button>
           
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  const renderUserDialog = () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Profile</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex justify-center items-center flex-col">
        User Profile
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" className="mt-2">
              Logout
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  const renderLoginSignUpDialog = () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Login / Signup</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex justify-center items-center flex-col">
        <Login_SignUP_Tabs />
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" className="mt-2">
              Exit
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  if (token) {
    if (userType === "speaker") {
      return renderSpeakerDialog();
    } else if (userType !== null) {
      return renderUserDialog();
    }
  }

  return renderLoginSignUpDialog();
}
