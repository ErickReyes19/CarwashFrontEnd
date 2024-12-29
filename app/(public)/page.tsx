"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Login from "./components/formLogin";

export default function LoginPage() {
  return (

        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Please sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
          <Login/>
          </CardContent>
        </Card>
  );
}
