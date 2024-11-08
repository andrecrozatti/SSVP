import React, { ReactNode } from "react";
import { useReactToPrint } from "react-to-print";
import { AssistedsReport } from "./AssistedsReport";


export const BaseReportPage: React.FC = () => {
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
        documentTitle: "Assistidos",
        onAfterPrint: handleAfterPrint,
        onBeforePrint: handleBeforePrint,
    });

    return (
        <div style={{ marginTop: "100px" }}>

            <button onClick={printFn}>Print</button>
            <AssistedsReport records={[{id: 1, name: "Andre", family_income: "1000", age: 12 }]} ref={componentRef} />
        </div>
    );
};


