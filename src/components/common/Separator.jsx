import React from 'react'
import { cn } from '../../helpers/utils'

function Separator({ variant = "v1", className }) {
  switch (variant) {
    case "v2":
      return (
        <div className={cn('h-[1px] w-full bg-white/30', className)}>
        </div>
      )
  }
  return <div className={cn('!h-[1px] separator-line', className)}></div>
}


export default Separator