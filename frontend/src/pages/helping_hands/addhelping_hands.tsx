import { Box } from '@mui/material';

import React from 'react';

import { TextField, Grid, Typography } from '@mui/material';
import { IHelpingHands } from '../../shared/dtos/IHelpingHands';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';


import { createHelpingHands } from '../../api/helpingHands';

export const HelpingHandsAddEdit: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    //reset,
  } = useForm<IHelpingHands>({
    defaultValues: {
      name: '',
      cnpj: '',
      tell: '',
      address: '',
      address_number: '',
      neighborhood: '',
      zip_code: '',
      address_complement: '',
      city: '',
      state: '',
    },
  });

  const onSubmit: SubmitHandler<IHelpingHands> = async (
    data: IHelpingHands
  ) => {
    try {
      if (data) {
        await createHelpingHands(data);
        alert('Usúario salva com sucesso!');
      } else {
        await createHelpingHands(data);
        alert('Usúario atualizada com sucesso!');
      }
      // navigate('/usersView');
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
        Cadastro Amigo
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

        <Grid item xs={12} sm={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="CNPJ"
                fullWidth
                error={!!errors.name}
                helperText={errors.name ? 'Campo obrigatório' : ''}
              />
            )}
            rules={{ required: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="Telefone"
                fullWidth
                error={!!errors.name}
                helperText={errors.name ? 'Campo obrigatório' : ''}
              />
            )}
            rules={{ required: true }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
