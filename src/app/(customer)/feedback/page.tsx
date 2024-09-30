import React from "react";
import { FeedbackForm, FeedbackList } from "@/app/(customer)/components";

function FeedbackPage() {
  return (
    <div>
      <FeedbackList />
      <FeedbackForm />
    </div>
  );
}

export default FeedbackPage;
