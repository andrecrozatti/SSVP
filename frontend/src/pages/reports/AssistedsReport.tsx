import React, { useState, useEffect } from 'react';
import { TextField, Grid, Box, List, ListItem, ListItemText, Typography, InputAdornment, Paper, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { IAssisteds } from '../../shared/dtos/IAssisteds';
import { useNavigate } from 'react-router-dom';
import { getAllAssisteds } from '../../api/assisteds';



export const AssistedsReport: React.FC = () => {
    const [assisteds, setAssisteds] = useState<IAssisteds[]>([])
    const [filteredCadastros, setFilteredCadastros] = useState<IAssisteds[]>(assisteds);
    const [searchNome, setSearchNome] = useState('');
    const [searchCpf, setSearchCpf] = useState('');
    const [searchDependente, setSearchDependente] = useState('');
    const navigate = useNavigate();

    const handleListItemClick = (id: number) => {
        navigate(`/assisteds/${id}`);
    };


    useEffect(() => {
        const GetAssisteds = async () => {
            setAssisteds(await getAllAssisteds())
        };

        GetAssisteds()
    }, [])

    useEffect(() => {
        const filterCadastros = () => {
            let filtered = assisteds;

            if (searchNome) {
                filtered = filtered.filter(assisteds =>
                    assisteds.name.toLowerCase().includes(searchNome.toLowerCase())
                );
            }

            if (searchCpf) {
                filtered = filtered.filter(assisteds =>
                    assisteds.cpf.toLowerCase().includes(searchCpf.toLowerCase())
                );
            }

            // if (searchDependente) {
            //     filtered = filtered.filter(assisteds =>
            //         cadastro.dependents.some(dependente =>
            //             dependente.name.toLowerCase().includes(searchDependente.toLowerCase())
            //         )
            //     );
            // }

            setFilteredCadastros(filtered);
        };

        filterCadastros();
    }, [searchNome, searchCpf, searchDependente, assisteds]);


    return (
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Pesquisar por Nome"
                        fullWidth
                        value={searchNome}
                        onChange={(e) => setSearchNome(e.target.value)}
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

                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Pesquisar por CPF"
                        fullWidth
                        value={searchCpf}
                        onChange={(e) => setSearchCpf(e.target.value)}
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

                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Pesquisar por Nome de Dependente"
                        fullWidth
                        value={searchDependente}
                        onChange={(e) => setSearchDependente(e.target.value)}
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
                            <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }} onClick={() => handleListItemClick(cadastro.id)}>
                                <ListItemText
                                    primary={
                                        <Typography variant="h6" color="primary.main">
                                            Nome: {cadastro.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="subtitle1" color="primary.dark">
                                            CPF: {cadastro.cpf}
                                        </Typography>
                                    }
                                />
                                {cadastro.dependents?.length > 0 && (
                                    <Box sx={{ paddingLeft: 2, width: '100%' }}>
                                        <Typography variant="subtitle2" color="primary.main">
                                            Dependentes:
                                        </Typography>
                                        <List disablePadding sx={{ paddingLeft: 2 }}>
                                            {cadastro.dependents.map((dependente, depIndex) => (
                                                <ListItem
                                                    key={depIndex}
                                                    sx={{
                                                        paddingLeft: 0,
                                                        paddingTop: 0,
                                                        paddingBottom: 0,
                                                        borderLeft: '4px solid',
                                                        borderColor: 'primary.light',
                                                        marginTop: 1,
                                                        marginBottom: 1,
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="body1" color="primary.dark">
                                                                - {dependente.name} ({dependente.relationship})
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                )}
                            </ListItem>
                        </Paper>
                    ))
                )}
            </List>
        </Box>
    );
};



