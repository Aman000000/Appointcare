import { createTheme } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'violet',
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: '700',
  },
  defaultRadius: 'md',
  colors: {
    dark: [
      '#C9C9CF',
      '#AFAFB6',
      '#96969D',
      '#7D7D84',
      '#64646B',
      '#4B4B52',
      '#323239',
      '#1A1B25',
      '#131738',
      '#0a0e27',
    ],
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'xl',
      },
      styles: () => ({
        root: {
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(139, 92, 246, 0.35)',
          },
        },
      }),
    },
    Card: {
      styles: () => ({
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      }),
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    PasswordInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    NumberInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    Select: {
      defaultProps: {
        radius: 'md',
      },
    },
  },
});

export default theme;
