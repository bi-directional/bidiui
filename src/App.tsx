import { useRef } from 'react';

import { Button } from './components/button';
import { InputGroup, InputGroupAddon } from './components/input-group';

import { NumberInput, type NumberInputControlRef } from './components/number-input';

import { Plus, Minus } from 'lucide-react';

export default function App() {
  const control: NumberInputControlRef = useRef({});

  return (
    <div dir='rtl'>
      <InputGroup className='ltr:flex-row-reverse ltr:justify-end'>
        <InputGroupAddon block>Number Input Example</InputGroupAddon>
        <InputGroupAddon>
          <Button onClick={() => control.current.increment?.()}>
            <Plus />
          </Button>
        </InputGroupAddon>
        <NumberInput
          id='num'
          nonNegative
          dataType='float'
          defaultValue={0}
          control={control}
          onChange={console.log}
        />
        <InputGroupAddon>
          <Button onClick={() => control.current.decrement?.()}>
            <Minus />
          </Button>
        </InputGroupAddon>
        <InputGroupAddon block>
          <Button onClick={() => control.current.reset?.('')}>reset</Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
