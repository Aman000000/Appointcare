import React from 'react';
import Layout from '../components/Layout';
import {
  TextInput,
  NumberInput,
  Button,
  Text,
  Box,
  SimpleGrid,
  Group,
  Divider,
} from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import {
  IconUser,
  IconMail,
  IconPhone,
  IconWorld,
  IconMapPin,
  IconStethoscope,
  IconBriefcase,
  IconCurrencyDollar,
  IconClock,
} from '@tabler/icons-react';
import axios from 'axios';

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      website: '',
      address: '',
      specialization: '',
      experience: '',
      feesPerCunsaltation: '',
      timingStart: '',
      timingEnd: '',
    },
    validate: {
      firstName: (v) => (v ? null : 'First name is required'),
      lastName: (v) => (v ? null : 'Last name is required'),
      phone: (v) => (v ? null : 'Phone is required'),
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Invalid email'),
      address: (v) => (v ? null : 'Address is required'),
      specialization: (v) => (v ? null : 'Specialization is required'),
      experience: (v) => (v ? null : 'Experience is required'),
      feesPerCunsaltation: (v) => (v ? null : 'Fee is required'),
      timingStart: (v) => (v ? null : 'Start time is required'),
      timingEnd: (v) => (v ? null : 'End time is required'),
    },
  });

  const handleSubmit = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/user/apply-doctor',
        {
          ...values,
          userId: user._id,
          timings: [values.timingStart, values.timingEnd],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        notifications.show({
          title: 'Application Submitted! 🎉',
          message: res.data.message,
          color: 'green',
        });
        navigate('/');
      } else {
        notifications.show({ title: 'Error', message: res.data.message, color: 'red' });
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      notifications.show({ title: 'Error', message: 'Something went wrong', color: 'red' });
    }
  };

  const inputStyles = {
    input: {
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      color: '#fff',
    },
    label: { color: '#94a3b8', fontWeight: 500 },
  };

  return (
    <Layout>
      <Box className="fade-in">
        <Group gap="sm" mb="xs">
          <IconStethoscope size={28} style={{ color: '#8b5cf6' }} />
          <Text size="xl" fw={800} c="white">
            Apply as Doctor
          </Text>
        </Group>
        <Text size="sm" c="dimmed" mb="xl">
          Fill in your details to apply for a doctor account
        </Text>

        <Box
          className="glass"
          style={{ borderRadius: 20, padding: 32 }}
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            {/* Personal Details */}
            <Text fw={700} c="white" size="lg" mb="md">
              Personal Details
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
              <TextInput
                label="First Name"
                placeholder="John"
                leftSection={<IconUser size={16} />}
                styles={inputStyles}
                {...form.getInputProps('firstName')}
              />
              <TextInput
                label="Last Name"
                placeholder="Doe"
                leftSection={<IconUser size={16} />}
                styles={inputStyles}
                {...form.getInputProps('lastName')}
              />
              <TextInput
                label="Phone"
                placeholder="+91 XXXXX XXXXX"
                leftSection={<IconPhone size={16} />}
                styles={inputStyles}
                {...form.getInputProps('phone')}
              />
              <TextInput
                label="Email"
                placeholder="doctor@example.com"
                leftSection={<IconMail size={16} />}
                styles={inputStyles}
                {...form.getInputProps('email')}
              />
              <TextInput
                label="Website"
                placeholder="https://..."
                leftSection={<IconWorld size={16} />}
                styles={inputStyles}
                {...form.getInputProps('website')}
              />
              <TextInput
                label="Address"
                placeholder="Clinic address"
                leftSection={<IconMapPin size={16} />}
                styles={inputStyles}
                {...form.getInputProps('address')}
              />
            </SimpleGrid>

            <Divider color="rgba(255,255,255,0.06)" mb="xl" />

            {/* Professional Details */}
            <Text fw={700} c="white" size="lg" mb="md">
              Professional Details
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
              <TextInput
                label="Specialization"
                placeholder="Cardiology, Dermatology..."
                leftSection={<IconStethoscope size={16} />}
                styles={inputStyles}
                {...form.getInputProps('specialization')}
              />
              <TextInput
                label="Experience"
                placeholder="5 years"
                leftSection={<IconBriefcase size={16} />}
                styles={inputStyles}
                {...form.getInputProps('experience')}
              />
              <NumberInput
                label="Fee per Consultation (₹)"
                placeholder="500"
                leftSection={<IconCurrencyDollar size={16} />}
                min={0}
                styles={inputStyles}
                {...form.getInputProps('feesPerCunsaltation')}
              />
              <TimeInput
                label="Start Time"
                leftSection={<IconClock size={16} />}
                styles={inputStyles}
                {...form.getInputProps('timingStart')}
              />
              <TimeInput
                label="End Time"
                leftSection={<IconClock size={16} />}
                styles={inputStyles}
                {...form.getInputProps('timingEnd')}
              />
            </SimpleGrid>

            <Group justify="flex-end">
              <Button
                type="submit"
                size="lg"
                variant="gradient"
                gradient={{ from: 'violet', to: 'cyan', deg: 135 }}
                style={{ boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)' }}
              >
                Submit Application
              </Button>
            </Group>
          </form>
        </Box>
      </Box>
    </Layout>
  );
};

export default ApplyDoctor;
