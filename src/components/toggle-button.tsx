import { cn } from '../lib/utils';

import { Button } from './button';

export type ToggleButtonProps = React.ComponentProps<'button'> & {
  selected?: boolean;
  selectedClassName?: string;
  onSelectChange?: (isSelected: boolean) => void;
};

export function ToggleButton({
  selected,
  onSelectChange,
  selectedClassName,
  onClick,
  className,
  children,
  ...props
}: ToggleButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onSelectChange?.(!selected);
    onClick?.(e);
  };

  return (
    <Button
      onClick={handleClick}
      aria-pressed={selected}
      data-selected={selected}
      className={cn(selected && selectedClassName, className)}
      {...props}
    >
      {children}
    </Button>
  );
}
