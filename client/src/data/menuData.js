import {
  IconHome,
  IconCalendarEvent,
  IconUserPlus,
  IconUser,
  IconStethoscope,
  IconUsers,
  IconList,
} from '@tabler/icons-react';

export const userMenu = [
  {
    name: 'Home',
    path: '/',
    icon: IconHome,
  },
  {
    name: 'Appointments',
    path: '/appointments',
    icon: IconCalendarEvent,
  },
  {
    name: 'Apply Doctor',
    path: '/apply-doctor',
    icon: IconUserPlus,
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: IconUser,
  },
];

export const adminMenu = [
  {
    name: 'Home',
    path: '/',
    icon: IconHome,
  },
  {
    name: 'Doctors',
    path: '/admin/doctors',
    icon: IconStethoscope,
  },
  {
    name: 'Users',
    path: '/admin/users',
    icon: IconUsers,
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: IconUser,
  },
];

export const getDoctorMenu = (userId) => [
  {
    name: 'Home',
    path: '/',
    icon: IconHome,
  },
  {
    name: 'Appointments',
    path: '/doctor-appointments',
    icon: IconList,
  },
  {
    name: 'Profile',
    path: `/doctor/profile/${userId}`,
    icon: IconUser,
  },
];
