import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import * as React from "react";

import PrintHeader from "../PrintHeader";
import { IAssisteds } from "../../../shared/dtos/IAssisteds";
import { StringDateToShow } from "../../../shared/utils/formatDate";

interface PrintableReportProps {
  records: Partial<IAssisteds>[],
}

export const AssistedsReport = React.forwardRef<HTMLInputElement, PrintableReportProps>(({ records }, ref) => {
  return (
    <div ref={ref} id="printable-area" style={{ padding: "10px", height:"297mm", border:"3px solid #3966BF" }}>

      <PrintHeader
        companyName="Sociedade São Vicente de Paulo"
        address="Rua Exemplo, 123 - Cidade, Estado"
        phone="(11) 1234-5678"
        email="contato@minhaempresa.com"
        additionalInfo="CNPJ: 00.000.000/0001-00"
      >
      </PrintHeader>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome do Assistido</TableCell>
              <TableCell>Bairro</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Data de Nascimento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map(
              (record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.id}</TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.neighborhood}</TableCell>
                  <TableCell>{record.phone}</TableCell>
                  <TableCell>{StringDateToShow(String(record.age))}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
});



