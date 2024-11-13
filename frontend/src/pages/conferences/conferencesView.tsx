import React, { useState, useEffect } from 'react';
import {
  TextField,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  InputAdornment,
  Paper,
  Button,
  
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';


interface Cadastro {
  id: number;
  name: string;
  email: string;
  tel: string;
  // city: string;
  // cep: string;
  // state: string;
  // username: string;
}

export const ListConferences: React.FC<{ cadastros: Cadastro[] }> = ({
  cadastros,
}) => {
  const [filteredCadastros, setFilteredCadastros] =
    useState<Cadastro[]>(cadastros);
  const [searchNome, setSearchNome] = useState('');

  const navigate = useNavigate();

  const handleListItemClick = (id: number) => {
    navigate(`/conferences/${id}`);
  };

  useEffect(() => {
    const filterCadastros = () => {
      let filtered = cadastros;

      if (searchNome) {
        filtered = filtered.filter(cadastro =>
          cadastro.name.toLowerCase().includes(searchNome.toLowerCase())
        );
      }
      setFilteredCadastros(filtered);
    };
    filterCadastros();
  }, [searchNome, cadastros]);

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} sm={12} >
          <Button type="button" onClick={() => { navigate("/conferences") }} variant="contained" color="primary">
            Nova Conferência
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Pesquisar por Conferência"
            fullWidth
            value={searchNome}
            onChange={e => setSearchNome(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'primary.main',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.dark',
                },
              },
            }}
          />
        </Grid>
      </Grid>

      <List sx={{ padding: 0 }}>
        {filteredCadastros.length === 0 ? (
          <Typography>Nenhum cadastro encontrado.</Typography>
        ) : (
          filteredCadastros.map((cadastro, index) => (
            <Paper
              key={index}
              sx={{
                marginBottom: 2,
                padding: 2,
                border: '1px solid',
                borderColor: 'primary.light',
                backgroundColor: 'primary.lighter',
              }}
            >
              <ListItem
                sx={{ flexDirection: 'column', alignItems: 'flex-start' }}
                onClick={() => handleListItemClick(cadastro.id)}
              >
                <ListItemText
                  primary={
                    <Typography>
                      <Typography variant="h6" color="primary.main">
                        Conferêcia: {cadastro.name}
                      </Typography>

                    </Typography>

                  }
                  secondary={

                    <Grid container spacing={2}>

                      <Grid item >
                        <Typography variant="subtitle1" color="primary.dark" fontWeight="regular">
                          Email: {cadastro.email}
                        </Typography>
                      </Grid>
                      <Grid item >
                        <Typography variant="subtitle1" color="secondary.main">
                          Fone: {cadastro.tel}
                        </Typography>
                      </Grid>

                    </Grid>
                  }
                />
              </ListItem>
            </Paper>
          ))
        )}
      </List>
    </Box>
  );
};
