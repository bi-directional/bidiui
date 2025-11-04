import { useRef } from 'react';

import { Button } from './components/button';
import { ToggleButton } from './components/toggle-button';
import { InputGroup, InputGroupAddon } from './components/input-group';

import { NumberInput, type NumberInputControlRef } from './components/number-input';

import { Plus, Minus } from 'lucide-react';
import ToggleButtonGroup from './components/toggle-button-group';

export default function App() {
  const control: NumberInputControlRef = useRef({});

  return (
    <div dir='rtl'>
      <ToggleButtonGroup defaultSelection={['1', '2']}>
        <ToggleButton value='1' selectedClassName='bg-blue-200'>
          1
        </ToggleButton>
        <ToggleButton value='2' selectedClassName='bg-blue-200'>
          2
        </ToggleButton>
      </ToggleButtonGroup>

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
