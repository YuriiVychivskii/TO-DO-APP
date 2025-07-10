import clsx from 'clsx';
import * as React from 'react';

function Button({ className, ...props }: React.ComponentProps<'button'>) {
  return (
    <button
      data-slot="button"
      className={clsx(
        'cursor-pointer rounded-md border px-4 py-2 text-sm transition-colors',
        className,
      )}
      {...props}
    />
  );
}

export { Button };
