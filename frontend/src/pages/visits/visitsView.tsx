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
import { StringDateToShow } from '../../shared/utils/formatDate';


interface VisitsView {
  id: number;
  user_id: number;
  conference_id: number;
  assisted_id: number;
  visit_date: string;
  creation_date: string;
  user_name: string;
  conference_name: string;
  assisted_name: string;
  
}

export const ListVisits: React.FC<{ cadastros: VisitsView[] }> = ({
  cadastros,
}) => {
  const [filteredVisitsViews, setFilteredVisitsViews] =
    useState<VisitsView[]>(cadastros);
  const [searchNome, setSearchNome] = useState('');

  const navigate = useNavigate();

  const handleListItemClick = (id: number) => {
    navigate(`/visits/${id}`);
  };

  
  useEffect(() => {
    const filterVisitsViews = () => {
      let filtered = cadastros;

      if (searchNome) {
        filtered = filtered.filter(cadastro =>
          cadastro.assisted_name.toLowerCase().includes(searchNome.toLowerCase())
        );
      }
      setFilteredVisitsViews(filtered);
    };
    filterVisitsViews();
  }, [searchNome, cadastros]);

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} sm={12} >
          <Button type="button" onClick={() => { navigate("/visits") }} variant="contained" color="primary">
            Nova Visita
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Pesquisar por Visitas"
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
        {filteredVisitsViews.length === 0 ? (
          <Typography>Nenhum cadastro encontrado.</Typography>
        ) : (
          filteredVisitsViews.map((cadastro, index) => (
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
                    <>
                      <Typography color="primary.secondary">Data de Criação: {StringDateToShow(cadastro.creation_date)}</Typography>
                      <Typography color="primary.secondary">Data da Visita: {cadastro.visit_date}</Typography>
                      <Typography variant="h6" color="primary.main">
                        Conferêcia: {cadastro.conference_name}
                      </Typography>
                    </>
                  }
                  secondary={
                    <Typography variant="subtitle1" color="primary.dark">
                      Assistido: {cadastro.assisted_name}
                    </Typography>
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
