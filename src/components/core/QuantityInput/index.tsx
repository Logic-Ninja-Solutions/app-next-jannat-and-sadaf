import { Flex, ActionIcon, NumberInput, NumberInputHandlers } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useRef } from 'react';
import classes from './styles.module.scss';

export default function QuantityInput() {
  const handlersRef = useRef<NumberInputHandlers>(null);

  return (
    <Flex className={classes.container} w="fit-content" align="center" gap="lg">
      <ActionIcon
        color="var(--mantine-outline-color)"
        pl="xs"
        variant="transparent"
        onClick={() => handlersRef.current?.decrement()}
      >
        <IconMinus size={20} />
      </ActionIcon>

      <NumberInput
        disabled
        unstyled
        hideControls
        handlersRef={handlersRef}
        step={1}
        min={1}
        defaultValue={1}
        max={10}
        classNames={classes}
      />
      <ActionIcon
        color="var(--mantine-outline-color)"
        pr="xs"
        variant="transparent"
        onClick={() => handlersRef.current?.increment()}
      >
        <IconPlus size={20} />
      </ActionIcon>
    </Flex>
  );
}
