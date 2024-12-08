"use client";
import { isWithinInterval, parse } from "date-fns";
import React from "react";

function ExPage() {
  const now = new Date();
  const currentTime = parse(now.toTimeString().slice(0, 8), "HH:mm:ss", now);
  const startTime = parse("19:00:00", "HH:mm:ss", now);
  const endTime = parse("23:59:59", "HH:mm:ss", now);

  console.log(
    isWithinInterval(currentTime, {
      start: startTime,
      end: endTime,
    })
  );
  return <div>a</div>;
}

export default ExPage;
