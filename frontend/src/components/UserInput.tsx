import { Box, Input, Button } from "@mui/material";
import React, { useState, useEffect, FC } from "react";

type UserInputProps = {
    onSubmit(val: string): void;
}

export const UserInputSection: FC<UserInputProps> = ({ onSubmit }) => {
    const [inputValue, setInputValue] = useState("");

    return (
        <Box sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around"
        }}>
            <Input
                sx={{
                    width: "50%",
                    // flexGrow: 2
                }}
                name={"propertyAddress"}
                maxRows={1}
                minRows={1}
                placeholder="Input Property Address"
                onChange={(e) => {
                    setInputValue(e.target.value)
                }}
            />
            <Button
                sx={{
                    // flexGrow: 1
                }}
                variant="contained"
                onClick={
                    () => {
                        onSubmit(inputValue);
                    }
                }
            >
                Submit
            </Button>
        </Box>
    )
}