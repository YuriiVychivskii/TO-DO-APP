import { RiLoader4Line } from 'react-icons/ri';

export default function Loader() {
	return (
		<div className='flex items-center justify-center'>
			<RiLoader4Line className='h-8 w-8 animate-spin text-muted-foreground' />
		</div>
	);
}
