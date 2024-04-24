"use client";
import {  useState } from "react";
import {
    Button,
    Container, Autocomplete,
    TextField
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";


export const VisitorComp = ({visitorsRut, visitorsName}) => {
    const {t} = useTranslation("common", {keyPrefix: "visitors"});
    const [rut, setRut] = useState(''); // MUI doesnt like null values
    const [name, setName] = useState('');
    const [openRut, setOpenRut] = useState(false);
    const [openName, setOpenName] = useState(false);

    return (
        <>
            <Grid container sx={{ width: 1 }} spacing={2}>
                <Grid xs={12} md={6}>
                    <Autocomplete
                        id="autocomplete-name"
                        sx={{ mt: 2, width: 1 }}
                        disablePortal
                        forcePopupIcon={false}
                        noOptionsText={t("no_visitors")}
                        value={name}
                        open={openName}
                        onClose={() => setOpenName(false)}
                        options={visitorsName}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={t("name")}
                                InputLabelProps={{ color: "secondary" }} />
                        )}
                        onInputChange={(event, value) => {
                            if (rut != "") return;
                            setOpenName(value.length > 0); // Set open to true when there's input
                        }}
                        onChange={(event, value) => {
                            setName(value);
                            if (!value) {
                                setRut("");
                                return;
                            }
                            setRut(
                                visitorsRut.find((visitor) => visitor.id === value.id).label
                            );
                        }} />
                </Grid>
                <Grid xs={12} md={6}>
                    <Autocomplete
                        id="autocomplete-rut"
                        sx={{ mt: 2 }}
                        disablePortal
                        forcePopupIcon={false}
                        noOptionsText={t("no_visitors")}
                        value={rut}
                        open={openRut}
                        onClose={() => setOpenRut(false)}
                        options={visitorsRut}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={t("rut")}
                                InputLabelProps={{ color: "secondary" }} />
                        )}
                        onInputChange={(event, value) => {
                            if (name != "") return;
                            setOpenRut(value.trim().length > 0); // Set open to true when there's input
                        }}
                        onChange={(event, value) => {
                            setRut(value);
                            if (!value) {
                                setName("");
                                return;
                            }
                            setName(
                                visitorsName.find((visitor) => visitor.id === value.id).label
                            );
                        }} />
                </Grid>
                <Grid xs={12}>
                    {rut && name && (
                        <>
                            <Container
                                sx={{
                                    mt: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    mb: 2,
                                }}
                            >
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={[1, 23, 3, 45, 2]}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => (
                                        <TextField {...params} label={t("residence")} />
                                    )} />

                                <Button
                                    variant="outlined"
                                    sx={{
                                        mt: 2,
                                        alignItems: "center",
                                        display: "flex",
                                        flexDirection: "row",
                                        flexGrow: 1,
                                    }}
                                >
                                    {t("register_visitor")}
                                </Button>
                            </Container>
                        </>
                    )}
                </Grid>
            </Grid>
        </>
    );
};
