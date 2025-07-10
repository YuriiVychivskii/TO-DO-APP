import clsx from 'clsx';
import * as React from 'react';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={clsx(
        'focus:ring-primary h-9 w-full rounded-md border px-3 py-1 text-base focus:ring-2 focus:outline-none',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
