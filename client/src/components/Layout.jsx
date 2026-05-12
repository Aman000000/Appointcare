import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Text,
  Group,
  UnstyledButton,
  Indicator,
  Avatar,
  Tooltip,
  Divider,
} from '@mantine/core';
import { IconBell, IconLogout, IconHeartbeat } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { userMenu, adminMenu, getDoctorMenu } from '../data/menuData';

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    notifications.show({
      title: 'Logged Out',
      message: 'You have been successfully logged out',
      color: 'violet',
    });
    navigate('/login');
  };

  const sidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? getDoctorMenu(user?._id)
    : userMenu;

  const notificationCount = user?.notification?.length || 0;

  return (
    <Box style={{ display: 'flex', minHeight: '100vh', background: '#0a0e27' }}>
      {/* Background Orbs */}
      <div className="bg-orbs" />

      {/* Sidebar */}
      <Box
        className="sidebar-nav"
        style={{
          width: 280,
          minHeight: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Logo */}
        <Box p="xl" pb="md">
          <Group gap="sm" align="center">
            <Box
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconHeartbeat size={22} color="#fff" />
            </Box>
            <div>
              <Text size="lg" fw={800} c="white" style={{ lineHeight: 1.2 }}>
                Appoint
                <Text component="span" c="violet">Care</Text>
              </Text>
              <Text size="xs" c="dimmed">Healthcare Portal</Text>
            </div>
          </Group>
        </Box>

        <Divider color="rgba(255,255,255,0.06)" mx="lg" />

        {/* Nav Links */}
        <Box style={{ flex: 1, paddingTop: 16 }}>
          {sidebarMenu.map((menu) => {
            const isActive = location.pathname === menu.path;
            const Icon = menu.icon;
            return (
              <Link
                key={menu.path}
                to={menu.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                <Icon size={20} />
                <Text size="sm">{menu.name}</Text>
              </Link>
            );
          })}
        </Box>

        {/* Logout */}
        <Box pb="xl">
          <Divider color="rgba(255,255,255,0.06)" mx="lg" mb="md" />
          <UnstyledButton
            className="nav-link"
            onClick={handleLogout}
            style={{ width: '100%' }}
          >
            <IconLogout size={20} />
            <Text size="sm">Logout</Text>
          </UnstyledButton>
        </Box>
      </Box>

      {/* Main Content */}
      <Box style={{ marginLeft: 280, flex: 1, minHeight: '100vh' }}>
        {/* Header */}
        <Box
          className="glass-strong"
          style={{
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 32px',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <Group gap="lg">
            <Tooltip label="Notifications" withArrow>
              <UnstyledButton onClick={() => navigate('/notification')}>
                <Indicator
                  color="violet"
                  size={18}
                  label={notificationCount}
                  disabled={notificationCount === 0}
                  processing={notificationCount > 0}
                >
                  <IconBell size={24} style={{ color: '#94a3b8' }} />
                </Indicator>
              </UnstyledButton>
            </Tooltip>

            {user && (
              <UnstyledButton onClick={() => navigate(`/doctor/profile/${user._id}`)}>
                <Group gap="sm">
                  <Avatar
                    radius="xl"
                    size="md"
                    color="violet"
                    variant="gradient"
                    gradient={{ from: 'violet', to: 'cyan', deg: 135 }}
                  >
                    {user.name?.[0]?.toUpperCase()}
                  </Avatar>
                  <div>
                    <Text size="sm" fw={600} c="white" style={{ lineHeight: 1.2 }}>
                      {user.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {user.isAdmin ? 'Admin' : user.isDoctor ? 'Doctor' : 'Patient'}
                    </Text>
                  </div>
                </Group>
              </UnstyledButton>
            )}
          </Group>
        </Box>

        {/* Page Content */}
        <Box p="xl" style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
