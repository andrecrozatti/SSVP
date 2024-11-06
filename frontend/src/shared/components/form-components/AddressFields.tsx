import React, { useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import { Controller, Control, FieldErrors, useWatch, UseFormSetValue } from 'react-hook-form';
import axios from 'axios';

type AddressFieldsProps = {
  control: Control<any>;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
};

const AddressFields: React.FC<AddressFieldsProps> = ({ control, errors, setValue }) => {
  const zipCode = useWatch({
    control,
    name: 'zip_code', // Observe o campo de CEP
  });

  useEffect(() => {
    const fetchAddressFromZipCode = async (cep: string) => {
      if (cep.length === 8) { // Validação simples para CEPs com 8 dígitos
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          const data = response.data;

          if (!data.erro) {
            // Preencher os campos com os dados retornados
            setValue('address', data.logradouro);
            setValue('neighborhood', data.bairro);
            setValue('city', data.localidade);
            setValue('state', data.uf);
            document.getElementById('address_number')?.focus();

          } else {
            console.error('CEP inválido');
          }
        } catch (error) {

        }
      }
    };

    if (zipCode) {
      fetchAddressFromZipCode(zipCode);
    }
  }, [zipCode]);

  return (


    <>
      <Grid item xs={12} sm={3}>
        <Controller
          name="zip_code"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              label="CEP"
              fullWidth
              error={!!errors.zip_code}
              helperText={errors.zip_code ? 'Campo obrigatório' : ''}
            />
          )}
          rules={{ required: true }}
        />
      </Grid>
      <Grid item xs={10} sm={6}>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              label="Endereço"
              fullWidth
              error={!!errors.address}
              helperText={errors.address ? 'Campo obrigatório' : ''}
            />
          )}
          rules={{ required: true }}
        />
      </Grid>

      <Grid item xs={2} sm={1}>
        <Controller
          name="address_number"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              id='address_number'
              label="Número"
              fullWidth
              error={!!errors.address_number}
              helperText={errors.address_number ? 'Campo obrigatório' : ''}
            />
          )}
          rules={{ required: true }}
        />
      </Grid>

      <Grid item xs={6} sm={2}>
        <Controller
          name="neighborhood"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              label="Bairro"
              fullWidth
              error={!!errors.neighborhood}
              helperText={errors.neighborhood ? 'Campo obrigatório' : ''}
            />
          )}
          rules={{ required: true }}
        />
      </Grid>

      <Grid item xs={6} sm={3}>
        <Controller
          name="address_complement"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              label="Complemento"
              fullWidth
              error={!!errors.address_complement}
              helperText={errors.address_complement ? 'Campo obrigatório' : ''}
            />
          )}
        />
      </Grid>

      <Grid item xs={6} sm={3}>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              label="Cidade"
              fullWidth
              error={!!errors.city}
              helperText={errors.city ? 'Campo obrigatório' : ''}
            />
          )}
        />
      </Grid>

      <Grid item xs={3} sm={3}>
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              label="UF"
              fullWidth
              error={!!errors.state}
              helperText={errors.state ? 'Campo obrigatório' : ''}
            />
          )}
        />
      </Grid>

      <Grid item xs={3} sm={3}>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              label="País"

              fullWidth
              error={!!errors.country}
              helperText={errors.country ? 'Campo obrigatório' : ''}
            />
          )}
          rules={{ required: true }}
        />
      </Grid>
    </>
  );
};

export default AddressFields;
