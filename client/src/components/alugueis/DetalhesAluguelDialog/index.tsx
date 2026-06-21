import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'

type Props = {
  open:boolean
  onClose:() => void
  aluguel:any
  alugueis:any[]
  onDetalhes:(aluguel:any)=>void
  onEditar:(aluguel:any)=>void
  onFinalizar?:(aluguel:any)=>void
}

export default function DetalhesAluguelDialog({
  open,
  onClose,
  aluguel,
}:Props){

  // console.log(aluguel)
  // if (!aluguel) return null
  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        Detalhes do Aluguel #{aluguel.id}
      </DialogTitle>

      <DialogContent>

        <Grid container spacing={2} sx={{ mb: 3 }}>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              <strong>Cliente:</strong> {aluguel.cliente}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              <strong>Estado:</strong> {aluguel.estado}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              <strong>Saída:</strong> {aluguel.fecha_salida}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              <strong>Retorno:</strong> {aluguel.fecha_retorno}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography>
              <strong>Observações:</strong>
            </Typography>

            <Paper sx={{ p: 2, mt: 1 }}>
              {aluguel.observacoes || 'Sem observações'}
            </Paper>
          </Grid>

        </Grid>

        <Typography
          variant="h6"
          sx={{ mb: 2 }}
        >
          Equipamentos
        </Typography>

        <Table size="small">

          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {aluguel.equipamentos?.map((equipamento: any) => (

              <TableRow
                key={equipamento.equipamento_id}
              >
                <TableCell>
                  {equipamento.codigo_interno}
                </TableCell>

                <TableCell>
                  {equipamento.marca}
                </TableCell>

                <TableCell>
                  {equipamento.modelo}
                </TableCell>

                <TableCell>
                  {equipamento.estado_actual}
                </TableCell>

                {/*
                    <TableCell>
                    <IconButton
                    color="primary"
                    onClick={() => onDetalhes(item)}
                    >
                    <VisibilityIcon />
                    </IconButton>

                    <IconButton
                    color="warning"
                    onClick={() => onEditar(item)}
                    >
                    <EditIcon />
                    </IconButton>

                    {item.estado === 'ativo' && (
                    <IconButton
                    color="success"
                    onClick={() => onFinalizar?.(item)}
                    >
                    <CheckCircleIcon />
                    </IconButton>
                    )}
                    </TableCell>
                  */}
              </TableRow>
            ))}

          </TableBody>

        </Table>

      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Fechar
        </Button>
      </DialogActions>

    </Dialog>
  )

}
