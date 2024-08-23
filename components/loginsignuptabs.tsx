"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import Signuptab from "./Signuptab";
import Logintab from "./Logintab";

export function Login_SignUP_Tabs() {

  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign_UP</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
       <Logintab/>
      </TabsContent>
      <TabsContent value="signup">
        <Signuptab />
      </TabsContent>
    </Tabs>
  );
}
