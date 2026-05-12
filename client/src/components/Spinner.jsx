import React from 'react';
import { LoadingOverlay, Box } from '@mantine/core';

const Spinner = () => {
  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        background: 'rgba(10, 14, 39, 0.85)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <LoadingOverlay
        visible
        zIndex={10000}
        overlayProps={{ backgroundOpacity: 0 }}
        loaderProps={{ color: 'violet', type: 'bars', size: 'xl' }}
      />
    </Box>
  );
};

export default Spinner;
