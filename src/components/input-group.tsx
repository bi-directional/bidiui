import { cn } from '../lib/utils';

export type InputGroupProps = React.ComponentProps<'div'>;

export function InputGroup({ className, children, ...props }: InputGroupProps) {
  return (
    <div
      role='group'
      className={cn(
        'inline-flex flex-wrap focus-within:outline **:outline-none gap-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export type InputGroupAddonProps = React.ComponentProps<'div'> & {
  block?: boolean;
};

export function InputGroupAddon({
  block = false,
  className,
  children,
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      role='group'
      className={cn(
        'inline-flex items-center gap-1 shrink-0',
        block && 'flex w-full',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
