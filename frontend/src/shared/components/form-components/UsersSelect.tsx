import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

import { IUser } from '../../dtos';
import { useAuth } from '../../hooks/auth';



// Definindo a interface das props do componente
interface UsersSelectProps {
  control: Control<any>; // O controle vindo do useForm
  name: string;          // Nome do campo
  users: IUser[]; // A lista de assistidos que será exibida no select
  error?: boolean;       // Se existe erro no campo
  errorMessage?: string;
}

const UsersSelect: React.FC<UsersSelectProps> = ({ control, name, users, error, errorMessage }) => {

  const { user } = useAuth();

  const defaultUser = user.id || "";

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultUser}
      disabled={defaultUser !== 1 ? true : false}
      rules={{ required: true }}  // Validação: obrigatório
      render={({ field }) => (
        <FormControl fullWidth variant="outlined" error={error}>
          <InputLabel>Usuários</InputLabel>
          <Select
            {...field}
            //value={field.value || ""}  // Garantindo que o valor inicial seja uma string vazia se não houver valor
            label="Usuários"

          >
            {users.map((item) => (
              <MenuItem key={item.id} value={Number(item.id)}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errorMessage}</FormHelperText>
        </FormControl>
      )}

    />
  );
};

export default UsersSelect;
