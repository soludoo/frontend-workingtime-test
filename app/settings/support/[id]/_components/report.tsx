"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const Report = () => {
  const [value, setValue] = React.useState("");

  return (
    <div className="flex flex-col gap-10 h-full justify-between p-5">
      <div className="flex flex-col gap-4">
        <RadioGroup
          value={value}
          onValueChange={(val) => setValue(val)}
          className="gap-4"
        >
          <div className="flex items-center gap-3 justify-between">
            <Label htmlFor="PTO">What are the different types of PTO?</Label>
            <RadioGroupItem value="PTO" id="PTO" />
          </div>
          <div className="border-b border-border w-full" />

          <div className="flex items-center gap-3 justify-between">
            <Label htmlFor="time">How do I request vacation time?</Label>
            <RadioGroupItem value="time" id="time" />
          </div>
          <div className="border-b border-border w-full" />

          <div className="flex items-center gap-3 justify-between">
            <Label htmlFor="requests">Where can I see my past requests?</Label>
            <RadioGroupItem value="requests" id="requests" />
          </div>
          <div className="border-b border-border w-full" />

          <div className="flex items-center gap-3 justify-between">
            <Label htmlFor="remove">How do I change or remove a request?</Label>
            <RadioGroupItem value="remove" id="remove" />
          </div>
          <div className="border-b border-border w-full" />

          <div className="flex items-center gap-3 justify-between">
            <Label htmlFor="balance">Where can I view my PTO balance?</Label>
            <RadioGroupItem value="balance" id="balance" />
          </div>
          <div className="border-b border-border w-full" />

          <div className="flex items-center gap-3 justify-between">
            <Label htmlFor="observe">
              Which holidays does NoviPlan observe?
            </Label>
            <RadioGroupItem value="observe" id="observe" />
          </div>
          <div className="border-b border-border w-full" />

          <div className="flex items-center gap-3 justify-between">
            <Label htmlFor="paycheck">Who do I ask about my paycheck?</Label>
            <RadioGroupItem value="paycheck" id="paycheck" />
          </div>
          <div className="border-b border-border w-full" />
          <div className="flex items-center gap-3 justify-between">
            <Label htmlFor="other">Other</Label>
            <RadioGroupItem value="other" id="other" />
          </div>
        </RadioGroup>
        {value === "other" && (
          <div className="flex flex-col mt-3 gap-2">
            <Label htmlFor="problem">Type your problem</Label>
            <Textarea
              id="problem"
              placeholder="Write your problem here..."
              className="h-[120px]"
            />
          </div>
        )}
      </div>
      <Button>Submit</Button>
    </div>
  );
};

export default Report;
