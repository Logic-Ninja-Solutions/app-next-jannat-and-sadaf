'use client';

import { ActionIcon, AppShell, Box, Burger, Flex, Group, em, rem } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconSearch, IconShoppingBag, IconUser } from '@tabler/icons-react';
import { Logo } from '@components/core/Logo';
import { ThemeSwitch } from '@components/core/ThemeSwitch';
import Link from 'next/link';
import classes from './Layout.module.scss';

const actionIcons = [
  {
    icon: IconUser,
    label: 'profile',
    link: '/login',
  },
  {
    icon: IconSearch,
    label: 'search',
  },
  {
    icon: IconShoppingBag,
    label: 'cart',
  },
];

function AllIcons() {
  return (
    <Flex align="center" justify="flex-end">
      {actionIcons.map(({ icon: Icon, label, link }) => (
        <ActionIcon
          component={Link}
          href={link ?? '#'}
          key={label}
          size="xl"
          className={classes.actionIcon}
          variant="transparent"
          aria-label={label}
        >
          <Icon style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      ))}
    </Flex>
  );
}

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <AppShell header={{ height: 90 }}>
      <AppShell.Header className={classes.header}>
        <Group h={90} justify="space-between" align="center">
          {isMobile ? (
            <Burger pl="xl" opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          ) : (
            <Box p="xl">
              <ThemeSwitch />
            </Box>
          )}
          <Logo />
          <AllIcons />
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Box h={`calc(100vh - ${rem(90)})`}>{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}
