import * as Label from "@radix-ui/react-label";
import * as React from "react";

function FormTextArea({
  label,
  id,
  placeholder,
  rows = 4,
  ...props
}) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      {/* Label */}
      <Label.Root
        htmlFor={id}
        className="text-[#121212] font-normal text-[18px] leading-[24px]"
      >
        {label}
      </Label.Root>

      {/* TextArea */}
      <div
        className="
          w-full min-h-[120px]
          rounded-[12px]
          border-[1px] border-black/20
          bg-white
          px-[23px] py-[10px]
          flex
          focus-within:border-black/30
        "
      >
        {/* Textarea */}
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          className="
            w-full
            bg-transparent
            text-[#121212]
            placeholder:text-black/40
            resize-none
            outline-none
            border-none
            focus:outline-none
          "
          {...props}
        />
      </div>

    </div>
  );
}

export default FormTextArea;
