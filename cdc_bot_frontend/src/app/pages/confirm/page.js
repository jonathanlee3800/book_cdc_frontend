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
  const [learnerId, setLearnerId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = useAtom(userAtom);
  const [credit, setCreditAtom] = useAtom(creditAtom);
  const [cdcAccountBalance, setCDCaccBalance] = React.useState(0);

  const [slotAtom, setSlotsAtom] = useAtom(slotsAtom);

  const router = useRouter();

  function Back() {
    router.push("/pages/choose_sessions");
    console.log(slotAtom);
  }
  function Confirm() {
    //api call to confirm slots
    //if success -> router.push("/pages/confirmation")
    router.push("/pages/checkout");
  }
  React.useEffect(() => {
    //api call to get CDC account balance and credits -> setCDCaccBalance(),setCreditAtom()
  }, []);

  return (
    <div className="flex justify-center">
      <Card className=" grow">
        <CardHeader>
          <CardTitle>Confirm & Search</CardTitle>
          <CardDescription>
            Available Credits: {credit} | CDC Account balance:{" "}
            {cdcAccountBalance}
          </CardDescription>
          <CardDescription>Each search is 1 credit</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5"></div>
              <ScrollArea className=" rounded-md border">
                <div className="p-4">
                  <h4 className="mb-4 text-sm font-medium leading-none">
                    Slots Selected
                  </h4>
                  {slotAtom.map((slot, idx) => (
                    <>
                      <div key={idx} className="text-sm">
                        {slot.date} &nbsp;{slot.time}
                      </div>
                      <Separator className="my-2" />
                    </>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-row">
          <Button onClick={() => Back()}>Back</Button>
          {credit >= 1 ? (
            <Button
              className="m-2 bg-green-500 text-white"
              onClick={() => Confirm()}
            >
              Confirm
            </Button>
          ) : (
            <Button
              className="m-2 bg-green-500 text-white"
              onClick={() => TopUp()}
            >
              Top up
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
