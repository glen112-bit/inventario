import {
    Box,
    Grid,
    Paper,
    Typography,
    Divider,
    Chip,
    IconButton,
    Stack
} from "@mui/material"

import CloseIcon from "@mui/icons-material/Close"

import EquipamentoAvatar from "../EquipamentoAvatar"
import EquipamentoStatus from "../EquipamentoStatus"

type Props={
    equipamento:any
    analytics?:any
    onClose:()=>void
}

export default function EquipamentoHeader({
    equipamento,
    analytics,
    onClose
}:Props){

    return(

<Paper
    square
    elevation={0}
    sx={{
        position:"relative",
        overflow:"hidden",
        background:"linear-gradient(135deg,#0f172a,#1d4ed8,#2563eb)",
        color:"#fff",
        px:5,
        py:4
    }}
>

    <IconButton
        onClick={onClose}
        sx={{
            position:"absolute",
            right:20,
            top:20,
            color:"#fff"
        }}
    >
        <CloseIcon/>
    </IconButton>

    <Grid
        container
        spacing={4}
        alignItems="center"
    >

        <Grid size={{xs:12,md:1.5}}>

            <EquipamentoAvatar
                equipamento={equipamento}
            />

        </Grid>

        <Grid size={{xs:12,md:7}}>

            <Typography
                variant="h3"
                fontWeight={800}
            >
                {equipamento.codigo_interno}
            </Typography>

            <Typography
                variant="h5"
                sx={{
                    opacity:.85,
                    mb:2
                }}
            >
                {equipamento.marca} {equipamento.modelo}
            </Typography>

            <Typography
                sx={{
                    opacity:.7,
                    mb:2
                }}
            >
                {equipamento.descricao ?? "Equipamento profissional"}
            </Typography>

            <Stack
                direction="row"
                spacing={6}
                flexWrap="wrap"
                useFlexGap
            >

                <Chip
                    sx={chipStyle}
                    label={`S/N ${equipamento.numero_serie}`}
                />

                <Chip
                    sx={chipStyle}
                    label={equipamento.categoria}
                />

                <Chip
                    sx={chipStyle}
                    label={equipamento.localizacao}
                />

            </Stack>

        </Grid>

        <Grid size={{xs:12,md:3.5}}>

            <Box
                sx={{
                    p:4,
                    borderRadius:2,
                    bgcolor:"rgba(255,255,255,.08)",
                    backdropFilter:"blur(10px)"
                }}
            >

                <EquipamentoStatus
                    estado={equipamento.estado_actual}
                />

                <Divider
                    sx={{
                        my:1,
                        borderColor:"rgba(255,255,255,.15)"
                    }}
                />

                <Typography
                    variant="body2"
                    sx={{opacity:.7}}
                >
                    Valor estimado
                </Typography>

                <Typography
                    variant="h4"
                    fontWeight={700}
                >
                    {Number(
                        equipamento.valor ?? 0
                    ).toLocaleString(
                        "pt-BR",
                        {
                            style:"currency",
                            currency:"BRL"
                        }
                    )}
                </Typography>

            </Box>

        </Grid>

    </Grid>

    <Divider
        sx={{
            my:4,
            borderColor:"rgba(255,255,255,.12)"
        }}
    />

    <Grid
        container
        spacing={2}
    >

        <Kpi
            titulo="Operações"
            valor={analytics?.total_operacoes ?? 0}
        />

        <Kpi
            titulo="Aluguéis"
            valor={analytics?.alugueis ?? 0}
        />

        <Kpi
            titulo="Manutenções"
            valor={analytics?.manutencoes ?? 0}
        />

        <Kpi
            titulo="Disponibilidade"
            valor={`${analytics?.disponibilidade ?? 0}%`}
        />

        <Kpi
            titulo="Danos"
            valor={analytics?.danos ?? 0}
        />

    </Grid>

</Paper>

    )

}

function Kpi({

    titulo,
    valor

}:any){

    return(

        <Grid size={{xs:6,md:2.4}}>

            <Paper
                elevation={0}
                sx={{
                    p:2,
                    borderRadius:3,
                    bgcolor:"rgba(255,255,255,.08)",
                    backdropFilter:"blur(8px)",
                    border:"1px solid rgba(255,255,255,.08)",
                    textAlign:"center",
                    transition:".25s",
                    "&:hover":{
                        bgcolor:"rgba(255,255,255,.14)",
                        transform:"translateY(-3px)"
                    }
                }}
            >

                <Typography
                    variant="body2"
                    sx={{
                        opacity:.75,
                        mb:.5
                    }}
                >
                    {titulo}
                </Typography>

                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    {valor}
                </Typography>

            </Paper>

        </Grid>

    )

}

const chipStyle={

    bgcolor:"rgba(255,255,255,.12)",
    color:"#fff",
    border:"1px solid rgba(255,255,255,.15)",
    fontWeight:600,

    "& .MuiChip-label":{

        px:2

    }

}
