import { RiLoader4Line } from 'react-icons/ri';

export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <RiLoader4Line className="text-muted-foreground h-8 w-8 animate-spin" />
    </div>
  );
}
