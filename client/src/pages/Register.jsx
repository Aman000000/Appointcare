import React from 'react';
import { TextInput, PasswordInput, Button, Text, Box, Stack, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { Link, useNavigate } from 'react-router-dom';
import { IconMail, IconLock, IconUser, IconHeartbeat } from '@tabler/icons-react';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate: {
      name: (v) => (v.length < 2 ? 'Name must have at least 2 characters' : null),
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Invalid email'),
      password: (v) => (v.length < 6 ? 'Password must be at least 6 characters' : null),
    },
  });

  const handleSubmit = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/register', values);
      dispatch(hideLoading());
      if (res.data.success) {
        notifications.show({
          title: 'Account Created! 🎉',
          message: 'Registered successfully. Please login.',
          color: 'green',
        });
        navigate('/login');
      } else {
        notifications.show({
          title: 'Error',
          message: res.data.message,
          color: 'red',
        });
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      notifications.show({
        title: 'Error',
        message: 'Something went wrong',
        color: 'red',
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="bg-orbs" />
      <div className="auth-card fade-in">
        {/* Logo */}
        <Box mb="xl" style={{ textAlign: 'center' }}>
          <Box
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 12px 40px rgba(139, 92, 246, 0.3)',
            }}
          >
            <IconHeartbeat size={32} color="#fff" />
          </Box>
          <Text size="xl" fw={800} c="white">
            Create Account
          </Text>
          <Text size="sm" c="dimmed" mt={4}>
            Join AppointCare today
          </Text>
        </Box>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              id="register-name"
              label="Full Name"
              placeholder="John Doe"
              leftSection={<IconUser size={18} />}
              size="md"
              styles={{
                input: {
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                },
                label: { color: '#94a3b8', fontWeight: 500 },
              }}
              {...form.getInputProps('name')}
            />

            <TextInput
              id="register-email"
              label="Email Address"
              placeholder="you@example.com"
              leftSection={<IconMail size={18} />}
              size="md"
              styles={{
                input: {
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                },
                label: { color: '#94a3b8', fontWeight: 500 },
              }}
              {...form.getInputProps('email')}
            />

            <PasswordInput
              id="register-password"
              label="Password"
              placeholder="Min. 6 characters"
              leftSection={<IconLock size={18} />}
              size="md"
              styles={{
                input: {
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                },
                label: { color: '#94a3b8', fontWeight: 500 },
                innerInput: { color: '#fff' },
              }}
              {...form.getInputProps('password')}
            />

            <Button
              id="register-submit"
              type="submit"
              fullWidth
              size="lg"
              mt="md"
              variant="gradient"
              gradient={{ from: 'violet', to: 'cyan', deg: 135 }}
              style={{
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
              }}
            >
              Create Account
            </Button>

            <Text size="sm" c="dimmed" ta="center" mt="sm">
              Already have an account?{' '}
              <Anchor component={Link} to="/login" c="violet" fw={600}>
                Login here
              </Anchor>
            </Text>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default Register;
