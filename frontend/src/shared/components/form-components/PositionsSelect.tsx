import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { IPosition } from '../../dtos/IPosition';



// Definindo a interface das props do componente
interface PositionsSelectProps {
  control: Control<any>; // O controle vindo do useForm
  name: string;          // Nome do campo
  positions: IPosition[]; // A lista de assistidos que será exibida no select
  error?: boolean;       // Se existe erro no campo
  errorMessage?: string;
  hasMandate?: Function; // Caso o cargo tenha mandato ou não
}

const PositionsSelect: React.FC<PositionsSelectProps> = ({ control, name, positions, error, errorMessage, hasMandate }) => {


  console.log(hasMandate)
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth variant="outlined" error={error}>
          <InputLabel>Cargos</InputLabel>
          <Select
            {...field}
            value={field.value || ""}  // Garantindo que o valor inicial seja uma string vazia se não houver valor
            label="Cargos"
          
          >
            {positions.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.positionName}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errorMessage}</FormHelperText>
        </FormControl>
      )}
      rules={{ required: true }} // Validação: obrigatório
    />
  );
};

export default PositionsSelect;
