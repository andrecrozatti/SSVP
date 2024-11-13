import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';

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
  ThemeProvider,
  LinearProgress,
} from '@mui/material';

import { FaUser } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from '../../shared/components/hook-form/input-text';
import { useAuth } from '../../shared/hooks/auth';

import { useSnackbar } from '../../shared/hooks/SnackbarProvider';

const SignInFormValidationSchema = zod.object({
  email: zod.string().email('Digite um email válido'),
  password: zod.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

type SignInFormType = zod.infer<typeof SignInFormValidationSchema>;

const defaultTheme = createTheme();

export const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const methods = useForm<SignInFormType>({
    resolver: zodResolver(SignInFormValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });


  const { showMessage } = useSnackbar()
  const { handleSubmit, control } = methods;

  const handleSubmitLogin = useCallback(
    async (data: SignInFormType) => {
      try {
        setLoading(true);

        await signIn({
          email: data.email,
          password: data.password,
        });

        navigate('/home');
        showMessage("Login efetuado com sucesso!!", { severity: "success" })
      } catch (err: any) {
        showMessage("Erro ao logar", { severity: "error" })
      } finally {
        setLoading(false);
      }
    },
    [signIn]
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
            Login
          </Typography>
          <form onSubmit={handleSubmit(handleSubmitLogin)} noValidate>
            <InputText
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              control={control}
              type="email"
              id="email"
              autoComplete="current-email"
            />

            <InputText
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
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
              Entrar
            </Button>
            <Grid container>
              <Grid item xs={12}>
                <Link href="/sign-up" variant="body2">
                  {'Você não tem uma conta? Cadastrar '}
                </Link>

              </Grid>

              <Grid item xs={12}>
                <Link href="/forgot-password" variant="body2">
                  {'Esqueceu a senha?'}
                </Link>
              </Grid>

            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
