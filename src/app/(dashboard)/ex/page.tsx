import React from "react";

function ExPage() {
  function countCharacterInString(inputString: string) {
    for (let i = 0; i < inputString.length; i++) {
      const char = inputString[i];
      console.log(char);
      console.log(i);
    }
  }

  // console.log();
  countCharacterInString("abccca388**");

  return <div>a</div>;
}

export default ExPage;
