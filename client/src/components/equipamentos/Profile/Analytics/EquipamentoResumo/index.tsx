import {
    Alert,
    Box,
    Chip,
    Divider,
    Grid,
    Paper,
    Typography
} from '@mui/material'

import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import BuildIcon from '@mui/icons-material/Build'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'

type Props = {
    analytics: any
    equipamento: any
}

export default function EquipamentoResumo({

    analytics,
    equipamento

}: Props) {

    const disponibilidade =
        analytics?.disponibilidade ?? 0

    const manutencoes =
        analytics?.manutencoes ?? 0

    const danos =
        analytics?.danos ?? 0

    const alugueis =
        analytics?.alugueis ?? 0

    //-----------------------------------------------------

    const situacao = () => {

        if (danos > 0)
            return {
                cor: "error",
                titulo: "Equipamento crítico",
                texto: "Existem registros de danos."
            }

        if (manutencoes >= 5)
            return {
                cor: "warning",
                titulo: "Necessita atenção",
                texto: "Quantidade elevada de manutenções."
            }

        if (disponibilidade >= 90)
            return {
                cor: "success",
                titulo: "Excelente disponibilidade",
                texto: "Equipamento em ótimo estado."
            }

        return {
            cor: "info",
            titulo: "Operação normal",
            texto: "Sem ocorrências relevantes."
        }

    }

    const status = situacao()

    return (

        <Paper
            sx={{
                p:3
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
            >

                Resumo Executivo

            </Typography>

            <Divider sx={{ mb:3 }} />

            <Alert
                severity={status.cor as any}
                sx={{ mb:3 }}
            >

                <Typography fontWeight={700}>

                    {status.titulo}

                </Typography>

                <Typography>

                    {status.texto}

                </Typography>

            </Alert>

            <Grid
                container
                spacing={2}
            >

                <Grid size={{ xs:12, md:6 }}>

                    <Box>

                        <Typography
                            variant="subtitle2"
                            gutterBottom
                        >

                            Utilização

                        </Typography>

                        <Chip
                            icon={
                                alugueis > 10
                                    ? <TrendingUpIcon/>
                                    : <TrendingDownIcon/>
                            }
                            color={
                                alugueis > 10
                                    ? "success"
                                    : "warning"
                            }
                            label={`${alugueis} aluguéis`}
                        />

                    </Box>

                </Grid>

                <Grid size={{ xs:12, md:6 }}>

                    <Box>

                        <Typography
                            variant="subtitle2"
                            gutterBottom
                        >

                            Disponibilidade

                        </Typography>

                        <Chip
                            icon={<CheckCircleIcon/>}
                            color="success"
                            label={`${disponibilidade}%`}
                        />

                    </Box>

                </Grid>

                <Grid size={{ xs:12, md:6 }}>

                    <Box>

                        <Typography
                            variant="subtitle2"
                            gutterBottom
                        >

                            Manutenções

                        </Typography>

                        <Chip
                            icon={<BuildIcon/>}
                            color={
                                manutencoes > 4
                                    ? "warning"
                                    : "success"
                            }
                            label={`${manutencoes} registros`}
                        />

                    </Box>

                </Grid>

                <Grid size={{ xs:12, md:6 }}>

                    <Box>

                        <Typography
                            variant="subtitle2"
                            gutterBottom
                        >

                            Danos

                        </Typography>

                        <Chip
                            icon={<WarningIcon/>}
                            color={
                                danos > 0
                                    ? "error"
                                    : "success"
                            }
                            label={`${danos} ocorrências`}
                        />

                    </Box>

                </Grid>

            </Grid>

            <Divider sx={{ my:3 }} />

            <Typography
                variant="subtitle2"
                gutterBottom
            >

                Conclusão

            </Typography>

            <Typography
                color="text.secondary"
            >

                O equipamento

                <strong>

                    {" "}

                    {equipamento.codigo_interno}

                </strong>

                {" "}já participou de

                <strong>

                    {" "}

                    {analytics.total_operacoes}

                </strong>

                {" "}operações, possui

                <strong>

                    {" "}

                    {analytics.alugueis}

                </strong>

                {" "}aluguéis registrados e apresenta uma disponibilidade de

                <strong>

                    {" "}

                    {disponibilidade}%

                </strong>.

            </Typography>

        </Paper>

    )

}
