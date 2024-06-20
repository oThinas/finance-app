/** Components */
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableHeadSelect } from '@/features/transactions/components/table-head-select';

/** Interfaces */
import { SelectedColumnsState } from '@/interfaces/selected-columns-state';

interface ImportTableProps {
  headers: string[];
  body: string[][];
  selectedColumns: SelectedColumnsState;
  onHeadSelectChange(columnIndex: number, value: string | null): void;
}

export function ImportTable(props: ImportTableProps) {
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            {props.headers.map((_, index) => (
              <TableHead key={index}>
                <TableHeadSelect
                  columnIndex={index}
                  selectedColumns={props.selectedColumns}
                  onChange={props.onHeadSelectChange}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {props.body.map((row, index) => (
            <TableRow key={index}>
              {row.map((cell, index) => (
                <TableCell key={index}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
