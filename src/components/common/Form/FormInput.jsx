import * as Label from "@radix-ui/react-label";
import * as React from "react";
import { cn } from "../../../helpers/utils";

function FormInput({ label, id, type = "text", className, placeholder, ...props }) {
  return (
    <div className={cn("flex flex-col gap-[6px] lg:gap-[10px] w-[245px]", className)}>
      {/* Label */}
      <Label.Root htmlFor={id} className="text-[#121212] font-normal text-[14px] lg:text-[18px] leading-[18px] lg:leading-[24px]">
        {label}
      </Label.Root>

      {/* Input */}
      <input
        id={id}
        type={type}
        // placeholder={placeholder}
        className="
          w-full h-[40px] lg:h-[50px] rounded-[8px] lg:rounded-[12px]
          px-[23px] py-[6px] lg:py-[10px]
          border border-black/20
          text-[#121212]
          placeholder:text-black/40
          focus:outline-none focus:ring-2 focus:ring-[#121212] focus:border-transparent
        "
        {...props}
      />
    </div>
  );
}

export default FormInput;
