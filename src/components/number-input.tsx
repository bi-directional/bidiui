import { useState, useCallback } from 'react';

import { cn, toPlain } from '../lib/utils';
import { mergeRefs } from '../lib/merge-refs';

import { useEvent } from '../hooks/use-event';

import { Input } from './input';

export type NumberInputChangeMetadata = {
  isNaN: boolean;
  isEmpty: boolean;
  rawValue: string;
};

export type NumberInputControlRef = React.RefObject<
  Partial<{
    reset: (value: number) => void;
    increment: (step?: number) => void;
    decrement: (step?: number) => void;
  }>
>;

export type NumberInputProps = Omit<
  React.ComponentProps<'input'>,
  'onChange'
> & {
  dataType?: 'int' | 'float';
  nonNegative?: boolean;
  control?: NumberInputControlRef;
  onChange?: (
    value: number | null,
    metadata: NumberInputChangeMetadata
  ) => void;
};

const CHAR_REGEX = /[^\d\.]/g;
const MAYBE_NEGATIVE_CHAR_REGEX = /[^-\d\.]/g;

const PRECEDING_ZEROS_REGEX = /^(0+)([^0]+(?:\.\d+)?)$/;

const INT_REGEX = /^\d+$/;
const MAYBE_NEGATIVE_INT_REGEX = /^-$|^-?\d+$/;

const FLOAT_REGEX = /^\d+(?:\.\d*)?$|^\.\d*$/;
const MAYBE_NEGATIVE_FLOAT_REGEX = /^-$|^-?\d+(?:\.\d*)?$|^-?\.\d*$/;

export function NumberInput({
  ref,
  dataType = 'float',
  nonNegative = false,
  control,
  onBlur,
  onChange,
  className,
  ...props
}: NumberInputProps) {
  const [value, setValue] = useState<string>('');

  const onBlurEvent = useEvent(onBlur);
  const onChangeEvent = useEvent(onChange);

  const onValueChangeEvent = useEvent(
    (rawValue: string, dataType: 'int' | 'float') => {
      const isEmpty = rawValue === '';
      const value =
        rawValue === ''
          ? null
          : dataType === 'int'
          ? parseInt(rawValue)
          : parseFloat(rawValue);

      setValue(rawValue);

      onChangeEvent(value, {
        rawValue,
        isEmpty,
        isNaN: !isEmpty && (value == null || isNaN(value)),
      });
    }
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      let rawValue = input.value;

      if (nonNegative) rawValue = rawValue.replace(CHAR_REGEX, '');
      else rawValue = rawValue.replace(MAYBE_NEGATIVE_CHAR_REGEX, '');

      if (rawValue === '') {
        onValueChangeEvent(rawValue, dataType);
        return;
      }

      switch (dataType) {
        case 'int':
          if (
            (nonNegative && INT_REGEX.test(rawValue)) ||
            (!nonNegative && MAYBE_NEGATIVE_INT_REGEX.test(rawValue))
          ) {
            onValueChangeEvent(rawValue, dataType);
          }

          break;

        case 'float': {
          if (
            (nonNegative && FLOAT_REGEX.test(rawValue)) ||
            (!nonNegative && MAYBE_NEGATIVE_FLOAT_REGEX.test(rawValue))
          ) {
            onValueChangeEvent(rawValue, dataType);
          }

          break;
        }
      }
    },
    [dataType, nonNegative, onValueChangeEvent]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      let value = e.currentTarget.value;

      value = value.replace(PRECEDING_ZEROS_REGEX, (_, _zeros, num) => num);
      if (value.startsWith('.')) value = `0${value}`;
      onValueChangeEvent(value, dataType);

      onBlurEvent(e);
    },
    [dataType, onBlurEvent, onValueChangeEvent]
  );

  const handleInitControlRef = useCallback(
    (node: HTMLInputElement) => {
      if (!node || !control) return;

      control.current = {
        reset: (value: number | string) => {
          onValueChangeEvent(toPlain(value), dataType);
        },
        increment: (step: number = 1) => {
          const newValue = Number(value) + step;
          onValueChangeEvent(toPlain(newValue), dataType);
        },
        decrement: (step: number = 1) => {
          const newValue = Number(value) - step;
          onValueChangeEvent(toPlain(newValue), dataType);
        },
      };
    },
    [control, value, dataType, onValueChangeEvent]
  );

  return (
    <Input
      ref={mergeRefs(handleInitControlRef, ref)}
      dir='ltr'
      type='text'
      value={value}
      inputMode={dataType === 'int' ? 'numeric' : 'decimal'}
      onBlur={handleBlur}
      onChange={handleChange}
      className={cn('ltr:text-left rtl:text-right', className)}
      {...props}
    />
  );
}
