import clsx from 'clsx';
import * as React from 'react';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot='input'
			className={clsx(
				'w-full h-9 px-3 py-1 rounded-md border text-base focus:outline-none focus:ring-2 focus:ring-primary',
				className
			)}
			{...props}
		/>
	);
}

export { Input };
