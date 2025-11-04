import { Children, cloneElement, isValidElement, useId, useState } from 'react';

import { cn } from '../lib/utils';

import { ToggleButton, type ToggleButtonProps } from './toggle-button';

export type ToggleButtonGroupProps = React.ComponentProps<'div'> &
  Partial<{
    multiple: boolean;
    orientation: 'horizontal' | 'vertical';
    defaultSelection: string[];
  }>;

export default function ToggleButtonGroup({
  multiple = false,
  defaultSelection = [],
  orientation = 'horizontal',
  className,
  children,
  ...props
}: ToggleButtonGroupProps) {
  const defaultSelectionSet = new Set(multiple ? defaultSelection : [defaultSelection[0]]);
  const [selection, setSelection] = useState<Set<string>>(defaultSelectionSet);
  const groupId = useId();

  return (
    <div
      role='radiogroup'
      aria-orientation={orientation}
      className={cn(
        'flex flex-row items-center',
        orientation === 'vertical' && 'flex-col',
        className
      )}
      {...props}
    >
      {Children.map(children, (child, index) => {
        if (isValidElement<ToggleButtonProps>(child) && child.type === ToggleButton) {
          const itemId = `${groupId}${index}`;
          const { id = itemId, value } = child.props;
          const comparable = `${value || id}`;
          const selected = selection.has(comparable);

          const handleSelectChange = () => {
            const newSelection = multiple ? new Set(...selection) : new Set<string>();
            selected ? newSelection.delete(comparable) : newSelection.add(comparable);
            setSelection(newSelection);
          };

          return cloneElement(child, {
            key: index,
            role: 'radio',
            selected,
            onSelectChange: handleSelectChange,
            'aria-checked': selected,
            'aria-pressed': undefined,
          });
        }

        return child;
      })}
    </div>
  );
}
