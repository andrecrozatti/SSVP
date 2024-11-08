import React, { useEffect, useState } from 'react';
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from 'react-hook-form';

import InputMask from 'react-input-mask';
import {
  TextField,
  Grid,
  Box,
  Button,
  Typography,
  MenuItem,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { IAssisteds } from '../../shared/dtos/IAssisteds';
import {
  createAssisteds,
  getOneAssisteds,
  deleteAssisteds,
  updateAssisteds,
} from '../../api/assisteds';
import { getAllConferences } from '../../api/conferences';
import { useNavigate, useParams } from 'react-router-dom';
import AddressFields from '../../shared/components/form-components/AddressFields';
import ConferencesSelect from '../../shared/components/form-components/ConferencesSelect';
import { useSnackbar } from '../../shared/hooks/SnackbarProvider';

export const AssistidsAddEdit: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [conferences, setConferences] = useState([]);

  const { showMessage } = useSnackbar();
  const navigate = useNavigate();


  // useForm para gerenciar o formulário
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue
  } = useForm<IAssisteds>({
    defaultValues: {
      name: '',
      address: "",
      neighborhood: "",
      city: "",
      state: "",
      country: "",
      address_complement: ""
    },
  });

  const family_income: number = Number(watch("family_income"))
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dependents',
  });

  useEffect(() => {
    const loadConferences = async () => {
      setConferences(await getAllConferences());
    };
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getOneAssisteds(Number(id));
        if (response?.data) {
          reset(response.data);
        }
      } catch (err) {
        setError('Erro ao carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    loadConferences();

    if (id) {
      fetchData();
    } else {
      setLoading(false); // Se não há id, é um novo registro, não precisa carregar dados
    }
  }, [id, reset]);

  const handleDelete = (id: number) => {
    try {
      deleteAssisteds(id);
      showMessage("Assistido deletado com sucesso!!", { severity: 'success' });

      navigate('/assisteds-page');
    } catch (error: any) {
      showMessage("Erro ao Deletar o Assitido", { severity: 'error' });

    }
  };

  function CalcRenda() {
    const valorPerCapita = (family_income / (fields.length + 1))
    let classeSocial = "Estável", color = "darkgreen"
    if (valorPerCapita <= 667) {
      classeSocial = " Pobreza"
      color = "darkred"
    }

    if (valorPerCapita <= 218) {
      classeSocial = " Pobreza Extrema"
      color = "red"
    }
    return (

      <>
        <Box>
          {valorPerCapita.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          <span style={{ color: color }}> - {classeSocial}</span>
        </Box>
      </>
    )
  }

  const onSubmit: SubmitHandler<IAssisteds> = async data => {
    try {
      if (!id) {
        await createAssisteds(data);
        showMessage('Assistido salvo com sucesso!', { severity: 'success' });
      } else {
        await updateAssisteds(data);
        showMessage('Assistido atualizado com sucesso!', { severity: 'success' });
      }
      navigate('/assisteds-page');
    } catch (err) {
      console.error('Erro ao salvar o assistido', err);
    }
  };

  // Se o loading estiver ativo, mostra um indicador de progresso
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  // Se houver um erro, exibe a mensagem de erro
  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 5, padding: 3 }}
    >
      <Typography variant="h6" gutterBottom>
        Cadastro de Assistido
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={8} sm={6}>
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

        <Grid item xs={4} sm={6}>
          <Controller
            name="cpf"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputMask
                mask="999.999.999-99"
                value={field.value}
                onChange={field.onChange}
              >
                <TextField
                  label="CPF"
                  variant="outlined"
                  fullWidth
                  error={!!errors.cpf}
                  helperText={errors.cpf ? errors.cpf.message : ''}
                />
              </InputMask>
            )}
          />
        </Grid>

        <Grid item xs={3} sm={6}>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="Idade"
                fullWidth
                error={!!errors.age}
                helperText={errors.age ? 'Campo obrigatório' : ''}
              />
            )}
            rules={{ required: true }}
          />
        </Grid>

        <Grid item xs={9} sm={6}>
          <Controller
            name="profession"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="Profissão"
                fullWidth
                error={!!errors.profession}
                helperText={errors.profession ? 'Campo obrigatório' : ''}
              />
            )}
            rules={{ required: true }}
          />
        </Grid>

        <AddressFields control={control} errors={errors} setValue={setValue} />

        <Grid item xs={6} sm={3}>
          <ConferencesSelect
            control={control}
            name="conference_id"
            conferences={conferences}
            error={!!errors.conference_id} // Passa se há erro
            errorMessage={errors.conference_id ? 'Campo obrigatório' : ''} // Mensagem de erro
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <Controller
            name="maritalStatus"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.maritalStatus}
              >
                <InputLabel>Estado Civil</InputLabel>
                <Select
                  {...field}
                  value={field.value || ''} // Assegura que o valor inicial seja uma string vazia caso não haja valor
                  label="Estado Civil"
                >
                  <MenuItem value="solteiro">Solteiro(a)</MenuItem>
                  <MenuItem value="casado">Casado(a)</MenuItem>
                  <MenuItem value="separado">Separado(a)</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.maritalStatus ? 'Campo obrigatório' : ''}
                </FormHelperText>
              </FormControl>
            )}
            rules={{ required: true }}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.status}
              >
                <InputLabel>Status</InputLabel>
                <Select
                  {...field}
                  value={field.value || ''} // Assegura que o valor inicial seja uma string vazia caso não haja valor
                  label="Status"
                >
                  <MenuItem value="confirmado">Confirmado</MenuItem>
                  <MenuItem value="negado">Negado</MenuItem>
                  <MenuItem value="aguardando sindicancia">Aguardando Sindicância</MenuItem>
                  <MenuItem value="emergencial">Emergencial</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.status ? 'Campo obrigatório' : ''}
                </FormHelperText>
              </FormControl>
            )}
            rules={{ required: true }}
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <Controller
            name="home"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.home}>
                <InputLabel>Casa</InputLabel>
                <Select
                  {...field}
                  value={field.value || ''}
                  variant="outlined"
                  label="Casa"
                >
                  <MenuItem value="propria">Própria</MenuItem>
                  <MenuItem value="alugada">Alugada</MenuItem>
                  <MenuItem value="gratuita">Gratuita</MenuItem>
                  <MenuItem value="parentes">Parentes/Outros</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.home ? 'Campo obrigatório' : ''}
                </FormHelperText>
              </FormControl>
            )}
            rules={{ required: true }}
          />
        </Grid>

        <Grid item xs={6} sm={4}>
          <Controller
            name="family_income"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="Renda Familiar"
                type='number'
                inputProps={{ step: 0.1 }}
                fullWidth
                error={!!errors.family_income}
                helperText={errors.family_income ? 'Campo obrigatório' : ''}
                InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}

              />
            )}
            rules={{ required: true }}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <Typography>
            Renda Per Capita
          </Typography>
          {CalcRenda()}
        </Grid>

        <Grid item xs={12} sm={12}>
          {fields.map((item, index) => (
            <Grid container spacing={2} mt={1} key={item.id}>
              <Grid item xs={12} sm={3} sx={{ display: 'none' }}>
                <Controller
                  name={`dependents.${index}.id`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      error={!!errors.dependents?.[index]?.id}
                      helperText={
                        errors.dependents?.[index]?.id
                          ? 'Campo obrigatório'
                          : ''
                      }
                    />
                  )}
                //rules={{ required: true }}
                />
              </Grid>
              <Grid item xs={3} sm={3}>
                <Controller
                  name={`dependents.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      label={`Dependente ${index + 1} - Nome`}
                      fullWidth
                      error={!!errors.dependents?.[index]?.name}
                      helperText={
                        errors.dependents?.[index]?.name
                          ? 'Campo obrigatório'
                          : ''
                      }
                    />
                  )}
                  rules={{ required: true }}
                />
              </Grid>
              <Grid item xs={3} sm={3}>
                <Controller
                  name={`dependents.${index}.birth_date`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Data de nacimento"
                      name="birth_date"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                //rules={{ required: true }}
                />
              </Grid>
              <Grid item xs={3} sm={3}>
                <Controller
                  name={`dependents.${index}.CPF`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="CPF"
                      name="CPF"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                //rules={{ required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={2}>
                <Controller
                  name={`dependents.${index}.relationship`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      label="Parentesco"
                      fullWidth
                      error={!!errors.dependents?.[index]?.relationship}
                      helperText={
                        errors.dependents?.[index]?.relationship
                          ? 'Campo obrigatório'
                          : ''
                      }
                    />
                  )}
                //rules={{ required: true }}
                />
              </Grid>
              <Grid item xs={1} sm={1} alignSelf={"center"}>
                <IconButton type='button' size='small' color='error' onClick={() => { remove(index) }}>X</IconButton>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12} mt={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                append({
                  name: '',
                  birth_date: null,
                  relationship: '',
                  assisted_id: Number(id),
                  CPF: ""
                })
              }
            >
              Adicionar Dependente
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="explain"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="Explique sua Situação"
                fullWidth
                multiline
                rows={4}
                error={!!errors.explain}
                helperText={errors.explain ? 'Campo obrigatório' : ''}
              />
            )}
            rules={{ required: true }}
          />
        </Grid>
      </Grid>

      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
        <Button
          type="button"
          onClick={() => {
            navigate('/assisteds-page');
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
      </Box>
    </Box>
  );
};
