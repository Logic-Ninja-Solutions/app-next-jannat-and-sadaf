'use client';

import { ActionIcon, AppShell, Burger, Flex, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch, IconShoppingBag, IconUser } from '@tabler/icons-react';
import classes from './Layout.module.scss';
import { Logo } from '../../core/Logo';

const actionIcons = [
  {
    icon: IconUser,
    label: 'profile',
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
      {actionIcons.map(({ icon: Icon, label }) => (
        <ActionIcon
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

  return (
    <AppShell>
      <AppShell.Header>
        <Burger pl="xl" opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group justify="space-between">
          <Logo />
          <AllIcons />
        </Group>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
