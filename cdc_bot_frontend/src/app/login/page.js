"use client"; // This is a client component 👈🏽

import * as React from "react";

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

export default function CardWithForm() {
  const [learnerId, setLearnerId] = React.useState("");
  const [password, setPassword] = React.useState("");

  function LogIn() {
    console.log(learnerId, password);
  }

  return (
    <div class="flex justify-center">
      <Card className=" grow">
        <CardHeader>
          <CardTitle>Login</CardTitle>
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
        <CardFooter className="flex justify-between">
          <Button onClick={() => LogIn()}>Login</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
