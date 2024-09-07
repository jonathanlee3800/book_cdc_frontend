"use client"; // This is a client component 👈🏽

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAtom } from "jotai";
import { userAtom } from "../../jotaiStore";
import { LoadingSpinner } from "@/components/ui/loading";

import React from "react";

export default function TableDemo() {
  const slots = [
    "8:30am",
    "10:20am",
    "12:45pm",
    "2:35pm",
    "4:25pm",
    "6:50pm",
    "8:40pm",
  ];

  const addItem = (newItem) => {
    setSelected((prevItems) => {
      if (isObjectInArray(dates_selected, newItem)) {
        return prevItems.filter(
          (item) =>
            item.date != newItem.date &&
            item.time != newItem.time &&
            item.slotNo != newItem.slotNo
        );
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  const isObjectInArray = (arr, obj) => {
    return arr.some(
      (item) =>
        item.date === obj.date &&
        item.time === obj.time &&
        item.slotNo === obj.slotNo
    );
  };
  function generateDates(days) {
    const dates = [];
    const currentDate = new Date();
    for (let i = 0; i < days; i++) {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + i);
      const date = newDate.getDate();
      const month = newDate.getMonth() + 1;
      const year = newDate.getFullYear();
      const day = newDate.getDay();
      let dayName;

      switch (day) {
        case 0:
          dayName = "Sunday";
          break;
        case 1:
          dayName = "Monday";
          break;
        case 2:
          dayName = "Tuesday";
          break;
        case 3:
          dayName = "Wednesday";
          break;
        case 4:
          dayName = "Thursday";
          break;
        case 5:
          dayName = "Friday";
          break;
        case 6:
          dayName = "Saturday";
          break;
        default:
          dayName = "Invalid day";
      }
      const currdate = {
        date: date + "/" + month + "/" + year,
        day: dayName,
      };
      dates.push(currdate);
    }
    setDate(dates);
  }
  const [alldates, setDate] = React.useState([]);
  const [dates_selected, setSelected] = React.useState([]);
  const [user, setUser] = useAtom(userAtom);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    generateDates(60);
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <LoadingSpinner />;
  } else {
    return (
      <ScrollArea className="grow whitespace-nowrap rounded-md border">
        <div>
          {user.username}
          {user.password}
        </div>
        <Table>
          <TableCaption>Dates from now to 60 days</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead key={0}>Timings</TableHead>
              {alldates.map((day) => (
                <TableHead key={day.date}>
                  {day.date} {day.day}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {slots.map((slot, slotIndex) => (
              <TableRow key={slot}>
                <TableCell className="font-medium">{slot}</TableCell>
                {alldates.map((date, dateIndex) => (
                  <TableCell key={`${dateIndex}-${slotIndex}`}>
                    <Checkbox
                      id="terms"
                      checked={isObjectInArray(dates_selected, {
                        date: date.date,
                        time: slot,
                        slotNo: (slotIndex + 1.0).toFixed(2),
                      })}
                      onClick={() =>
                        addItem({
                          date: date.date,
                          time: slot,
                          slotNo: (slotIndex + 1.0).toFixed(2),
                        })
                      }
                      disabled={
                        (date.day == "Sunday" && slot == "6:50pm") ||
                        (date.day == "Sunday" && slot == "8:40pm") ||
                        (date.day == "Saturday" && slot == "6:50pm") ||
                        (date.day == "Saturday" && slot == "8:40pm")
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
        <Button
          onClick={() => {
            console.log(user);
          }}
        >
          Save timings
        </Button>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  }
}
