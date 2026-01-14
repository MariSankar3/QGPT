import * as Label from "@radix-ui/react-label";
import * as Checkbox from "@radix-ui/react-checkbox";
import { HiCheck } from "react-icons/hi";
import { cn } from "../../../helpers/utils";

function FormMultiSelect({ label, id, options = [], onValueChange, currentValues = [], className }) {
  const handleCheckboxChange = (value, checked) => {
    let newValues;

    if (checked) {
      // Add to selected values
      newValues = [...currentValues, value];
    } else {
      // Remove from selected values
      newValues = currentValues.filter(v => v !== value);
    }

    // Call the onValueChange callback with new values
    if (onValueChange) {
      onValueChange(newValues);
    }
  };

  return (
    <div className={cn("flex flex-col gap-[10px] w-full", className)}>
      {/* Label */}
      <Label.Root
        htmlFor={id}
        className="text-[#121212] font-normal text-[18px] leading-[24px]"
      >
        {label}
      </Label.Root>

      {/* Options */}
      <div className="flex flex-col gap-[8px]">
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-[8px]">
            <Checkbox.Root
              id={`${id}-${option.value}`}
              checked={currentValues.includes(option.value)}
              onCheckedChange={(checked) => handleCheckboxChange(option.value, checked)}
              className="
                flex h-[20px] w-[20px] items-center justify-center rounded-[4px]
                border border-black/40 bg-white
                focus:outline-none focus:ring-2 focus:ring-[#121212] focus:border-transparent
                data-[state=checked]:bg-[#121212] data-[state=checked]:border-[#121212]
              "
            >
              <Checkbox.Indicator>
                <HiCheck className="h-[14px] w-[14px] text-white" />
              </Checkbox.Indicator>
            </Checkbox.Root>

            <Label.Root
              htmlFor={`${id}-${option.value}`}
              className="text-[#121212] text-[16px] leading-[20px] cursor-pointer select-none"
            >
              {option.label}
            </Label.Root>

            {/* Hidden input for form submission */}
            {currentValues.includes(option.value) && (
              <input
                type="hidden"
                name={`${id}[]`}
                value={option.value}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormMultiSelect;