/** Core */
import { format, parse } from 'date-fns';
import { useState } from 'react';

/** Components */
import { Button } from '@/components/ui/button';
import { PageCard } from '@/components/ui/page-card';
import { ImportTable } from '@/features/transactions/components/import-table';

/** Libs */
import { convertAmounToMiliunits } from '@/lib/utils';

/** Config */
import { dateFormat, outputFormat, requiredOptions } from '@/config/import-card';

/** Interfaces */
import { SelectedColumnsState } from '@/interfaces/selected-columns-state';

interface ImportCartProps {
  data: string[][];
  onCancel(): void;
  onSubmit(data: any): void;
}

export function ImportCard(props: ImportCartProps) {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>({});

  function handleHeadSelectChange(columnIndex: number, value: string | null) {
    const selectedOptionValue = value === 'skip' ? null : value;

    setSelectedColumns((prev) => {
      const newSelectedColumns = Object.keys(prev).reduce<SelectedColumnsState>((acc, key) => {
        acc[key] = prev[key] === selectedOptionValue ? null : prev[key];

        return acc;
      }, {});

      newSelectedColumns[`column_${columnIndex}`] = selectedOptionValue;

      return newSelectedColumns;
    });
  }

  function handleContinue() {
    const mappedData = {
      headers: headers.map((_, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);

        return selectedColumns[`column_${columnIndex}`] || null;
      }),
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);

            return selectedColumns[`column_${columnIndex}`] ? cell : null;
          });

          return transformedRow.every((cell) => cell === null) ? [] : transformedRow;
        })
        .filter((row) => row.length),
    };

    const arrayData = mappedData.body.map((row) => {
      return row.reduce<SelectedColumnsState>((acc, cell, index) => {
        const header = mappedData.headers[index];
        if (header) acc[header] = cell;

        return acc;
      }, {});
    });

    const formattedData = arrayData.map((row) => ({
      ...row,
      amount: convertAmounToMiliunits(parseFloat(row.amount!)),
      date: format(parse(row.date!, dateFormat, new Date()), outputFormat),
    }));

    props.onSubmit(formattedData);
  }

  function getColumnIndex(column: string) {
    return column.split('_')[1];
  }

  const headers = props.data[0];
  const body = props.data.slice(1);
  const progress = Object.values(selectedColumns).filter(Boolean).length;

  return (
    <PageCard
      title="Import transactions"
      header={(
        <>
          <Button size="sm" className="w-full lg:w-auto" onClick={props.onCancel}>
            Cancel
          </Button>

          <Button
            size="sm" className="w-full lg:w-auto" disabled={progress < requiredOptions.length} onClick={handleContinue}
          >
            Continue ({progress} / {requiredOptions.length})
          </Button>
        </>
      )}
    >
      <ImportTable
        headers={headers} body={body} selectedColumns={selectedColumns} onHeadSelectChange={handleHeadSelectChange}
      />
    </PageCard>
  );
}
