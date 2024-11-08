import React from 'react';
import { Box, Typography, Divider, useTheme } from '@mui/material';
import logo from '../../assets/ssvp.png';
// Tipagem das props para o cabeçalho
interface PrintHeaderProps {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  additionalInfo?: string;
}

const PrintHeader: React.FC<PrintHeaderProps> = ({

  companyName,
  address,
  phone,
  email,
  additionalInfo,
}) => {
  const theme = useTheme();
  const currentDate = new Date().toLocaleDateString();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding={2}
      borderBottom={`2px solid ${theme.palette.primary.main}`}
      mb={2}
    >
      {/* Linha do logo e nome da empresa */}
      <Box display="flex" alignItems="center" justifyContent="center" width="100%">
        <Box alignItems="center" >
          <Box component="img" src={logo} alt="Logo da Empresa" height="60px" mr={2} />
        </Box>

        <Box flexGrow={1} textAlign={"center"} >
          <Typography variant="h6" fontWeight="bold" >
            {companyName}
          </Typography>
        </Box>

        {/* Linha das informações de contato */}
        <Box mt={1} textAlign={"right"}>
          <Typography fontSize={10} >Data: {currentDate}</Typography>
          <Typography fontSize={10}>Telefone: {phone} </Typography>
          <Typography fontSize={10}>E-mail: {email}</Typography>
          {additionalInfo && <Typography fontSize={10}>{additionalInfo}</Typography>}
        </Box>

      </Box>

      {/* Linha das informações de contato e data */}
      <Box textAlign="center"  >
        
        <Typography fontSize={10} >{address}</Typography>
        <Typography fontSize={10} >Telefone: {phone} | E-mail: {email} </Typography>
        
      </Box>

      {/* Divisor visual para separar o cabeçalho do conteúdo */}
      <Divider style={{ width: '100%', marginTop: theme.spacing(2) }} />
    </Box>
  );
};

export default PrintHeader;
