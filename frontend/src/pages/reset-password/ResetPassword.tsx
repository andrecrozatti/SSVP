import React, { useCallback, useState } from 'react';

import {
  Avatar,
  Button,
  CssBaseline,
  FormControlLabel,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Checkbox,
  createTheme,
  ThemeProvider,
  LinearProgress,
} from '@mui/material';

import { FaUser } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from '../../shared/components/hook-form/input-text';
import { resetPassword } from '../../api/api';
import { useSnackbar } from '../../shared/hooks/SnackbarProvider';

interface IData {
  password: string;
  password_confirmation: string;
}

const resetPasswordValidationSchema = zod.object({
  password_confirmation: zod
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  password: zod.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

type ResetPasswordFormType = zod.infer<typeof resetPasswordValidationSchema>;

const defaultTheme = createTheme();

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { token = '' } = useParams<'token'>();
  const { showMessage } = useSnackbar();

  if (!token) {
    navigate('/');
  }
  const methods = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordValidationSchema),
    defaultValues: {
      password_confirmation: '',
      password: '',
    },
  });

  const { handleSubmit, control } = methods;

  const [loading, setLoading] = useState(false);

  const handleSubmitResetPassword = useCallback(
    async (data: IData) => {
      try {
        setLoading(true);

        await resetPassword({ token, password: data.password });

        showMessage("Senha atualizada com sucesso!", { severity: 'success' });
        navigate('/');
      } catch (err: any) {

        showMessage("Erro ao atualizar a senha!", { severity: 'error' });
      } finally {
        setLoading(false);
      }
    },
    [navigate, token]
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <FaUser />
          </Avatar>
          <Typography component="h1" variant="h5">
            Altere sua senha
          </Typography>
          <form onSubmit={handleSubmit(handleSubmitResetPassword)}>
            <InputText
              margin="normal"
              required
              fullWidth
              name="password"
              label="Digite sua nova senha"
              control={control}
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <InputText
              margin="normal"
              required
              fullWidth
              name="password_confirmation"
              label="Confirme sua nova senha"
              control={control}
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembre-me"
            />
            {loading && <LinearProgress />}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enviar reset
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {'Login '}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
