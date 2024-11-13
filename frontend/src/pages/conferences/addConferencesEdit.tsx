import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import { TextField, Grid, Box, Button, Typography } from '@mui/material';
import { IConferences } from '../../shared/dtos/IConferences';
import { createConferences, getOneConferences, deleteConferences, updateConferences } from '../../api/conferences';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddressFields from '../../shared/components/form-components/AddressFields';
import { useSnackbar } from '../../shared/hooks/SnackbarProvider';


export const ConferencesAddEdit: React.FC = () => {
  const { id } = useParams();
  const { showMessage } = useSnackbar()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<IConferences>({
    defaultValues: {
      name: '',
      state: '',
      email: '',
      city: '',
      tel: '',
      address: '',
      address_number: '',
      neighborhood: '',
      zip_code: '',
      
      country: 'Brasil',
    },
  });


  useEffect(() => {
    const fetchData = async () => {
     
      try {
        const response = await getOneConferences(Number(id));
        if (response?.data) {
          reset(response.data);
        }
      } catch (err) {
       
      } finally {
        
      }
    };

    if (id) {
      fetchData();
    } 

  }, [id, reset]);

  const handleDelete = async (id: number) => {
    try {
      await deleteConferences(id)

      showMessage("Conferência deletada com sucesso!!", { severity: 'success' });

      navigate('/conferencesPage')
    } catch (error: any) {
      showMessage("Erro ao Deletar a Conferencia", { severity: 'error' });
    }


  }

  const onSubmit: SubmitHandler<IConferences> = async (data: IConferences) => {
    try {
      if (!id) {
        await createConferences(data);
        showMessage('Conferência salva com sucesso!', {severity:"success"});
      } else {
        await updateConferences(data)
        showMessage('Conferência atualizada com sucesso!', {severity:"success"});
      }
      navigate('/conferencesPage')
    } catch (err) {
      console.error('Erro ao salvar a conferência!', err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3, padding: 3 }}
      style={{ marginTop: '10vh' }}
    >
      <Typography variant="h6" gutterBottom>
        Cadastro Conferencia
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
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="E-mail"
                fullWidth
                error={!!errors.email}
                helperText={errors.email ? 'Campo obrigatório' : ''}
              />
            )}
            rules={{ required: true }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Controller
            name="tel"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="Telefone"
                fullWidth
                error={!!errors.tel}
                helperText={errors.tel ? 'Campo obrigatório' : ''}
              />
            )}
            rules={{ required: true }}
          />
        </Grid>

        <AddressFields control={control} errors={errors} setValue={setValue} />

      </Grid>

      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
        <Button type="button" onClick={() => { navigate("/conferencesPage") }} variant="contained" color="warning" sx={{ marginLeft: "10px" }}>
          Cancelar
        </Button>
        <Button type="button" variant="contained" color="error" onClick={() => { handleDelete(Number(id)) }} sx={{ marginLeft: "10px" }}>
          Excluir
        </Button>
      </Box>
    </Box>
  );
};
