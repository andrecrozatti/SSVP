import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";
import * as React from "react";
import { useReactToPrint } from "react-to-print";


const PrintableTable = React.forwardRef<HTMLDivElement>((_, ref) => {
  const theme = useTheme();
  const data = [
    { id: 1, name: 'Produto A', quantity: 10, price: 100 },
    { id: 2, name: 'Produto B', quantity: 5, price: 50 },
    { id: 3, name: 'Produto C', quantity: 15, price: 150 },
  ];
  return (
    <TableContainer component={Paper} ref={ref} id="printable-area">
      <Table>
        <TableHead style={{ backgroundColor: theme.palette.primary.main }}>
          <TableRow>
            <TableCell style={{ color: theme.palette.primary.contrastText }}>ID</TableCell>
            <TableCell style={{ color: theme.palette.primary.contrastText }}>Nome do Produto</TableCell>
            <TableCell style={{ color: theme.palette.primary.contrastText }}>Quantidade</TableCell>
            <TableCell style={{ color: theme.palette.primary.contrastText }}>Preço</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
export const AssistedsReport = () => {
  const componentRef = React.useRef(null);

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
    return Promise.resolve();
  }, []);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "AwesomeFileName",
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  return (
    <div>
      <button onClick={printFn}>Print</button>

      <PrintableTable ref={componentRef} />

    </div>
  );
};
