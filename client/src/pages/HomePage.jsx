import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import DoctorCard from '../components/DoctorCard';
import { SimpleGrid, Text, TextInput, Box, Group } from '@mantine/core';
import { IconSearch, IconStethoscope } from '@tabler/icons-react';

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');

  const getUserData = async () => {
    try {
      const res = await axios.get('/api/v1/user/getAllDoctors', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const filteredDoctors = doctors.filter(
    (d) =>
      d.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      d.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      {/* Page Header */}
      <Box mb="xl" className="fade-in">
        <Group gap="sm" mb="xs">
          <IconStethoscope size={28} style={{ color: '#8b5cf6' }} />
          <Text size="xl" fw={800} c="white">
            Available Doctors
          </Text>
        </Group>
        <Text size="sm" c="dimmed" mb="lg">
          Browse our network of qualified healthcare professionals
        </Text>

        <TextInput
          id="search-doctors"
          placeholder="Search by name or specialization..."
          leftSection={<IconSearch size={18} />}
          size="md"
          radius="xl"
          style={{ maxWidth: 400 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          styles={{
            input: {
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
            },
          }}
        />
      </Box>

      {/* Doctor Cards */}
      {filteredDoctors.length > 0 ? (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </SimpleGrid>
      ) : (
        <Box
          className="glass"
          style={{
            borderRadius: 16,
            padding: 48,
            textAlign: 'center',
          }}
        >
          <IconStethoscope size={48} style={{ color: '#4b5563', marginBottom: 16 }} />
          <Text size="lg" fw={600} c="dimmed">
            No doctors available yet
          </Text>
          <Text size="sm" c="dimmed" mt={4}>
            Check back later or apply to become a doctor
          </Text>
        </Box>
      )}
    </Layout>
  );
};

export default HomePage;
