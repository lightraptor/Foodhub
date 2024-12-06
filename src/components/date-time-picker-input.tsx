import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format, parseISO } from 'date-fns'
import { Calendar } from './ui/calendar'
import { TimePicker } from './time-picker'

type DateTimePickerInputProps = {
  value?: string // ISO string
  onChange: (value: string) => void
}

const DateTimePickerInput = ({ value, onChange }: DateTimePickerInputProps) => {
  const [internalValue, setInternalValue] = useState<string | undefined>(value)

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return
    const newDate = date.toISOString()
    setInternalValue(newDate)
    onChange(newDate)
  }

  const handleTimeChange = (date: Date | undefined) => {
    if (!date) return
    const newDate = date.toISOString()
    setInternalValue(newDate)
    onChange(newDate)
  }

  return (
    <div className='flex flex-col items-start'>
      <Popover>
        <PopoverTrigger asChild>
          <div
            className={cn(
              'w-full flex items-center justify-start gap-4 px-3 py-2 border border-[#d1d5db]  rounded-xl cursor-pointer',
              !internalValue && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {internalValue ? (
              format(parseISO(internalValue), 'PPP HH:mm')
            ) : (
              <span className='text-[#9ca3af]'>Pick a date & time</span>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0 bg-sidebar'>
          <Calendar
            mode='single'
            selected={internalValue ? parseISO(internalValue) : undefined}
            onSelect={handleDateChange}
            disabled={(date) => date < new Date('1900-01-01')}
            initialFocus
          />
          <div className='p-3 border-t border-border'>
            <TimePicker date={internalValue ? parseISO(internalValue) : undefined} setDate={handleTimeChange} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DateTimePickerInput
