import { ReactNode } from "react";


export const BaseReportPage: React.FC<{ children: ReactNode }> = ({ children }) => {

    return (
        <div style={{ marginTop: "100px" }}>
            {children}
        </div>
    );
};


