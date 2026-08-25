import {
    Box,
    Typography,
    Grid,
    Paper,
    Chip
} from '@mui/material'

import HistoryIcon from '@mui/icons-material/History'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import BuildIcon from '@mui/icons-material/Build'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import ErrorIcon from '@mui/icons-material/Error'

type Props = {
    historico: any[]
}

export default function TimelineHeader({
    historico
}: Props) {

    const total = historico.length

    const disponivel = historico.filter(
        e => e.estado_novo === 'disponivel'
    ).length

    const alugado = historico.filter(
        e => e.estado_novo === 'alugado'
    ).length

    const manutencao = historico.filter(
        e => e.estado_novo === 'manutencao'
    ).length

    const danificado = historico.filter(
        e => e.estado_novo === 'danificado'
    ).length

    return (

        <Box mb={4}>

            <Box
                display="flex"
                alignItems="center"
                gap={2}
                mb={3}
            >

                <HistoryIcon
                    color="primary"
                    sx={{ fontSize: 34 }}
                />

                <Box>

                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        Timeline do Equipamento
                    </Typography>

                    <Typography
                        color="text.secondary"
                    >
                        Histórico completo de mudanças de estado
                    </Typography>

                </Box>

            </Box>

            <Grid
                container
                spacing={2}
            >

                <Grid size={{ xs:12, sm:6, md:3 }}>

                    <Paper
                        sx={{
                            p:2,
                            textAlign:'center'
                        }}
                    >

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            {total}
                        </Typography>

                        <Typography
                            color="text.secondary"
                        >
                            Eventos
                        </Typography>

                    </Paper>

                </Grid>

                <Grid size={{ xs:12, sm:6, md:9 }}>

                    <Paper
                        sx={{
                            p:2,
                            display:'flex',
                            gap:1,
                            flexWrap:'wrap',
                            alignItems:'center'
                        }}
                    >

                        <Chip
                            icon={<CheckCircleIcon />}
                            label={`Disponível (${disponivel})`}
                            color="success"
                        />

                        <Chip
                            icon={<LocalShippingIcon />}
                            label={`Alugado (${alugado})`}
                            color="primary"
                        />

                        <Chip
                            icon={<BuildIcon />}
                            label={`Manutenção (${manutencao})`}
                            color="warning"
                        />

                        <Chip
                            icon={<ErrorIcon />}
                            label={`Danificado (${danificado})`}
                            color="error"
                        />

                    </Paper>

                </Grid>

            </Grid>

        </Box>

    )

}
