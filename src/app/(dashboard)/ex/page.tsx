"use client";
import { isAfter, parse } from "date-fns";
import React from "react";

function ExPage() {
  const time1 = parse("16:00:00", "HH:mm:ss", new Date());
  const time2 = parse("09:00:00", "HH:mm:ss", new Date());
  console.log(isAfter(time1, time2));

  return <div>a</div>;
}

export default ExPage;
