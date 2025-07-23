"use client"

import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "./ui/button";
import { CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

interface CopyEventButtonProps 
    extends Omit<React.ComponentProps<"button">, "children" | "onClick"> ,
    VariantProps<typeof buttonVariants> {
    eventId: string; // The ID of the event to copy
    clerkUserId: string; // The ID of the user who created the event
    }

//
type CopyState = "idle" | "copied" | "error"; 

function getCopyLabel(state: CopyState) {
    switch (state) {
    case "copied":
        return "Copied!"
    case "error":
        return "Error"
    case "idle":
    default:
        return "Copy Link"
    }
}

export function CopyEventButton({
    eventId,
    clerkUserId,
    className,
    variant,
    size,
    ...props // Any other button props like disabled, type, etc.
  } : CopyEventButtonProps) {

  
    const [copyState, setCopyState] = useState<CopyState>("idle") // Manage the copy feedback state

    const handleCopy = () => {
        const url = `${location.origin}/book/${clerkUserId}/${eventId}` // Construct the booking URL
    
        navigator.clipboard
          .writeText(url) // Try to copy the URL
          .then(() => {
            setCopyState("copied") // On success, show "Copied!" state
            toast("Link copied successfully.", {
              duration: 3000
            })
            setTimeout(() => setCopyState("idle"), 2000) // Reset after 2 seconds
          })
          .catch(() => {
            setCopyState("error") // On failure, show "Error" state
            setTimeout(() => setCopyState("idle"), 2000) // Reset after 2 seconds
          })
      }
    

    return (
        <Button
          onClick={handleCopy}
          className={cn(buttonVariants({ variant, size }), 'cursor-pointer', className)} // Apply variant/size classes + any custom classes
          variant={variant}
          size={size}
          {...props}
        >
          <CopyIcon className="size-4 mr-2" /> {/* Icon that changes with copy state */}
          {getCopyLabel(copyState)} {/* Text label that changes with copy state */}
        </Button>
      )
}