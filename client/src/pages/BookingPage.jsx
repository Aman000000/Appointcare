import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import {
  Box,
  Text,
  Group,
  Stack,
  Button,
  Badge,
  Divider,
} from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import {
  IconCalendar,
  IconClock,
  IconStethoscope,
  IconCurrencyDollar,
  IconUser,
} from '@tabler/icons-react';
import dayjs from 'dayjs';

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const dispatch = useDispatch();

  const getDoctorData = async () => {
    try {
      const res = await axios.post(
        '/api/v1/doctor/getDoctorById',
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      if (!date || !time) {
        return notifications.show({
          title: 'Missing Fields',
          message: 'Please select both date and time',
          color: 'orange',
        });
      }
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/user/book-appointment',
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          date: dayjs(date).format('DD-MM-YYYY'),
          userInfo: user,
          time: time,
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
          title: 'Appointment Booked! 🎉',
          message: res.data.message,
          color: 'green',
        });
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      notifications.show({
        title: 'Error',
        message: 'Could not book appointment',
        color: 'red',
      });
    }
  };

  const handleAvailability = async () => {
    if (!date || !time) {
      return notifications.show({
        title: 'Missing Fields',
        message: 'Please select both date and time',
        color: 'orange',
      });
    }
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/user/booking-availbility',
        {
          doctorId: params.doctorId,
          date: dayjs(date).format('DD-MM-YYYY'),
          time: time,
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
          title: 'Available ✅',
          message: res.data.message,
          color: 'green',
        });
      } else {
        notifications.show({
          title: 'Not Available',
          message: res.data.message,
          color: 'red',
        });
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorData();
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
          <IconCalendar size={28} style={{ color: '#8b5cf6' }} />
          <Text size="xl" fw={800} c="white">
            Book Appointment
          </Text>
        </Group>
        <Text size="sm" c="dimmed" mb="xl">
          Select a date and time to schedule your visit
        </Text>

        {doctor && doctor.timings && (
          <Box style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {/* Doctor Info Card */}
            <Box
              className="glass pulse-glow"
              style={{
                borderRadius: 20,
                padding: 32,
                flex: '1 1 340px',
                maxWidth: 420,
              }}
            >
              <Group mb="lg">
                <Box
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#fff',
                  }}
                >
                  {doctor.firstName?.[0]}
                  {doctor.lastName?.[0]}
                </Box>
                <div>
                  <Text size="xl" fw={700} c="white">
                    Dr. {doctor.firstName} {doctor.lastName}
                  </Text>
                  <Badge variant="light" color="violet" size="sm">
                    {doctor.specialization}
                  </Badge>
                </div>
              </Group>

              <Divider color="rgba(255,255,255,0.06)" mb="md" />

              <Stack gap="sm">
                <Group gap="xs">
                  <IconCurrencyDollar size={18} style={{ color: '#94a3b8' }} />
                  <Text size="sm" c="dimmed">
                    Fee:{' '}
                    <Text component="span" c="white" fw={600}>
                      ₹{doctor.feesPerCunsaltation}
                    </Text>
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconClock size={18} style={{ color: '#94a3b8' }} />
                  <Text size="sm" c="dimmed">
                    Available:{' '}
                    <Text component="span" c="white" fw={600}>
                      {doctor.timings[0]} - {doctor.timings[1]}
                    </Text>
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconUser size={18} style={{ color: '#94a3b8' }} />
                  <Text size="sm" c="dimmed">
                    Experience:{' '}
                    <Text component="span" c="white" fw={600}>
                      {doctor.experience}
                    </Text>
                  </Text>
                </Group>
              </Stack>
            </Box>

            {/* Booking Form */}
            <Box
              className="glass"
              style={{
                borderRadius: 20,
                padding: 32,
                flex: '1 1 340px',
                maxWidth: 420,
              }}
            >
              <Text fw={700} c="white" size="lg" mb="lg">
                Select Date & Time
              </Text>

              <Stack gap="md">
                <DatePickerInput
                  label="Appointment Date"
                  placeholder="Pick a date"
                  leftSection={<IconCalendar size={16} />}
                  value={date}
                  onChange={setDate}
                  minDate={new Date()}
                  size="md"
                  styles={inputStyles}
                />

                <TimeInput
                  label="Appointment Time"
                  leftSection={<IconClock size={16} />}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  size="md"
                  styles={inputStyles}
                />

                <Button
                  fullWidth
                  size="md"
                  variant="outline"
                  color="violet"
                  onClick={handleAvailability}
                  mt="sm"
                >
                  Check Availability
                </Button>

                <Button
                  fullWidth
                  size="lg"
                  variant="gradient"
                  gradient={{ from: 'violet', to: 'cyan', deg: 135 }}
                  onClick={handleBooking}
                  style={{ boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)' }}
                >
                  Book Now
                </Button>
              </Stack>
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default BookingPage;
