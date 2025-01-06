import React, { FC, PropsWithChildren } from "react";
import { Box } from "@mui/material";


export const MainLayout: FC<PropsWithChildren> = ({ children }) => {

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "100%",
            width: "100%",
            height: "100vh"
        }}>{children}</Box>
    )
}
