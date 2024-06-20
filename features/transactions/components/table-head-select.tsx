/** Components */
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';

/** Libs */
import { cn } from '@/lib/utils';

/** Interfaces */
import { availableOptions } from '@/config/import-card';
import { SelectedColumnsState } from '@/interfaces/selected-columns-state';

interface TableHeadSelectProps {
  columnIndex: number;
  selectedColumns: SelectedColumnsState;
  onChange(columnIndex: number, value: string | null): void;
}

export function TableHeadSelect(props: TableHeadSelectProps) {
  const currentSelection = props.selectedColumns[`column_${props.columnIndex}`];

  return (
    <Select value={currentSelection || ''} onValueChange={(value) => props.onChange(props.columnIndex, value)}>
      <SelectTrigger
        className={cn(
          'focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize',
          currentSelection && 'text-blue-500',
        )}
      >
        <SelectValue placeholder="Skip" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="skip">
          Skip
        </SelectItem>

        <SelectSeparator />

        {availableOptions.map((option, index) => {
          const isDisabled = Object.values(props.selectedColumns).includes(option) &&
            props.selectedColumns[`column_${props.columnIndex}`] !== option;

          return (
            <SelectItem key={index} value={option} disabled={isDisabled} className="capitalize">
              {option}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
