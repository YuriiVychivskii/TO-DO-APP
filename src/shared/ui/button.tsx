import clsx from 'clsx';
import * as React from 'react';

function Button({ className, ...props }: React.ComponentProps<'button'>) {
	return (
		<button
			data-slot='button'
			className={clsx(
				'px-4 py-2 rounded-md border text-sm transition-colors cursor-pointer',
				className
			)}
			{...props}
		/>
	);
}

export { Button };
