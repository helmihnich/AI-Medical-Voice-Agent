'use client'

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

type AddNewSessionDialogProps = {
  text: string;
};

function AddNewSessionDialog({ text }: AddNewSessionDialogProps) {
  const [note, setNote] = useState<string>();
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-3">{text}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription asChild>
            <div>
              <h2>Add Symptoms or Any Other Details</h2>
              <Textarea
                placeholder="add details here..."
                className="h-[150px] mt-2 "
                onChange={(e)=>setNote(e.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button disabled={!note}>
            Next <ArrowRight />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;
