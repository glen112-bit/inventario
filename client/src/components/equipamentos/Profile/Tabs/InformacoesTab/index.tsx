import {
    Grid,
    Paper,
    Typography,
    Divider,
    Box,
    Chip
} from '@mui/material'

import QrCode2Icon from '@mui/icons-material/QrCode2'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

type Props = {
    equipamento: any
}

export default function InformacoesTab({
    equipamento
}: Props) {

    return (

        <Grid
            container
            spacing={3}
        >

            {/* ================================
                IDENTIFICAÇÃO
            ================================= */}

            <Grid size={{ xs: 12, md: 6 }}>

                <Paper sx={{ p: 3, height: '100%' }}>

                    <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        mb={2}
                    >

                        <Inventory2Icon color="primary" />

                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            Identificação
                        </Typography>

                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <InfoRow
                        label="Código Interno"
                        value={equipamento.codigo_interno}
                    />

                    <InfoRow
                        label="Número de Série"
                        value={equipamento.numero_serie}
                    />

                    <InfoRow
                        label="QR Code"
                        value={equipamento.qr_code}
                    />

                    <InfoRow
                        label="Marca"
                        value={equipamento.marca}
                    />

                    <InfoRow
                        label="Modelo"
                        value={equipamento.modelo}
                    />

                    <InfoRow
                        label="Categoria"
                        value={equipamento.categoria}
                    />

                </Paper>

            </Grid>

            {/* ================================
                STATUS
            ================================= */}

            <Grid size={{ xs: 12, md: 6 }}>

                <Paper sx={{ p: 3, height: '100%' }}>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                        mb={2}
                    >

                        Estado Atual

                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    <Chip

                        label={equipamento.estado_actual}

                        color={
                            equipamento.estado_actual === 'disponivel'
                                ? 'success'
                                : equipamento.estado_actual === 'alugado'
                                ? 'primary'
                                : equipamento.estado_actual === 'manutencao'
                                ? 'warning'
                                : 'error'
                        }

                        sx={{
                            fontWeight: 700,
                            px: 2,
                            py: 2
                        }}

                    />

                    <Box mt={4}>

                        <InfoRow
                            label="Data Compra"
                            value={
                                equipamento.fecha_compra
                                    ? new Date(
                                          equipamento.fecha_compra
                                      ).toLocaleDateString()
                                    : '-'
                            }
                        />

                        <InfoRow
                            label="Criado em"
                            value={
                                equipamento.created_at
                                    ? new Date(
                                          equipamento.created_at
                                      ).toLocaleDateString()
                                    : '-'
                            }
                        />

                    </Box>

                </Paper>

            </Grid>

            {/* ================================
                LOCALIZAÇÃO
            ================================= */}

            <Grid size={{ xs: 12, md: 6 }}>

                <Paper sx={{ p: 3 }}>

                    <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        mb={2}
                    >

                        <LocationOnIcon color="primary" />

                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            Localização
                        </Typography>

                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <InfoRow
                        label="Depósito"
                        value={equipamento.localizacao}
                    />

                </Paper>

            </Grid>

            {/* ================================
                VALOR
            ================================= */}

            <Grid size={{ xs: 12, md: 6 }}>

                <Paper sx={{ p: 3 }}>

                    <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        mb={2}
                    >

                        <AttachMoneyIcon color="primary" />

                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            Financeiro
                        </Typography>

                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <Typography
                        variant="h3"
                        fontWeight={700}
                    >

                        {Number(
                            equipamento.valor ?? 0
                        ).toLocaleString(
                            'pt-BR',
                            {
                                style: 'currency',
                                currency: 'BRL'
                            }
                        )}

                    </Typography>

                    <Typography
                        color="text.secondary"
                    >

                        Valor de aquisição

                    </Typography>

                </Paper>

            </Grid>

            {/* ================================
                QR GRANDE
            ================================= */}

            <Grid size={{ xs: 12 }}>

                <Paper
                    sx={{
                        p: 3,
                        textAlign: 'center'
                    }}
                >

                    <QrCode2Icon
                        sx={{
                            fontSize: 90,
                            color: 'primary.main'
                        }}
                    />

                    <Typography
                        mt={2}
                        fontWeight={700}
                    >

                        {equipamento.qr_code}

                    </Typography>

                </Paper>

            </Grid>

        </Grid>

    )

}

type RowProps = {

    label: string

    value: any

}

function InfoRow({

    label,

    value

}: RowProps) {

    return (

        <Box
            display="flex"
            justifyContent="space-between"
            py={1}
            borderBottom="1px solid"
            borderColor="divider"
        >

            <Typography
                color="text.secondary"
            >

                {label}

            </Typography>

            <Typography
                fontWeight={600}
            >

                {value ?? '-'}

            </Typography>

        </Box>

    )

}
