import { Button, Center, PasswordInput, Stack, Text, TextInput, Title, rem } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './Login.module.scss';

export default function Login() {
  return (
    <Center h="100%">
      <Stack w={450}>
        <Title ta="center" className={classes.title}>
          Login
        </Title>
        <Text className={classes.subtitle}>Enter your email and password to login:</Text>

        <TextInput
          leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
          placeholder="Your email"
        />
        <PasswordInput placeholder="Your password" />

        <Button fullWidth>Login</Button>

        <Text className={classes.signupText} ta="center">
          Don&apos;t have an account?
          <Text className={classes.signupLink} component={Link} href="signup">
            {' '}
            Sign up
          </Text>
        </Text>
      </Stack>
    </Center>
  );
}
