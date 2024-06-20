/** Core */
import { Upload } from 'lucide-react';
import { useCSVReader } from 'react-papaparse';

/** Components */
import { Button } from '@/components/ui/button';

interface UploadButtonProps {
  onUpload(results: any): void;
}

export function UploadButton(props: UploadButtonProps) {
  const { CSVReader } = useCSVReader();

  // TODO: add a paywall

  return (
    <CSVReader onUploadAccepted={props.onUpload}>
      {({ getRootProps }: any) => (
        <Button {...getRootProps()} size="sm" className="w-full lg:w-auto">
          <Upload className="mr-2 size-4" />

          Import
        </Button>
      )}
    </CSVReader>
  );
}
