/* eslint-disable */
import React from "react";

function ExPage() {
  const fetchx = async () => {
    const res = await fetch(
      "http://vktrng.ddns.net:8080/api/Attendance/checkin?restaurantId=30f31927-9378-4fd2-ad75-1305032aad3b&shiftId=30f31927-9378-4fd2-ad75-1305032aad3b&userId=30f31927-9378-4fd2-ad75-1305032aad3b&date=4&latitude=5&longitude=6",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
  };

  fetchx();
  return <div>a</div>;
}

export default ExPage;
