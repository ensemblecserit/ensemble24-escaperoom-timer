"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import Button from "./Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { hints } from "@/data";
import { useTimeContext } from "@/lib/timeContext";

const Aside = () => {
  const { reduce1Min, hint, setHint, usedHints, setUsedHints } =
    useTimeContext();
  useEffect(() => {
    if (!usedHints.includes(hint)) {
      reduce1Min();
      let temp = [...usedHints, hint];
      setUsedHints(temp);
    }
  }, [hint]);
  let advice = `Message the given clue to Jiyaan Job`;
  let phno = `(wa.me/+91${process.env.NEXT_PUBLIC_PHONE})`;
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <div className="flex flex-col items-center justify-center gap-10">
            <p className="text-center text-xl leading-tight px-5">
              You may use hints. Each hint costs 1 minute of your time in the
              escape room. {advice}.{" "}
              <span className="text-green-500">{phno}</span>
            </p>
            {hints.map((hint, index) => {
              if (hint === "") return <></>;
              else
                return (
                  <Button onClick={() => setHint(index)} key={index}>
                    Use hint #{index}
                  </Button>
                );
            })}
          </div>
        </DrawerTrigger>
        <DrawerContent className="mx-auto w-full bg-gray-900 text-white pb-10 outline-none border-none">
          <DrawerHeader>
            <DrawerTitle className="text-[1.5rem] md:leading-normal leading-none">
              Hint #{hint}. {advice}{" "}
              <span className="text-green-500">{phno}</span>
            </DrawerTitle>
            <DrawerDescription className="text-[2rem] leading-tight">
              {hints[hint]}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button className="max-w-[200px]" onClick={() => {}}>
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Aside;
