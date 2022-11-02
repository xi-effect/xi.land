/* eslint-disable react/display-name */
import React, { forwardRef, useCallback } from 'react';
import { useSnackbar, SnackbarContent } from 'notistack';
import { Stack, Button, Card, Typography } from '@mui/material';
import { useLocalStorage } from 'react-use';

const CustomCookieShackbar = forwardRef<HTMLDivElement, { id?: string | number }>((props, ref) => {
  const { closeSnackbar } = useSnackbar();

  // eslint-disable-next-line no-unused-vars
  const [valueLS, setValueLS] = useLocalStorage('cookies-agree');

  const handleDismiss = useCallback(() => {
    closeSnackbar(props.id);
    setValueLS(true);
  }, [closeSnackbar, props.id, setValueLS]);

  return (
    <SnackbarContent ref={ref}>
      <Card
        sx={{
          borderRadius: '12px',
          boxShadow: 'none',
          height: '56px',
          bgcolor: 'grayscale.0',
        }}
      >
        <Stack
          sx={{
            p: '4px',
          }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '22px',
              ml: '12px',
            }}
          >
            Мы используем
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '22px',
              ml: '4px',
              color: 'primary.dark',
            }}
          >
            cookies
          </Typography>
          <Button
            sx={{
              height: '48px',
              width: 88,
              borderRadius: '8px',
              color: 'grayscale.100',
              bgcolor: 'grayscale.10',
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '22px',
              boxShadow: 'none',
              textTransform: 'none',
              ml: '8px',
              '&:hover': {
                boxShadow: 'none',
                color: 'grayscale.0',
              },
            }}
            variant="contained"
            onClick={handleDismiss}
          >
            Ок
          </Button>
        </Stack>
      </Card>
    </SnackbarContent>
  );
});

export default CustomCookieShackbar;
