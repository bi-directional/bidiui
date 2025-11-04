import { cn } from '../lib/utils';

export type InputProps = React.ComponentProps<'input'>;

export function Input({ type = 'text', className, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn('ltr:text-left rtl:text-right', className)}
      {...props}
    />
  );
}
