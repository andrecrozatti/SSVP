import { useForm, Controller, SubmitHandler, useFieldArray } from 'react-hook-form';

import { TextField, Grid, Box, Button, Typography, Select, FormControl, InputLabel, MenuItem, FormHelperText, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, useTheme } from '@mui/material';
import { IMovements } from '../../shared/dtos/IMovements';
import { createMovements, getOneMovements, deleteMovements, updateMovements } from '../../api/movements';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getAllAssisteds } from "../,,/../../api/assisteds";
import { getAllConferences } from "../,,/../../api/conferences";
import { IAssisteds } from '../../shared/dtos/IAssisteds';
import ConferencesSelect from '../../shared/components/form-components/ConferencesSelect';
import { DateToInput } from '../../shared/utils/formatDate';
import UsersSelect from '../../shared/components/form-components/UsersSelect';
import { getAllUsers } from '../../api/api';
import { useSnackbar } from '../../shared/hooks/SnackbarProvider';




export const MovementsAddEdit: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showMessage } = useSnackbar()

  const navigate = useNavigate()

  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IMovements>({
    defaultValues: {
      user_id: 1,
      movement_date: DateToInput(new Date()),
      movement_items: []
    },
  });

  if (loading) {

  }
  if (error) {

  }


  const [assisteds, setAssisteds] = useState([])
  const [conferences, setConferences] = useState([])
  const [productDonate, setProductDonate] = useState('')
  const [quantityDonate, setQuantityDonate] = useState('')
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const GetAssisteds = async () => {
      setAssisteds(await getAllAssisteds())
    };
    const GetConferences = async () => {
      setConferences(await getAllConferences())
    };
    const GetUsers= async () => {
      setUsers(await getAllUsers())
    };

    GetUsers()
    GetAssisteds()
    GetConferences()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getOneMovements(Number(id));

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




  const handleDelete = (id: number) => {
    try {
      deleteMovements(id)
      showMessage("Movimentação deletada com sucesso!!", { severity:'success' })
      
      navigate('/movementsView')
    } catch (error: any) {
      showMessage("Erro ao Deletar a movimentação", { severity:'error' })
     
    }


  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'movement_items',
  });

  const onSubmit: SubmitHandler<IMovements> = async (data: IMovements) => {
    try {
      if (!id) {
        await createMovements(data);
        showMessage('Movimentação salva com sucesso!', { severity:'success' });
      } else {
        await updateMovements(data)
        showMessage('Movimentação atualizada com sucesso!', { severity:'success' });
      }
      navigate('/movementsView')
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
        Cadastro Movimentações
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={2}>

          <Controller
            name="movement_date"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                label="Data"
                type="datetime-local"
                error={!!errors.movement_date}
                helperText={errors.movement_date ? 'Verifique este campo' : ''}
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
                  {
                    assisteds.map((item: IAssisteds, index) => {
                      return (
                        <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                      )
                    })
                  }
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
          <Grid container spacing={2} >
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                  <TextField
                    fullWidth
                    variant='standard'
                    label="Produto Doado"
                    value={productDonate}
                    onChange={(e) => { setProductDonate(e.target.value) }}
                  />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    fullWidth
                    variant='standard'
                    label="Quantidade"
                    value={quantityDonate}
                    onChange={(e) => { setQuantityDonate(e.target.value) }}
                  />
                </Grid>
                <Grid item xs={2} sm={3} mt={1} >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (productDonate && quantityDonate) {
                        append({
                          name: productDonate,
                          quantity: Number(quantityDonate),
                          // O campo `id` é omitido aqui, pois será tratado no backend
                          movement_id: Number(id),  // Certifique-se de que o movimento tem um ID, se não for uma nova criação
                        });
                        setProductDonate('');  // Limpa os campos após adicionar o item
                        setQuantityDonate('');
                      } else {
                        showMessage("Preencha todos os campos antes de adicionar um item.", { severity: 'warning' });
                      }
                    }}
                  >
                    Adicionar
                  </Button>
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={1}>
                <Grid item xs={12} sm={12}>
                  <TableContainer component={Paper} >
                    <Table aria-label="simple table" size="small" >
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{
                            backgroundColor: theme.palette.primary.main, // Usando a cor primária do tema
                            color: theme.palette.primary.contrastText,  // Texto em contraste com a cor primária
                          }} align="center">Nome da Doação</TableCell>
                          <TableCell sx={{
                            backgroundColor: theme.palette.primary.main, // Usando a cor primária do tema
                            color: theme.palette.primary.contrastText,  // Texto em contraste com a cor primária
                          }} align="center">Quantidade</TableCell>
                          <TableCell sx={{
                            backgroundColor: theme.palette.primary.main, // Usando a cor primária do tema
                            color: theme.palette.primary.contrastText,  // Texto em contraste com a cor primária
                          }} align="center"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {fields.map((item, index) => (
                          <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {item.name}
                            </TableCell>
                            <TableCell component="th" align='center' scope="row">
                              {item.quantity}
                            </TableCell>
                            <TableCell component="th" align='center' scope="row">
                              <Button type='button' variant="contained" color="error" onClick={() => { remove(index) }} >X</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Grid>
          </Grid>


        </Grid>


      </Grid>


      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
        <Button type="button" onClick={() => { navigate("/movementsView") }} variant="contained" color="warning" sx={{ marginLeft: "10px" }}>
          Cancelar
        </Button>
        <Button type="button" variant="contained" color="error" onClick={() => { handleDelete(Number(id)) }} sx={{ marginLeft: "10px" }}>
          Excluir
        </Button>
      </Box>
    </Box>
  );
};
