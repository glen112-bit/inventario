import { useMemo, useState } from 'react'

import {
    Paper,
    Box,
    Grid,
    TextField,
    MenuItem,
    InputAdornment,
    Typography,

    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,

    TableContainer,

    TablePagination
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

import api from '../../../../../services/api'

import OperacaoRow from './OperacaoRow'
import OperacaoDetalhesDialog from './OperacaoDetalhesDialog'

type Props = {

    operacoes:any[]

}

export default function OperacoesTable({

    operacoes

}:Props){

    const [busca,setBusca]=useState("")

    const [tipo,setTipo]=useState("")

    const [status,setStatus]=useState("")

    const [page,setPage]=useState(0)

    const [rowsPerPage,setRowsPerPage]=useState(10)

    const [dialogOpen,setDialogOpen]=useState(false)

    const [operacao,setOperacao]=useState<any>(null)

    //--------------------------------------------------

    const abrirOperacao = async(id:number)=>{

        try{

            const {data}=await api.get(

                `/operacoes/${id}`

            )

            setOperacao(data)

            setDialogOpen(true)

        }

        catch(error){

            console.error(error)

        }

    }

    //--------------------------------------------------

    const filtradas=useMemo(()=>{

        return operacoes.filter(op=>{

            const okBusca=

                busca===""

                ||

                op.cliente?.toLowerCase().includes(

                    busca.toLowerCase()

                )

                ||

                String(op.id).includes(busca)

            const okTipo=

                tipo===""

                ||

                op.tipo===tipo

            const okStatus=

                status===""

                ||

                op.status===status

            return(

                okBusca

                &&

                okTipo

                &&

                okStatus

            )

        })

    },[operacoes,busca,tipo,status])

    //--------------------------------------------------

    return(

        <>

            <Paper sx={{p:3}}>

                <Box mb={3}>

                    <Typography

                        variant="h6"

                        fontWeight={700}

                    >

                        Operações

                    </Typography>

                </Box>

                <Grid
                    container
                    spacing={2}
                    mb={3}
                >

                    <Grid size={{xs:12,md:6}}>

                        <TextField

                            fullWidth

                            placeholder="Pesquisar..."

                            value={busca}

                            onChange={(e)=>

                                setBusca(e.target.value)

                            }

                            InputProps={{

                                startAdornment:(

                                    <InputAdornment position="start">

                                        <SearchIcon/>

                                    </InputAdornment>

                                )

                            }}

                        />

                    </Grid>

                    <Grid size={{xs:12,md:3}}>

                        <TextField

                            select

                            fullWidth

                            label="Tipo"

                            value={tipo}

                            onChange={(e)=>

                                setTipo(e.target.value)

                            }

                        >

                            <MenuItem value="">

                                Todos

                            </MenuItem>

                            <MenuItem value="saida">

                                Saída

                            </MenuItem>

                            <MenuItem value="devolucao">

                                Devolução

                            </MenuItem>

                        </TextField>

                    </Grid>

                    <Grid size={{xs:12,md:3}}>

                        <TextField

                            select

                            fullWidth

                            label="Status"

                            value={status}

                            onChange={(e)=>

                                setStatus(e.target.value)

                            }

                        >

                            <MenuItem value="">

                                Todos

                            </MenuItem>

                            <MenuItem value="aberta">

                                Aberta

                            </MenuItem>

                            <MenuItem value="finalizada">

                                Finalizada

                            </MenuItem>

                        </TextField>

                    </Grid>

                </Grid>

                <TableContainer>

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>ID</TableCell>

                                <TableCell>Tipo</TableCell>

                                <TableCell>Cliente</TableCell>

                                <TableCell>Data</TableCell>

                                <TableCell>Status</TableCell>

                                <TableCell align="center">

                                    Ações

                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {

                                filtradas

                                .slice(

                                    page*rowsPerPage,

                                    page*rowsPerPage+rowsPerPage

                                )

                                .map(op=>(

                                    <OperacaoRow

                                        key={op.id}

                                        operacao={op}

                                        onVisualizar={abrirOperacao}

                                    />

                                ))

                            }

                        </TableBody>

                    </Table>

                </TableContainer>

                <TablePagination

                    component="div"

                    count={filtradas.length}

                    page={page}

                    rowsPerPage={rowsPerPage}

                    rowsPerPageOptions={[10,25,50]}

                    onPageChange={(e,p)=>

                        setPage(p)

                    }

                    onRowsPerPageChange={(e)=>{

                        setRowsPerPage(

                            Number(e.target.value)

                        )

                        setPage(0)

                    }}

                />

            </Paper>

            <OperacaoDetalhesDialog

                open={dialogOpen}

                operacao={operacao}

                onClose={()=>{

                    setDialogOpen(false)

                    setOperacao(null)

                }}

            />

        </>

    )

}
