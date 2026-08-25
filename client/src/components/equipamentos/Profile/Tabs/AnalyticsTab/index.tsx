import {
    Box,
    Chip,
    Divider,
    Grid,
    LinearProgress,
    Paper,
    Typography
} from '@mui/material'

import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import BuildIcon from '@mui/icons-material/Build'
import InventoryIcon from '@mui/icons-material/Inventory'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

type Props = {
    analytics: any
    equipamento?: any
}

export default function AnalyticsTab({
    analytics,
    equipamento
}: Props) {

    if (!analytics) {
        return (
            <Paper
                sx={{
                    p: 5,
                    textAlign: 'center'
                }}
            >
                <Typography variant="h6">
                    Nenhum dado encontrado.
                </Typography>
            </Paper>
        )
    }

    const disponibilidade = Number(
        analytics.disponibilidade ?? 0
    )

    return (

        <Box>
            {/* KPI */}
            <Grid
                container
                spacing={2}
                mb={3}
            >
                <KpiCard
                    titulo="Operações"
                    valor={analytics.total_operacoes ?? 0}
                    icon={<InventoryIcon color="primary" />}
                />
                <KpiCard
                    titulo="Aluguéis"
                    valor={analytics.alugueis ?? 0}
                    icon={<TrendingUpIcon color="success" />}
                />

                <KpiCard
                    titulo="Manutenções"
                    valor={analytics.manutencoes ?? 0}
                    icon={<BuildIcon color="warning" />}
                />

                <KpiCard
                    titulo="Danos"
                    valor={analytics.danos ?? 0}
                    icon={<BuildIcon color="error" />}
                />

            </Grid>

            {/* Disponibilidade + Indicadores */}

            <Grid
                container
                spacing={2}
            >

                <Grid size={{ xs: 12, md: 6 }}>

                    <Paper
                        sx={{
                            p: 3,
                            height: '100%'
                        }}
                    >

                        <Typography
                            variant="h6"
                            gutterBottom
                        >
                            Disponibilidade
                        </Typography>

                        <Typography
                            variant="h3"
                            fontWeight={700}
                            color="success.main"
                        >
                            {disponibilidade}%
                        </Typography>

                        <LinearProgress
                            variant="determinate"
                            value={Math.min(
                                100,
                                Math.max(0, disponibilidade)
                            )}
                            sx={{
                                mt: 3,
                                height: 12,
                                borderRadius: 10
                            }}
                        />

                    </Paper>

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <Paper
                        sx={{
                            p: 3,
                            height: '100%'
                        }}
                    >

                        <Typography
                            variant="h6"
                            gutterBottom
                        >
                            Indicadores
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        <InfoRow
                            label="Tempo alugado"
                            value={`${analytics.dias_alugado ?? 0} dias`}
                        />

                        <InfoRow
                            label="Tempo manutenção"
                            value={`${analytics.dias_manutencao ?? 0} dias`}
                        />

                        <InfoRow
                            label="Primeira operação"
                            value={
                                analytics.primeira_operacao ?? '-'
                            }
                        />

                        <InfoRow
                            label="Última operação"
                            value={
                                analytics.ultima_operacao ?? '-'
                            }
                        />

                    </Paper>

                </Grid>

            </Grid>

            {/* Resumo */}

            <Grid
                container
                spacing={2}
                mt={1}
            >

                <Grid size={{ xs: 12 }}>

                    <Paper sx={{ p: 3 }}>

                        <Typography
                            variant="h6"
                            gutterBottom
                        >
                            Resumo do Equipamento
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        <Box
                            display="flex"
                            flexWrap="wrap"
                            gap={1}
                        >

                            <Chip
                                color="primary"
                                label={`Estado: ${equipamento?.estado_actual ?? '-'}`}
                            />

                            <Chip
                                label={`Marca: ${equipamento?.marca ?? '-'}`}
                            />

                            <Chip
                                label={`Modelo: ${equipamento?.modelo ?? '-'}`}
                            />

                            <Chip
                                label={`Categoria: ${equipamento?.categoria ?? '-'}`}
                            />

                            <Chip
                                icon={<AccessTimeIcon />}
                                color="success"
                                label={`${analytics.total_operacoes ?? 0} operações`}
                            />

                        </Box>

                    </Paper>

                </Grid>

            </Grid>

        </Box>

    )

}

type KpiCardProps = {
    titulo: string
    valor: number | string
    icon: React.ReactNode
}

function KpiCard({
    titulo,
    valor,
    icon
}: KpiCardProps) {

    return (

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>

            <Paper
                sx={{
                    p: 3,
                    height: '100%'
                }}
            >

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Box>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {titulo}
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            {valor}
                        </Typography>

                    </Box>

                    {icon}

                </Box>

            </Paper>

        </Grid>

    )

}

type InfoRowProps = {
    label: string
    value: React.ReactNode
}

function InfoRow({
    label,
    value
}: InfoRowProps) {

    return (

        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={1}
        >

            <Typography color="text.secondary">
                {label}
            </Typography>

            <Typography fontWeight={600}>
                {value}
            </Typography>

        </Box>

    )

}
