/** Core */
import { Children, PropsWithChildren, ReactElement, ReactNode, useMemo } from 'react';

/** Components */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ImportCartProps {
  title: string;
  header: ReactElement;
  isLoading?: boolean;
  loadingContent?: ReactNode;
}

export function PageCard({ isLoading = false, ...props }: PropsWithChildren<ImportCartProps>) {
  const buttonElements = useMemo(() => {
    if (props.header.type === Button) {
      return Children.toArray(props.header);
    }

    return Children.toArray(props.header.props.children);
  }, [props.header]);

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-48" />

              {buttonElements.length >= 1 && (
                <div className="flex flex-col items-center gap-2 lg:flex-row">
                  {buttonElements.map((_, index) => (
                    <Skeleton className="h-8 w-full lg:w-24" key={index} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <CardTitle className="line-clamp-1 text-xl">
                {props.title}
              </CardTitle>

              {props.header && (
                <div className="flex flex-col items-center gap-2 lg:flex-row">
                  {props.header}
                </div>
              )}
            </>
          )}
        </CardHeader>

        <CardContent>
          {isLoading ? props.loadingContent : props.children}
        </CardContent>
      </Card>
    </div >
  );
}
