import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { Box, Text, Table, Group, Badge, Button } from '@mantine/core';
import { IconStethoscope } from '@tabler/icons-react';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllDoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        '/api/v1/admin/changeAccountStatus',
        { doctorId: record._id, userId: record.userId, status: status },
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
        getDoctors();
      }
    } catch (error) {
      notifications.show({ title: 'Error', message: 'Something went wrong', color: 'red' });
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <Layout>
      <Box className="fade-in">
        <Group gap="sm" mb="xs">
          <IconStethoscope size={28} style={{ color: '#8b5cf6' }} />
          <Text size="xl" fw={800} c="white">
            All Doctors
          </Text>
        </Group>
        <Text size="sm" c="dimmed" mb="xl">
          Review and manage doctor applications
        </Text>

        <Box className="glass" style={{ borderRadius: 16, overflow: 'hidden' }}>
          {doctors.length > 0 ? (
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
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Phone</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {doctors.map((d) => (
                  <Table.Tr key={d._id}>
                    <Table.Td>
                      <Text fw={500}>
                        Dr. {d.firstName} {d.lastName}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={
                          d.status === 'approved'
                            ? 'green'
                            : d.status === 'rejected'
                            ? 'red'
                            : 'yellow'
                        }
                        variant="light"
                      >
                        {d.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{d.phone}</Table.Td>
                    <Table.Td>
                      {d.status === 'pending' ? (
                        <Group gap="xs">
                          <Button
                            size="xs"
                            variant="light"
                            color="green"
                            onClick={() => handleAccountStatus(d, 'approved')}
                          >
                            Approve
                          </Button>
                          <Button
                            size="xs"
                            variant="light"
                            color="red"
                            onClick={() => handleAccountStatus(d, 'rejected')}
                          >
                            Reject
                          </Button>
                        </Group>
                      ) : (
                        <Button
                          size="xs"
                          variant="light"
                          color="red"
                          onClick={() => handleAccountStatus(d, 'rejected')}
                        >
                          Reject
                        </Button>
                      )}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          ) : (
            <Box p="xl" style={{ textAlign: 'center' }}>
              <Text c="dimmed">No doctor applications yet</Text>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Doctors;
