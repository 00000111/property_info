import {
    Box,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import { FC } from "react";
import { PropertyDetailsResponse } from "../client/backend/models/PropertyDetailsResponse";


type PropertyDataProps = {
    data: PropertyDetailsResponse[]

}

const tableRows = [
    ["", "provider_name"],
    ["Square Footage", "square_footage"],
    ["Lot Size (Acres)", "lot_size_in_acres"],
    ["Year Built", "year_built"],
    ["Property Type", "property_type"],
    ["Bedrooms", "bedrooms"],
    ["Bathrooms", "bathrooms"],
    ["Room Count", "room_count"],
    ["Septic System", "septic_system"],
    ["Sale Price", "sale_price"]
]

const transformData = (data: PropertyDetailsResponse[]) => {
    const tableData = tableRows.reduce((acc, tableRowDefinition: string[]) => {
        const [tableRowName, dataPropertyName] = tableRowDefinition;
        let rowData = data.reduce((acc, providerResponse: PropertyDetailsResponse) => {
            return [...acc, providerResponse[dataPropertyName as keyof PropertyDetailsResponse]]
        }, [] as (string | number | boolean)[])
        return [...acc, [tableRowName, ...rowData]]
    }, [] as (string | number | boolean)[][])
    return tableData
}


const BooleanCheckbox: FC<Record<string, boolean>> = ({ val }) => {
    return val ? <Checkbox defaultChecked disabled /> : <Checkbox disabled />
}

export const PropertyInfoTable: FC<PropertyDataProps> = ({ data }) => {
    const propertyNormalizedAddress = data[0].normalized_address
    const [headerData, ...transformedData] = transformData(data);
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "80%"
        }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "2em auto",
                    minWidth: "50%",
                    maxWidth: "100%"
                }}>
                <Typography
                    sx={{ display: "block", fontWeight: "bold" }}
                    component="span"
                >
                    Normalized Address:
                </Typography>
                <Typography
                    sx={{ display: "block" }}
                    component="span"
                >
                    {propertyNormalizedAddress}
                </Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headerData.map((item, i) => (
                                <TableCell key={`header-${i}`}>{item}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transformedData.map((row) => (
                            <TableRow
                                key={`${row[0]}`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {row[0]}
                                </TableCell>

                                {row.slice(1).map((item, i) => (
                                    <TableCell key={`${row[0]}-cell-${i}`}>
                                        {
                                            typeof item === "boolean"
                                                ? (<BooleanCheckbox val={item} />)
                                                : item
                                        }
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}