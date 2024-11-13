import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllPositions } from '../../api/positions';

import {
  TextField,
  Grid,
  Button,
  Typography,
} from '@mui/material';

import {
  users,
  getOneuser,
  updateUsers,
  deleteUsers,
} from '../../api/api';

import { IUser } from '../../shared/dtos/IUser';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import PositionsSelect from '../../shared/components/form-components/PositionsSelect';
import { IPosition } from '../../shared/dtos/IPosition';

import ConferencesSelect from '../../shared/components/form-components/ConferencesSelect';
import { getAllConferences } from '../../api/conferences';
import { useSnackbar } from '../../shared/hooks/SnackbarProvider';

export const Users: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showMessage } = useSnackbar();

  const [error, setError] = useState<string | null>(null);
  const [hasMandate, setHasMandate] = useState<boolean>(false);
  const [positions, setPositions] = useState<IPosition[]>([])

  const [conferences, setConferences] = useState([])
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<IUser>({
    defaultValues: {
      name: '',
      email: '',
      whatsapp: '',
      password: '',
      username: '',
      position_id: null,
    },
  });

  useEffect(() => {

    const GetConferences = async () => {
      setConferences(await getAllConferences())
    };

    GetConferences()
  }, [])

  useEffect(() => {

    const GetPositions = async () => {
      setPositions(await getAllPositions())
    };

    const fetchData = async () => {


      try {
        const response = await getOneuser(Number(id));
        if (response?.data) {

          response.data.mandateDate = response.data.mandateDate?.split("T")[0]
          reset(response.data);
        }
      } catch (err: any) {
        setError(err.message);
        showMessage('Erro ao carregar os dados.'+ err, {severity: "error"});
      } finally {

      }
    };

    GetPositions()
    if (id) {
      fetchData();
    } else {
      // Se não há id, é um novo registro, não precisa carregar dados
    }
  }, [id, reset]);

  const handleDelete = (id: number) => {
    try {
      deleteUsers(id);
      showMessage('Usúario deletado com sucesso!', { severity: 'success' });

      navigate('/usersView');
    } catch (error: any) {
      showMessage('Erro ao Deletar o Usúario'  + error, { severity: 'error' });
    }
  };
  const onSubmit: SubmitHandler<IUser> = async (data: IUser) => {
    try {
      if (!id) {
        await users(data);
        showMessage('Usúario salvo com sucesso!', {severity:'success' });
      } else {
        await updateUsers(data);
        showMessage('Usúario atualizado com sucesso!', {severity:'success' });
      }
      navigate('/usersView');
    } catch (err) {
      console.error('Erro ao salvar o usúario !', err);
    }
  };

  const positionValue = watch("position_id");


  // Opcional: executa algo baseado no valor observado
  useEffect(() => {
    if (positionValue) {

      setHasMandate(positions.find(x => x.id == positionValue)?.hasMandate || false)
    }
  }, [positionValue]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3, padding: 3 }}
      style={{ marginTop: '10vh' }}
    >
      <Typography variant="h6" gutterBottom>
        Cadastro Usúario {error}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="Nome"
                fullWidth
                error={!!errors.name}
                helperText={errors.name ? 'Campo obrigatório' : ''}
              />
            )}
            rules={{ required: true }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="Tipo do Usúario"
                fullWidth
                error={!!errors.username}
                helperText={errors.username ? 'Campo obrigatório' : ''}
              />
            )}
            rules={{ required: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Controller
            name="whatsapp"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="Telefone"
                fullWidth
                error={!!errors.whatsapp}
                helperText={errors.whatsapp ? 'Campo obrigatório' : ''}
              />
            )}
            rules={{ required: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email ? 'Campo obrigatório' : ''}
              />
            )}
            rules={{ required: true }}
          />
        </Grid>


        <Grid item xs={12} sm={6}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="Senha"
                fullWidth
                error={!!errors.password}
                helperText={errors.password ? 'Campo obrigatório' : ''}
              />
            )}
            rules={{ required: true }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>

          <PositionsSelect
            control={control}
            name='position_id'
            positions={positions}
            error={!!errors.position_id}
            errorMessage={errors.position_id ? 'Campo obrigatório' : ''}
          />

        </Grid>

        {hasMandate && <Grid item xs={12} sm={4}>

          <Controller
            name="mandateDate"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                label="Data Final do Mandato"
                type="date"
                error={!!errors.mandateDate}
                helperText={errors.mandateDate ? 'Verifique este campo' : ''}
                InputLabelProps={{ shrink: true }}
              />
            )}

          />
        </Grid>}

        <Grid item xs={12} sm={4}>
          <ConferencesSelect
            control={control}
            name="conference_id"
            conferences={conferences}
            error={!!errors.conference_id} // Passa se há erro
            errorMessage={errors.conference_id ? 'Campo obrigatório' : ''} // Mensagem de erro
          />
        </Grid>

      </Grid>

      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
        <Button
          type="button"
          onClick={() => {
            navigate('/usersView');
          }}
          variant="contained"
          color="warning"
          sx={{ marginLeft: '10px' }}
        >
          Cancelar
        </Button>
        <Button
          type="button"
          variant="contained"
          color="error"
          onClick={() => {
            handleDelete(Number(id));
          }}
          sx={{ marginLeft: '10px' }}
        >
          Excluir
        </Button>
        <Button
          type="button"
          onClick={() => {
            navigate('/usersView');
          }}
          variant="contained"
          color="primary"
          sx={{ marginLeft: '10px' }}
        >
          Voltar
        </Button>
      </Box>
    </Box>
  );
};
