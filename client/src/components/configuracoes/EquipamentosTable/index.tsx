import React, { useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box
} from '@mui/material'
import QRCode from 'react-qr-code'

import EditIcon from '@mui/icons-material/Edit'

type Equipo = {
  equipamento_id:number
  marca:string
  modelo:string
  estado:string
  descripcion:string
  localizacao:string
  valor:number
}

type Props = {
  equipos:Equipo[]
  localizacao?: any[]
  onEditar?:(equipo:Equipo)=>void
}

export default function EquipamentosTable({
  equipos,
  localizacoes,
  onEditar
}:Props){



  const [openQr, setOpenQr] = useState(false)
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState<any>(null)

  return (
    <>
      <Paper
        sx={{
          borderRadius:1,
          border:'1px solid',
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            overflow:'hidden'
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Marca
                </TableCell>
                <TableCell>
                  Modelo 
                </TableCell>
                <TableCell>
                  Estado
                </TableCell>
                <TableCell>
                  Descicao 
                </TableCell>
                <TableCell>
                  Localizacao
                </TableCell>
                <TableCell>
                  Valor
                </TableCell>
                <TableCell>
                  Qr
                </TableCell>
                <TableCell>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {equipos.map(equipo => (
                <TableRow
                  hover
                  key={equipo.equipamento_id}
                >
                  <TableCell>
                    {equipo.marca}
                  </TableCell>
                  <TableCell>
                    {equipo.modelo}
                  </TableCell>
                  <TableCell>
                    {equipo.estado}
                  </TableCell>
                  <TableCell>
                    {equipo.descripcion}
                  </TableCell>
                  <TableCell>
                    {equipo.localizacao}
                  </TableCell>
                  <TableCell>
                    {equipo.valor}
                  </TableCell>

                  <TableCell align="center">
                    <Box
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        setEquipamentoSelecionado(equipo)
                        setOpenQr(true)
                      }}
                    >
                          <QRCode
                            size={35}
                            value={`${import.meta.env.VITE_APP_URL}/inventario/${equipo.equipamento_id}`}
                          />
                    </Box>

                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => onEditar?.(equipo)}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          open={openQr}
          onClose={() => setOpenQr(false)}
        >
          <DialogTitle>
            QR Code
          </DialogTitle>

          <DialogContent>
            {equipamentoSelecionado && (
              <Box display="flex" justifyContent="center" flexDirection="column">
                <QRCode
                  size={200}
                  value={`${import.meta.env.VITE_APP_URL}/inventario/${equipamentoSelecionado?.equipamento_id ?? ''}`}
                />

                <Box textAlign="center">

                  <strong>
                    {equipamentoSelecionado.marca}
                    {' '}
                    {equipamentoSelecionado.modelo}
                  </strong>

                  <br />

                  Código:
                  {' '}
                  {equipamentoSelecionado.equipamento_id}

                  <br />

                  Estado:
                  {' '}
                  {equipamentoSelecionado.estado_actual}

                  <br />

                  Localização:
                  {' '}
                  {equipamentoSelecionado.localizacao}

                  <br />

                  Valor:
                  {' '}
                  R$
                  {' '}
                  {Number(
                    equipamentoSelecionado.valor
                  ).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2
                  })}

                </Box>
              </Box>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenQr(false)}>
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </>
  )
}

