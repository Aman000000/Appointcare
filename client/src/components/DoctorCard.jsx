import React from 'react';
import { Text, Group, Stack, Badge } from '@mantine/core';
import { IconStethoscope, IconClock, IconCurrencyDollar, IconBriefcase } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div
      className="doctor-card fade-in"
      onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      style={{ animationDelay: '0.1s' }}
    >
      <Group justify="space-between" mb="md">
        <div>
          <Text size="xl" fw={700} c="white">
            Dr. {doctor.firstName} {doctor.lastName}
          </Text>
          <Badge
            variant="light"
            color="violet"
            size="sm"
            mt={4}
            leftSection={<IconStethoscope size={12} />}
          >
            {doctor.specialization}
          </Badge>
        </div>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#fff',
          }}
        >
          {doctor.firstName?.[0]}
          {doctor.lastName?.[0]}
        </div>
      </Group>

      <Stack gap="xs" mt="md">
        <Group gap="xs">
          <IconBriefcase size={16} style={{ color: '#94a3b8' }} />
          <Text size="sm" c="dimmed">
            Experience: <Text component="span" c="white" fw={500}>{doctor.experience}</Text>
          </Text>
        </Group>
        <Group gap="xs">
          <IconCurrencyDollar size={16} style={{ color: '#94a3b8' }} />
          <Text size="sm" c="dimmed">
            Fee: <Text component="span" c="white" fw={500}>₹{doctor.feesPerCunsaltation}</Text>
          </Text>
        </Group>
        <Group gap="xs">
          <IconClock size={16} style={{ color: '#94a3b8' }} />
          <Text size="sm" c="dimmed">
            Timings:{' '}
            <Text component="span" c="white" fw={500}>
              {doctor.timings?.[0]} - {doctor.timings?.[1]}
            </Text>
          </Text>
        </Group>
      </Stack>

      <Text
        size="xs"
        mt="lg"
        c="violet"
        fw={600}
        style={{
          textTransform: 'uppercase',
          letterSpacing: '1px',
          opacity: 0.8,
        }}
      >
        Click to book appointment →
      </Text>
    </div>
  );
};

export default DoctorCard;
