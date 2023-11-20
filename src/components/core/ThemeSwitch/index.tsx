import { Box, Switch, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import classes from './ThemeSwitch.module.scss';

export function ThemeSwitch() {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  const [domLoaded, setDomLoaded] = useState(false);
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded ? (
        <Switch
          size="md"
          color={isDark ? 'blue' : 'teal'}
          checked={isDark}
          onLabel={<IconSun size="1rem" stroke={2.5} className={classes.on} />}
          offLabel={<IconMoonStars size="1rem" stroke={2.5} className={classes.off} />}
          onClick={() => {
            toggleColorScheme();
          }}
        />
      ) : (
        <Box />
      )}
    </>
  );
}
