import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { Box, Text, Table, Group, Badge, Button } from '@mantine/core';
import { IconUsers } from '@tabler/icons-react';

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Layout>
      <Box className="fade-in">
        <Group gap="sm" mb="xs">
          <IconUsers size={28} style={{ color: '#8b5cf6' }} />
          <Text size="xl" fw={800} c="white">
            All Users
          </Text>
        </Group>
        <Text size="sm" c="dimmed" mb="xl">
          Manage registered users on the platform
        </Text>

        <Box className="glass" style={{ borderRadius: 16, overflow: 'hidden' }}>
          {users.length > 0 ? (
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
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Doctor</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {users.map((u) => (
                  <Table.Tr key={u._id}>
                    <Table.Td>
                      <Text fw={500}>{u.name}</Text>
                    </Table.Td>
                    <Table.Td>{u.email}</Table.Td>
                    <Table.Td>
                      <Badge
                        color={u.isDoctor ? 'green' : 'gray'}
                        variant="light"
                      >
                        {u.isDoctor ? 'Yes' : 'No'}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Button size="xs" variant="light" color="red">
                        Block
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          ) : (
            <Box p="xl" style={{ textAlign: 'center' }}>
              <Text c="dimmed">No users found</Text>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Users;
