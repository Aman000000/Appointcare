import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { Box, Text, Table, Group, Badge, Button } from '@mantine/core';
import { IconList } from '@tabler/icons-react';
import dayjs from 'dayjs';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get('/api/v1/doctor/doctor-appointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        '/api/v1/doctor/update-status',
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        notifications.show({
          title: 'Updated!',
          message: res.data.message,
          color: 'green',
        });
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      notifications.show({ title: 'Error', message: 'Something went wrong', color: 'red' });
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <Layout>
      <Box className="fade-in">
        <Group gap="sm" mb="xs">
          <IconList size={28} style={{ color: '#8b5cf6' }} />
          <Text size="xl" fw={800} c="white">
            Patient Appointments
          </Text>
        </Group>
        <Text size="sm" c="dimmed" mb="xl">
          Review and manage appointment requests
        </Text>

        <Box className="glass" style={{ borderRadius: 16, overflow: 'hidden' }}>
          {appointments.length > 0 ? (
            <Table
              striped
              highlightOnHover
              styles={{
                thead: { background: 'rgba(139, 92, 246, 0.1)' },
                th: { color: '#c4b5fd', fontWeight: 600, padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
                td: { color: '#e2e8f0', padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' },
              }}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>Date & Time</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {appointments.map((a) => (
                  <Table.Tr key={a._id}>
                    <Table.Td>
                      <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }}>
                        {a._id?.slice(-8)}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      {dayjs(a.date).format('DD-MM-YYYY')} &nbsp; {a.time}
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={
                          a.status?.toLowerCase() === 'approved'
                            ? 'green'
                            : a.status?.toLowerCase() === 'rejected'
                            ? 'red'
                            : 'yellow'
                        }
                        variant="light"
                      >
                        {a.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      {a.status === 'pending' && (
                        <Group gap="xs">
                          <Button
                            size="xs"
                            variant="light"
                            color="green"
                            onClick={() => handleStatus(a, 'Approved')}
                          >
                            Approve
                          </Button>
                          <Button
                            size="xs"
                            variant="light"
                            color="red"
                            onClick={() => handleStatus(a, 'Rejected')}
                          >
                            Reject
                          </Button>
                        </Group>
                      )}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          ) : (
            <Box p="xl" style={{ textAlign: 'center' }}>
              <IconList size={48} style={{ color: '#4b5563', marginBottom: 12 }} />
              <Text c="dimmed">No appointment requests yet</Text>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default DoctorAppointments;
