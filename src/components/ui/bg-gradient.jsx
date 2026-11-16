import React from "react";
import { cn } from "@/lib/utils";

export const BgGradient = ({ 
  className,
  gradientFrom = "#f6faf7",
  gradientTo = "#b2d6c2",
  gradientSize = "125% 125%",
  gradientPosition = "50% 10%",
  gradientStop = "15%"
}) => {
  return (
    <div 
      className={cn(
        "absolute inset-0 w-full h-full z-0 pointer-events-none",
        className
      )}
      style={{
        background: `radial-gradient(${gradientSize} at ${gradientPosition}, ${gradientFrom} ${gradientStop}, ${gradientTo} 100%)`
      }}
    />
  );
};

export const Component = BgGradient;
export default BgGradient;
