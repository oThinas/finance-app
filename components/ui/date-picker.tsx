/** Core */
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';

/** Components */
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

/** Libs */
import { cn } from '@/lib/utils';

interface DatePickerProps {
  value?: Date;
  onChange?: SelectSingleEventHandler;
  disabled?: boolean;
}

export function DatePicker(props: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSelectDay() {
    setIsOpen(false);
  }

  return (
    <Popover modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={props.disabled} variant="outline" tabIndex={0}
          className={cn('w-full justify-start text-left font-normal', !props.value && 'text-muted-foreground')}
        >
          <CalendarIcon className="mr-2 size-4" />

          {props.value ? format(props.value, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <Calendar
          mode="single" selected={props.value} onSelect={props.onChange} disabled={props.disabled} initialFocus
          onDayClick={handleSelectDay}
        />
      </PopoverContent>
    </Popover>
  );
}
