import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { cn } from "../../../helpers/utils";
import { MAX_WIDTH } from "../../constants/css-classes";

function AppDialog({ trigger, className, contentClassName, title, children, open, onOpenChange }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {/* Trigger stays visible */}
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay asChild>
          <motion.div
            className="fixed inset-0 bg-black/60 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </Dialog.Overlay>

        {/* Content */}
        <Dialog.Content asChild>
          <motion.div
            className="fixed inset-0 z-[101]
               flex items-center justify-center"
          >
            <motion.div
              data-lenis-prevent
              className={cn("rounded-[20px] bg-white shadow-xl relative", className)}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
            >
              <div className={cn("flex justify-between items-start w-[90vw] max-h-[80lvh] p-[16px] lg:p-[32px] overflow-y-auto", MAX_WIDTH, contentClassName)}>
                <div>{children}</div>

                <Dialog.Close className="shrink-0 cursor-pointer sticky top-[8px]">
                  <img
                    src="/assets/icons/close.svg"
                    alt=""
                    className="w-[32px] h-[32px]"
                  />
                </Dialog.Close>
              </div>
            </motion.div>
          </motion.div>
        </Dialog.Content>

      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AppDialog;
