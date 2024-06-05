/** Core */
import { Info, MinusCircle, PlusCircle } from 'lucide-react';
import CurrencyInput from 'react-currency-input-field';

/** Components */
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

/** Libs */
import { parseFloatLocale } from '@/lib/utils';
import { forwardRef } from 'react';

interface AmountInputProps {
  value: string;
  onChange(value: string | undefined): void;
  placeholder?: string;
  disabled?: boolean;
}

export const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>((props, ref) => {
  const parsedValue = parseFloatLocale(props.value || '');
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  function handleReverseValue() {
    if (!props.value) {
      return;
    }

    const newValue = (parsedValue * -1).toString();
    props.onChange(newValue);
  }

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              type="button" size="icon" onClick={handleReverseValue}
              className={`absolute left-1.5 top-1.5 size-fit p-2
              ${isIncome && 'bg-emerald-500 hover:bg-emerald-600'}
              ${isExpense && 'bg-rose-500 hover:bg-rose-600'}`}
            >
              {!parsedValue && <Info className="size-3 text-white" />}

              {isIncome && <PlusCircle className="size-3 text-white" />}

              {isExpense && <MinusCircle className="size-3 text-white" />}

            </Button>
          </TooltipTrigger>

          <TooltipContent>
            Use [+] for income and [-] for expenses
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <CurrencyInput
        prefix="R$" placeholder={props.placeholder} value={props.value} decimalScale={2} decimalsLimit={2}
        onValueChange={props.onChange} disabled={props.disabled} ref={ref}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm
        ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium
        placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />

      <p className="mt-2 text-sm text-muted-foreground">
        {isIncome && 'This will count as income'}
        {isExpense && 'This will count as expense'}
      </p>
    </div>
  );
});

AmountInput.displayName = 'AmountInput';
