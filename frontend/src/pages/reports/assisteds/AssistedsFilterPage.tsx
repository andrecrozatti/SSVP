import React, { ReactNode, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { AssistedsReport } from "./AssistedsReport";
import { Box, Button, Grid, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import SearchIcon from '@mui/icons-material/Search';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IReport } from "../../../shared/dtos/IReport";
import ConferencesSelect from "../../../shared/components/form-components/ConferencesSelect";
import { getAllConferences } from "../../../api/conferences";
import { getAssistedsReport } from "../../../api/assisteds";
import { IAssisteds } from "../../../shared/dtos/IAssisteds";


export const AssistedsFilterPage: React.FC = () => {
    const componentRef = React.useRef(null);
    const [conferences, setConferences] = useState([]);
    const [assisteds, setAssisteds] = useState<IAssisteds[]>([]);
    
    useEffect(() => {
        const loadConferences = async () => {
            setConferences(await getAllConferences());
        };

        loadConferences();
    }, [])


    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
        setValue
    } = useForm<IReport>({
        defaultValues: {
            filterType: "",
            filterValue: "",
        },
    });

    // Observar o valor do tipo de filtro selecionado
    const selectedFilterType = watch("filterType");

    // Limpar o campo de valor ao alterar o tipo de filtro
    useEffect(() => {
        if (selectedFilterType) {
            setValue("filterValue", "");
        }
    }, [selectedFilterType, setValue]);


    const handleAfterPrint = React.useCallback(() => {
        console.log("`onAfterPrint` called");
    }, []);

    const handleBeforePrint = React.useCallback(() => {
        console.log("`onBeforePrint` called");
        return Promise.resolve();
    }, []);

    const printFn = useReactToPrint({
        contentRef: componentRef,
        documentTitle: "Assistidos",
        onAfterPrint: handleAfterPrint,
        onBeforePrint: handleBeforePrint,
    });



    const onSubmit: SubmitHandler<IReport> = async data => {
        try {

            setAssisteds(await getAssistedsReport(data))
            
        } catch (err) {
            console.error('Erro ao salvar o assistido', err);
        }
    };

    return (
        <Box sx={{ marginTop: "100px" }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}

        >
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Controller
                        name="filterType"
                        control={control}
                        render={({ field }) => (
                            <FormControl
                                fullWidth
                                variant="outlined"
                            >
                                <InputLabel>Filtrar Por</InputLabel>
                                <Select
                                    {...field}
                                    variant="outlined"
                                    label="Filtrar Por"

                                    fullWidth
                                    error={!!errors.filterType}
                                >
                                    <MenuItem value="neighborhood">Bairro</MenuItem>
                                    <MenuItem value="conference">Conferência</MenuItem>
                                    <MenuItem value="name">Nome</MenuItem>
                                </Select>
                            </FormControl>

                        )}
                        rules={{ required: true }}
                    />
                </Grid>

                {/* Exibe o campo de valor com base no tipo de filtro selecionado */}
                <Grid item xs={4}>
                    {selectedFilterType === "neighborhood" && (
                        <Controller
                            name="filterValue"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    label="Bairro"
                                    fullWidth
                                    error={!!errors.filterValue}
                                    helperText={errors.filterValue ? 'Campo obrigatório' : ''}
                                />
                            )}
                            rules={{ required: true }}
                        />
                    )}
                    {selectedFilterType === "conference" && (
                        <ConferencesSelect
                            control={control}
                            name="filterValue"
                            conferences={conferences}
                            error={!!errors.filterValue} // Passa se há erro
                            errorMessage={errors.filterValue ? 'Campo obrigatório' : ''} // Mensagem de erro
                        />
                    )}
                    {selectedFilterType === "name" && (
                        <Controller
                            name="filterValue"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    label="name"
                                    fullWidth
                                    error={!!errors.filterValue}
                                    helperText={errors.filterValue ? 'Campo obrigatório' : ''}
                                />
                            )}
                            rules={{ required: true }}
                        />
                    )}
                </Grid>

                <Grid item xs={2}>
                    <Button
                        variant="outlined"
                        startIcon={<SearchIcon />}
                        type="submit"
                    >
                        Pesquisar
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        variant="outlined"
                        onClick={printFn}
                        startIcon={<PrintIcon />}
                    >
                        Print
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <AssistedsReport records={assisteds} ref={componentRef} />
                </Grid>
            </Grid>
        </Box>
    );
};
