import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import {
  Box,
  Text,
  SimpleGrid,
  TextInput,
  NumberInput,
  Button,
  Group,
  Divider,
} from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
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

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

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
  });

  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        '/api/v1/doctor/getDoctorInfo',
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success && res.data.data) {
        const d = res.data.data;
        setDoctor(d);
        form.setValues({
          firstName: d.firstName || '',
          lastName: d.lastName || '',
          phone: d.phone || '',
          email: d.email || '',
          website: d.website || '',
          address: d.address || '',
          specialization: d.specialization || '',
          experience: d.experience || '',
          feesPerCunsaltation: d.feesPerCunsaltation || '',
          timingStart: d.timings?.[0] || '',
          timingEnd: d.timings?.[1] || '',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/doctor/updateProfile',
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
          title: 'Profile Updated! ✅',
          message: res.data.message,
          color: 'green',
        });
        navigate('/');
      } else {
        notifications.show({ title: 'Error', message: 'Update failed', color: 'red' });
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      notifications.show({ title: 'Error', message: 'Something went wrong', color: 'red' });
    }
  };

  useEffect(() => {
    getDoctorInfo();
    // eslint-disable-next-line
  }, []);

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
          <IconUser size={28} style={{ color: '#8b5cf6' }} />
          <Text size="xl" fw={800} c="white">
            Manage Profile
          </Text>
        </Group>
        <Text size="sm" c="dimmed" mb="xl">
          Update your professional information
        </Text>

        {doctor ? (
          <Box className="glass" style={{ borderRadius: 20, padding: 32 }}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Text fw={700} c="white" size="lg" mb="md">
                Personal Details
              </Text>
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
                <TextInput
                  label="First Name"
                  leftSection={<IconUser size={16} />}
                  styles={inputStyles}
                  {...form.getInputProps('firstName')}
                />
                <TextInput
                  label="Last Name"
                  leftSection={<IconUser size={16} />}
                  styles={inputStyles}
                  {...form.getInputProps('lastName')}
                />
                <TextInput
                  label="Phone"
                  leftSection={<IconPhone size={16} />}
                  styles={inputStyles}
                  {...form.getInputProps('phone')}
                />
                <TextInput
                  label="Email"
                  leftSection={<IconMail size={16} />}
                  styles={inputStyles}
                  {...form.getInputProps('email')}
                />
                <TextInput
                  label="Website"
                  leftSection={<IconWorld size={16} />}
                  styles={inputStyles}
                  {...form.getInputProps('website')}
                />
                <TextInput
                  label="Address"
                  leftSection={<IconMapPin size={16} />}
                  styles={inputStyles}
                  {...form.getInputProps('address')}
                />
              </SimpleGrid>

              <Divider color="rgba(255,255,255,0.06)" mb="xl" />

              <Text fw={700} c="white" size="lg" mb="md">
                Professional Details
              </Text>
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
                <TextInput
                  label="Specialization"
                  leftSection={<IconStethoscope size={16} />}
                  styles={inputStyles}
                  {...form.getInputProps('specialization')}
                />
                <TextInput
                  label="Experience"
                  leftSection={<IconBriefcase size={16} />}
                  styles={inputStyles}
                  {...form.getInputProps('experience')}
                />
                <NumberInput
                  label="Fee per Consultation (₹)"
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
                  Update Profile
                </Button>
              </Group>
            </form>
          </Box>
        ) : (
          <Box className="glass" style={{ borderRadius: 16, padding: 48, textAlign: 'center' }}>
            <IconStethoscope size={48} style={{ color: '#4b5563', marginBottom: 16 }} />
            <Text c="dimmed" size="lg" fw={500}>
              No doctor profile found
            </Text>
            <Text c="dimmed" size="sm" mt={4}>
              Apply as a doctor to create your profile
            </Text>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Profile;
