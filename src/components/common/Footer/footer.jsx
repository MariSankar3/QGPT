import { NavLink } from "react-router";
import Separator from "../Separator";
import { cn } from "../../../helpers/utils";
import { MAX_WIDTH } from "../../constants/css-classes";

const Footer = () => (
  <div className={cn('relative z-50 mx-auto footer h-fit flex flex-col flex-1 px-[20px] lg:px-[60px]', MAX_WIDTH)}>
    <Separator variant='v2'/>
    <div className="flex flex-col ">
      <footer className='py-[40px] flex flex-col gap-[12px] lg:gap-[20px] bg-[#121212] -mx-[20px] lg:mx-0 p-[20px] lg:px-0'>
        <div className="flex flex-col gap-[12px]">
          <div className='lg:px-[20px] flex flex-col gap-[40px] lg:flex-row w-full justify-between text-[14px]'>
            <div className='flex flex-wrap flex-col md:flex-row md:justify-center lg:justify-start flex-1 gap-[4px] lg:gap-[32px]'>
              <div>Copyright © ChronicGPT 2026</div>
              <div>Privacy Policy</div>
              <div>Terms & Conditions</div>
            </div>
            <div className='flex flex-col gap-[12px] md:justify-center md:items-center lg:justify-start'>
              <Separator variant='v2' className={"flex lg:hidden mb-2"} />
             <a
                href="https://etherealdesign.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:no-underline !decoration-none"
               >
           Designed & Developed by Etherealdesign.io
               </a>
            </div>
          </div>
        </div>
      </footer>
    </div>

  </div>
)

export default Footer