"use client"; // This is a client component 👈🏽

import * as React from "react";
import { useAtom } from "jotai";
import { userAtom, slotsAtom, creditAtom } from "../../../jotaiStore";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function CardWithForm() {
  const [user, setUser] = useAtom(userAtom);
  const [credit, setCreditAtom] = useAtom(creditAtom);
  const [cdcAccountBalance, setCDCaccBalance] = React.useState(0);

  const [slotAtom, setSlotsAtom] = useAtom(slotsAtom);

  const router = useRouter();

  function choose_sessions() {
    router.push("/pages/choose_sessions");
  }

  React.useEffect(() => {
    //api call to get CDC account balance and credits -> setCDCaccBalance(),setCreditAtom()
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>User: {user.username}</CardTitle>
          <CardDescription>
            Available Credits: {credit} | CDC Account balance:{" "}
            {cdcAccountBalance}
          </CardDescription>
          <CardDescription>
            Click Choose Timings to start booking!
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex-row">
          <Button onClick={() => choose_sessions()}>Choose Timings</Button>
          <Button className="ml-2" onClick={() => TopUp()}>
            Top Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
