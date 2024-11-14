"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

function ReuseAlerDialog({
  open,
  setopen,
  isPending,
  handleActive,
  handleInactive,
  alertTitle,
  alertDescription,
}: {
  open: boolean;
  setopen: React.Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
  handleActive?: () => void;
  handleInactive?: () => void;
  alertTitle: string;
  alertDescription: string;
}) {
  return (
    <AlertDialog open={open} onOpenChange={setopen}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Đóng</AlertDialogCancel>
          {handleActive && (
            <Button
              disabled={isPending}
              onClick={() => handleActive && handleActive()}
            >
              Có
            </Button>
          )}
          {handleInactive && (
            <Button
              disabled={isPending}
              onClick={() => handleInactive && handleInactive()}
            >
              Có
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ReuseAlerDialog;
