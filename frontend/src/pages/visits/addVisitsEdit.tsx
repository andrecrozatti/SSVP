import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import { TextField, Grid, Box, Button, Typography, Select, FormControl, InputLabel, MenuItem, FormHelperText } from '@mui/material';
import { IVisits } from '../../shared/dtos/IVisits';
import { createVisits, getOneVisits, deleteVisits, updateVisits } from '../../api/visits';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getAllAssisteds } from "../../api/assisteds";
import { getAllConferences } from "../../api/conferences";
import { IAssisteds } from '../../shared/dtos/IAssisteds';
import ConferencesSelect from '../../shared/components/form-components/ConferencesSelect';
import { DateToInput } from '../../shared/utils/formatDate';
import UsersSelect from '../../shared/components/form-components/UsersSelect';
import { getAllUsers } from '../../api/api';
import { useSnackbar } from '../../shared/hooks/SnackbarProvider';




export const VisitsAddEdit: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showMessage } = useSnackbar()

  const navigate = useNavigate()


  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IVisits>({
    defaultValues: {
      creation_date: DateToInput(new Date()),
      visit_description: '',
    },
  });

  if (loading) {

  }
  if (error) {

  }


  const [assisteds, setAssisteds] = useState<IAssisteds[]>([]);
  const [conferences, setConferences] = useState([])

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [assistedsData, conferencesData, usersData] = await Promise.all([
          getAllAssisteds(),
          getAllConferences(),
          getAllUsers()
        ]);

        setAssisteds(assistedsData);
        setConferences(conferencesData);
        setUsers(usersData);
      } catch (err) {
        console.error("Erro ao carregar dados iniciais", err);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getOneVisits(Number(id));

        if (response?.data) {

          reset(response.data);
        }
      } catch (err) {
        setError('Erro ao carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    } else {
      setLoading(false); // Se não há id, é um novo registro, não precisa carregar dados
    }
  }, [id, reset]);




  const handleDelete = useCallback(async (id: number) => {
    try {
      await deleteVisits(id);
      showMessage("Visita deletada com sucesso!!", { severity: 'success' });
      navigate('/visitsView');
    } catch (error: any) {
      showMessage("Erro ao Deletar a Visita", { severity: 'error' });
    }
  }, [navigate, showMessage]);

  const assistedsOptions = useMemo(() => assisteds.map((item) => (
    <MenuItem key={item.id} value={item.id}>
      {item.name}
    </MenuItem>
  )), [assisteds]);

  const onSubmit: SubmitHandler<IVisits> = useCallback(async (data: IVisits) => {
    try {
      if (!id) {
        await createVisits(data);
        showMessage('Movimentação salva com sucesso!', { severity: 'success' });
      } else {
        await updateVisits(data);
        showMessage('Movimentação atualizada com sucesso!', { severity: 'success' });
      }
      navigate('/visitsView');
    } catch (err) {
      console.error('Erro ao salvar a conferência!', err);
    }
  }, [id, navigate, showMessage]);


  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3, padding: 3 }}
      style={{ marginTop: '10vh' }}
    >
      <Typography variant="h6" gutterBottom>
        Cadastro Movimentações
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={2}>

          <Controller
            name="creation_date"
            control={control}
            disabled
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                label="Data"
                type="datetime-local"
                error={!!errors.creation_date}
                helperText={errors.creation_date ? 'Verifique este campo' : ''}
                InputLabelProps={{ shrink: true }}
              />
            )}

          />

        </Grid>
        <Grid item xs={3}>


          <Controller
            name="assisted_id"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth variant="outlined" error={!!errors.assisted_id}>
                <InputLabel>Assistidos</InputLabel>
                <Select
                  {...field}

                  value={field.value || ""}  // Assegura que o valor inicial seja uma string vazia caso não haja valor
                  label="Assistidos"
                >
                  {assistedsOptions}
                </Select>
                <FormHelperText>
                  {errors.assisted_id ? 'Campo obrigatório' : ''}
                </FormHelperText>
              </FormControl>
            )}
            rules={{ required: true }}
          />

        </Grid>

        <Grid item xs={3}>

          <UsersSelect
            control={control}
            name="user_id"
            users={users}
            error={!!errors.user_id} // Passa se há erro
            errorMessage={errors.user_id ? 'Campo obrigatório' : ''} // Mensagem de erro
          />

        </Grid>

        <Grid item xs={3}>
          <ConferencesSelect
            control={control}
            name="conference_id"
            conferences={conferences}
            error={!!errors.conference_id} // Passa se há erro
            errorMessage={errors.conference_id ? 'Verifique este campo' : ''} // Mensagem de erro
          />
        </Grid>


        <Grid item xs={12} sm={12}>
          <Controller
            name="visit_description"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                multiline
                rows={4}
                label="Descrição da Visita"
                error={!!errors.visit_description}
                helperText={errors.visit_description ? 'Verifique este campo' : ''}
              // InputLabelProps={{ shrink: true }}
              />
            )}

          />

        </Grid>


      </Grid>


      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
        <Button type="button" onClick={() => { navigate("/visitsView") }} variant="contained" color="warning" sx={{ marginLeft: "10px" }}>
          Cancelar
        </Button>
        <Button type="button" variant="contained" color="error" onClick={() => { handleDelete(Number(id)) }} sx={{ marginLeft: "10px" }}>
          Excluir
        </Button>
      </Box>
    </Box>
  );
};
