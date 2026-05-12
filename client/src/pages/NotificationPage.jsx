import React from 'react';
import Layout from '../components/Layout';
import { Box, Text, Tabs, UnstyledButton, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { updateUserNotifications } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { IconBell, IconBellCheck, IconTrash, IconCheck } from '@tabler/icons-react';
import axios from 'axios';

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/user/get-all-notification',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        notifications.show({
          title: 'Done!',
          message: res.data.message,
          color: 'green',
        });
        dispatch(updateUserNotifications(res.data.data));
      } else {
        notifications.show({ title: 'Error', message: res.data.message, color: 'red' });
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      notifications.show({ title: 'Error', message: 'Something went wrong', color: 'red' });
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/user/delete-all-notification',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        notifications.show({
          title: 'Cleared!',
          message: res.data.message,
          color: 'green',
        });
        dispatch(updateUserNotifications(res.data.data));
      } else {
        notifications.show({ title: 'Error', message: res.data.message, color: 'red' });
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      notifications.show({ title: 'Error', message: 'Something went wrong', color: 'red' });
    }
  };

  return (
    <Layout>
      <Box className="fade-in">
        <Group gap="sm" mb="xs">
          <IconBell size={28} style={{ color: '#8b5cf6' }} />
          <Text size="xl" fw={800} c="white">
            Notifications
          </Text>
        </Group>
        <Text size="sm" c="dimmed" mb="xl">
          Stay updated with your appointment activities
        </Text>

        <Box className="glass" style={{ borderRadius: 16, padding: 24 }}>
          <Tabs
            defaultValue="unread"
            color="violet"
            styles={{
              tab: {
                color: '#94a3b8',
                fontWeight: 600,
                '&[data-active]': { color: '#fff' },
              },
            }}
          >
            <Tabs.List mb="lg">
              <Tabs.Tab value="unread" leftSection={<IconBell size={16} />}>
                Unread ({user?.notification?.length || 0})
              </Tabs.Tab>
              <Tabs.Tab value="read" leftSection={<IconBellCheck size={16} />}>
                Read ({user?.seennotification?.length || 0})
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="unread">
              <Group justify="flex-end" mb="md">
                <UnstyledButton onClick={handleMarkAllRead}>
                  <Group gap={6}>
                    <IconCheck size={16} style={{ color: '#8b5cf6' }} />
                    <Text size="sm" c="violet" fw={600}>
                      Mark All Read
                    </Text>
                  </Group>
                </UnstyledButton>
              </Group>

              {user?.notification?.length > 0 ? (
                user.notification.map((n, i) => (
                  <div
                    key={i}
                    className="notification-card"
                    onClick={() => navigate('/doctor-appointments')}
                  >
                    <Text size="sm" c="white">
                      {n.message}
                    </Text>
                  </div>
                ))
              ) : (
                <Box py="xl" style={{ textAlign: 'center' }}>
                  <IconBellCheck size={40} style={{ color: '#4b5563', marginBottom: 8 }} />
                  <Text c="dimmed" size="sm">
                    All caught up! No new notifications.
                  </Text>
                </Box>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="read">
              <Group justify="flex-end" mb="md">
                <UnstyledButton onClick={handleDeleteAllRead}>
                  <Group gap={6}>
                    <IconTrash size={16} style={{ color: '#ef4444' }} />
                    <Text size="sm" c="red" fw={600}>
                      Delete All
                    </Text>
                  </Group>
                </UnstyledButton>
              </Group>

              {user?.seennotification?.length > 0 ? (
                user.seennotification.map((n, i) => (
                  <div
                    key={i}
                    className="notification-card"
                    onClick={() => navigate('/doctor-appointments')}
                  >
                    <Text size="sm" c="dimmed">
                      {n.message}
                    </Text>
                  </div>
                ))
              ) : (
                <Box py="xl" style={{ textAlign: 'center' }}>
                  <Text c="dimmed" size="sm">
                    No read notifications
                  </Text>
                </Box>
              )}
            </Tabs.Panel>
          </Tabs>
        </Box>
      </Box>
    </Layout>
  );
};

export default NotificationPage;
