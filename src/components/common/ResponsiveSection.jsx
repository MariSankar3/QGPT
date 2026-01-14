import React from 'react'
import { cn } from '../../helpers/utils'

function ResponsiveSection({ style, className, children }) {
  return (
    <div
      style={style}
      className={cn(
        className,
        "rounded-[30px] md:rounded-[54px] p-[16px] pt-[16px] md:px-[20px] md:pt-[12px] md:pb-[20px] lg:px-[40px] lg:pt-[16px] lg:pb-[40px] 3xl:px-[60px] 3xl:pt-[20px] 3xl:pb-[60px]"
      )}
    >

      {children}
    </div>
  )
}

export default ResponsiveSection