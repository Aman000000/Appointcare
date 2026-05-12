import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { Box, Text, Table, Group, Badge } from '@mantine/core';
import { IconCalendarEvent } from '@tabler/icons-react';
import dayjs from 'dayjs';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get('/api/v1/user/user-appointments', {
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

  useEffect(() => {
    getAppointments();
  }, []);

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();
    if (s === 'approved') return <Badge color="green" variant="light">Approved</Badge>;
    if (s === 'rejected') return <Badge color="red" variant="light">Rejected</Badge>;
    return <Badge color="yellow" variant="light">Pending</Badge>;
  };

  return (
    <Layout>
      <Box className="fade-in">
        <Group gap="sm" mb="xs">
          <IconCalendarEvent size={28} style={{ color: '#8b5cf6' }} />
          <Text size="xl" fw={800} c="white">
            My Appointments
          </Text>
        </Group>
        <Text size="sm" c="dimmed" mb="xl">
          Track and manage your scheduled appointments
        </Text>

        <Box className="glass" style={{ borderRadius: 16, overflow: 'hidden' }}>
          {appointments.length > 0 ? (
            <Table
              striped
              highlightOnHover
              styles={{
                table: { borderCollapse: 'collapse' },
                thead: { background: 'rgba(139, 92, 246, 0.1)' },
                th: { color: '#c4b5fd', fontWeight: 600, padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
                td: { color: '#e2e8f0', padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' },
                tr: { transition: 'background 0.2s ease' },
              }}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Doctor</Table.Th>
                  <Table.Th>Phone</Table.Th>
                  <Table.Th>Date & Time</Table.Th>
                  <Table.Th>Status</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {appointments.map((a) => {
                  const info = typeof a.doctorInfo === 'string' ? JSON.parse(a.doctorInfo) : a.doctorInfo;
                  return (
                    <Table.Tr key={a._id}>
                      <Table.Td>
                        <Text fw={500}>
                          Dr. {info?.firstName} {info?.lastName}
                        </Text>
                      </Table.Td>
                      <Table.Td>{info?.phone || '-'}</Table.Td>
                      <Table.Td>
                        {dayjs(a.date).format('DD-MM-YYYY')} &nbsp; {a.time}
                      </Table.Td>
                      <Table.Td>{getStatusBadge(a.status)}</Table.Td>
                    </Table.Tr>
                  );
                })}
              </Table.Tbody>
            </Table>
          ) : (
            <Box p="xl" style={{ textAlign: 'center' }}>
              <IconCalendarEvent size={48} style={{ color: '#4b5563', marginBottom: 12 }} />
              <Text c="dimmed">No appointments found</Text>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Appointments;
