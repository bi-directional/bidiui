import { cn } from '../lib/utils';

export type ButtonProps = React.ComponentProps<'button'>;

export function Button({
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn('flex items-center gap-x-2', className)}
      {...props}
    >
      {children}
    </button>
  );
}
