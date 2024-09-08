"use client"; // This is a client component 👈🏽

import * as React from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../../jotaiStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function CardWithForm() {
  const [learnerId, setLearnerId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();
  const [error, setError] = React.useState(false);

  function LogIn() {
    //call login api
    //set global state User api data -> setUser()
    setUser({ username: learnerId, password: password });
    router.push("/pages/home");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>to your CDC account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="learnerId">Learner ID</Label>
                <Input
                  id="learnerId"
                  placeholder="Enter Learner ID"
                  value={learnerId}
                  onChange={(e) => setLearnerId(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2">
          <Button className="w-full" onClick={() => LogIn()}>
            Login
          </Button>
          {error ? (
            <p className="text-red-500 text-sm mt-2">Error Logging in</p>
          ) : null}{" "}
        </CardFooter>
      </Card>
    </div>
  );
}
