import React, { useState } from 'react'
import QRCode from 'react-qr-code'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'

import Inventory2Icon from '@mui/icons-material/Inventory2'
import EditIcon from '@mui/icons-material/Edit'

type Props = {
  equipamentos:any[]
  categorias:any[]
  localizacoes:any[]
  onEditar:(equipos:any)=>void
}

export default function EquipamentosTable({
  equipamentos,
  categorias,
  localizacoes,
  onEditar
}:Props) {
  const [openQr, setOpenQr] = useState(false)
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState<any>(null)

  const getCategoriaNome = (
    id:number
  ) => {

    const categoria =
      categorias.find(
        c => c.id === id
    )

    return categoria?.nombre || '-'

  }

  const getLocalizacaoNome = (
    id:number
  ) => {

    const localizacao =
      localizacoes.find(
        l => l.id === id
    )

    return localizacao?.nombre || '-'

  }

  const getEstadoLabel = (
    estado:string
  ) => {

    switch(estado){

      case 'disponivel':
        return 'Disponível'

      case 'alugado':
        return 'Alugado'

      case 'manutencao':
        return 'Manutenção'

      case 'danificado':
        return 'Danificado'

      default:
        return estado

    }

  }

  return (

    <TableContainer>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              Equipamento
            </TableCell>

            <TableCell>
              Série
            </TableCell>

            <TableCell>
              Categoria
            </TableCell>

            <TableCell>
              Marca
            </TableCell>

            <TableCell>
              Localização
            </TableCell>

            <TableCell>
              Valor
            </TableCell>

            <TableCell>
              Status
            </TableCell>
            <TableCell>
              QR
            </TableCell>
            <TableCell align="center">
              Ações
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {equipamentos.map(
            equipos => (

              <TableRow
                hover
                key={
                  equipos.equipamento_id
                }
              >

                <TableCell>

                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >

                    <Avatar>

                      <Inventory2Icon />

                    </Avatar>

                    <Typography
                      fontWeight={600}
                    >
                      {equipos.marca} {equipos.modelo}
                    </Typography>

                  </Box>

                </TableCell>

                <TableCell>
                  {equipos.numero_serie}
                </TableCell>

                <TableCell>
                  {
                    getCategoriaNome(
                      equipos.categoria_id
                    )
                  }
                </TableCell>

                <TableCell>
                  {equipos.marca}
                </TableCell>

                <TableCell>
                  {
                    getLocalizacaoNome(
                      equipos.localizacao
                    )
                  }
                </TableCell>

                <TableCell>

                  R$ {
                    Number(
                      equipos.valor
                    ).toLocaleString(
                    'pt-BR',
                    {
                      minimumFractionDigits:2
                    }
                    )
                  }

                </TableCell>

                <TableCell>
                  <Chip
                    size="small"
                    variant="outlined"
                    label={
                      getEstadoLabel(
                        equipos.estado_actual
                    )
                    }
                  />
                </TableCell>

                <TableCell align="center">
                  <Box
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      setEquipamentoSelecionado(equipos)
                      setOpenQr(true)
                    }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <QRCode size={35} value={`https://tu-dominio.com/equipamento/${equipos.equipamento_id }`}/>
                  </Box>

                </TableCell>

                <TableCell align="center">

                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() =>
                      onEditar(equipos)
                    }
                  >
                    Editar
                  </Button>

                </TableCell>
              </TableRow>

            )
          )}

        </TableBody>

      </Table>
      <Dialog
        open={openQr}
        onClose={() => setOpenQr(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Etiqueta do Equipamento
        </DialogTitle>

        <DialogContent>

          {equipamentoSelecionado && (

            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
              py={2}
            >

              <QRCode
                value={`https://tu-dominio.com/equipamento/${equipamentoSelecionado.equipamento_id}`}
                size={200}
              />

              <Typography variant="h6">
                {equipamentoSelecionado.marca}
                {' '}
                {equipamentoSelecionado.modelo}
              </Typography>

              <Typography>
                Código: {equipamentoSelecionado.codigo_interno}
              </Typography>

              <Typography>
                Série: {equipamentoSelecionado.numero_serie}
              </Typography>

              <Typography>
                Estado: {equipamentoSelecionado.estado_actual}
              </Typography>

            </Box>

          )}

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() => window.print()}
            variant="contained"
          >
            Imprimir
          </Button>

          <Button
            onClick={() => setOpenQr(false)}
          >
            Fechar
          </Button>

        </DialogActions>

      </Dialog>

    </TableContainer>

  )

}
