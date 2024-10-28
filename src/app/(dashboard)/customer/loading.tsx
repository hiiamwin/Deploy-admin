import { Loader2 } from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="w-full flex items-center justify-center p-80">
      <Loader2 className="animate-spin h-8 w-8" />
    </div>
  );
}

export default Loading;
