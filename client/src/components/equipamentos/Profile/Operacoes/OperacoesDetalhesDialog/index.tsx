import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Paper,
    Typography,
    Divider,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Button,
    Box
} from "@mui/material";

import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
    open:boolean;
    operacao:any;
    onClose:()=>void;
}

export default function OperacaoDetalhesDialog({
    open,
    operacao,
    onClose
}:Props){

    if(!operacao) return null;

    return(
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xl"
        >
            <DialogTitle>
                Operação #{operacao.id}
            </DialogTitle>
            <DialogContent>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid size={{xs:12,md:3}}>
                        <Paper sx={{p:2}}>
                            <Typography
                                variant="caption"
                            >
                                Tipo
                            </Typography>
                            <Chip
                                label={operacao.tipo}
                                color={
                                    operacao.tipo==="saida"
                                    ?"primary"
                                    :"secondary"
                                }
                            />
                        </Paper>
                    </Grid>
                    <Grid size={{xs:12,md:3}}>
                        <Paper sx={{p:2}}>
                            <Typography
                                variant="caption"
                            >
                                Cliente
                            </Typography>
                            <Typography>
                                {operacao.cliente}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{xs:12,md:3}}>
                        <Paper sx={{p:2}}>
                            <Typography
                                variant="caption"
                            >
                                Usuário
                            </Typography>
                            <Typography>
                                {operacao.usuario}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{xs:12,md:3}}>
                        <Paper sx={{p:2}}>
                            <Typography
                                variant="caption"
                            >
                                Status
                            </Typography>
                            <Chip
                                label={operacao.status}
                                color={
                                    operacao.status==="finalizada"
                                    ?"success"
                                    :"warning"
                                }
                            />
                        </Paper>
                    </Grid>
                </Grid>
                <Divider sx={{my:3}}/>
                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Equipamentos
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Modelo</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>QR</TableCell>
                            <TableCell>Saída</TableCell>
                            <TableCell>Retorno</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            operacao.itens?.map((item:any)=>(
                                <TableRow
                                    key={item.id}
                                >
                                    <TableCell>
                                        {item.codigo_interno}
                                    </TableCell>
                                    <TableCell>
                                        {item.modelo}
                                    </TableCell>
                                    <TableCell>
                                        {item.marca}
                                    </TableCell>
                                    <TableCell>
                                        {item.qr_code}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={item.estado_saida}
                                            color="primary"
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {
                                            item.estado_retorno
                                            ?
                                            <Chip
                                                label={item.estado_retorno}
                                                color="success"
                                                size="small"
                                            />
                                            :
                                            <Chip
                                                label="Pendente"
                                                color="warning"
                                                size="small"
                                            />
                                        }
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <Divider sx={{my:3}}/>
                <Box>
                    <Typography
                        variant="subtitle2"
                    >
                        Total de Equipamentos
                    </Typography>
                    <Typography
                        variant="h4"
                    >
                        {operacao.itens?.length ?? 0}
                    </Typography>
                </Box>
                {

                    operacao.observacoes &&

                    <>

                        <Divider sx={{my:3}}/>

                        <Typography
                            variant="subtitle2"
                        >

                            Observações

                        </Typography>

                        <Typography>

                            {operacao.observacoes}

                        </Typography>

                    </>

                }

            </DialogContent>

            <DialogActions>

                <Button

                    startIcon={<PrintIcon/>}

                >

                    Imprimir

                </Button>

                <Button

                    startIcon={<PictureAsPdfIcon/>}

                >

                    PDF

                </Button>

                <Button

                    startIcon={<CloseIcon/>}

                    onClick={onClose}

                >

                    Fechar

                </Button>

            </DialogActions>

        </Dialog>

    )

}
