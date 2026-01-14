import * as Select from "@radix-ui/react-select";
import * as Label from "@radix-ui/react-label";
import { HiChevronDown } from "react-icons/hi";

function FormSelect({ label, id, placeholder, options = [], onValueChange }) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      {/* Label */}
      <Label.Root
        htmlFor={id}
        className="text-[#121212] font-normal text-[18px] leading-[24px]"
      >
        {label}
      </Label.Root>

      <Select.Root onValueChange={onValueChange}>
        <Select.Trigger
          id={id}
          className="
            flex items-center justify-between
            w-full h-[50px]
            rounded-[12px]
            px-[23px]
            border border-black/20
            text-[#121212]
            focus:outline-none
            focus:ring-2 focus:ring-[#121212]
            focus:border-transparent
            bg-white
          "
        >
          <Select.Value
            placeholder={
              <span className="text-black/40">{placeholder}</span>
            }
          />
          <Select.Icon>
            <HiChevronDown className="text-[20px] text-black/60" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="
              z-[200]
              rounded-[12px]
              bg-white
              shadow-lg
              border border-black/5
            "
          >
            <Select.Viewport className="p-[8px]">
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="
                    px-[16px] py-[10px]
                    rounded-[8px]
                    cursor-pointer
                    text-[#121212]
                    outline-none
                    data-[highlighted]:bg-black/5
                    data-[state=checked]:bg-black/10
                  "
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

export default FormSelect;
