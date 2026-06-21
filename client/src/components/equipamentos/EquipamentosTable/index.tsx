import React, { useState } from 'react'
import QRCode from 'react-qr-code'
import api from '../../../services/api'
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
  categorias:any[]
  localizacoes:any[]
  equipamentos:any[]
  onEditar:(equipos:any)=>void
}
type Equipamento = {
  equipamento_id:number
  marca:string
  modelo:string
  numero_serie:string
  categoria:string
  estado_actual:string
  codigo_interno:string
  localizacao?:string
}
export default function EquipamentosTable({
  equipamentos,
  categorias,
  localizacoes,
  onEditar
}:Props) {

  const [openQr, setOpenQr] = useState(false)
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState<any>(null)
  const [openDetalhes, setOpenDetalhes] = useState(false)
  const [equipamentosModelo, setEquipamentosModelo] = useState<Equipamento[]>([])

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
  const abrirDetalhes = async (equipamento:any) => {
    console.log('detalle', equipamento)
    try {

      const response = await api.get(
        `/inventario/${equipamento.marca}/${equipamento.modelo}`
      )
      console.log('response', response.data)
      setEquipamentosModelo(
        response.data
      )
      setOpenDetalhes(true)
    } catch(error) {
      console.error(error)
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
              Valor
            </TableCell>


            <TableCell>
             Quantidade 
            </TableCell>

            <TableCell>
              Disponiveis
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
                key={`${equipos.marca}-${equipos.modelo}`}
                hover
                sx={{ cursor:'pointer' }}
                onClick={() => abrirDetalhes(equipos)}
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
                      {equipos.marca} 
                      {equipos.modelo}
                    </Typography>

                  </Box>

                </TableCell>
                <TableCell>
                  {equipos.categoria}
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
                  {equipos.quantidade}
                </TableCell>

                <TableCell>
                  {equipos.disponiveis} disponíveis
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation()
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
                    onClick={(e) =>{
                      e.stopPropagation()
                      onEditar(equipos)
                    }
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
      <Dialog
        open={openDetalhes}
        onClose={() =>
            setOpenDetalhes(false)
        }
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {equipamentosModelo[0]?.marca}
          {' '}
          {equipamentosModelo[0]?.modelo}
          {' '}
          ({equipamentosModelo.length})
        </DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Série</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Localização</TableCell>
                <TableCell>Valor</TableCell>  
              </TableRow>
            </TableHead>
            <TableBody>
              {equipamentosModelo.map(
                equipamento => (
                  <TableRow
                    key={ equipamento.equipamento_id }
                  >
                    <TableCell>
                      { equipamento.codigo_interno }
                    </TableCell>
                    <TableCell>
                      { equipamento.numero_serie }
                    </TableCell>
                    <TableCell>
                      {equipamento.categoria}
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={
                          getEstadoLabel(
                            equipamento.estado_actual
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      { equipamento.localizacao }
                    </TableCell>
                    <TableCell>
                      R$ {
                        Number(
                          equipamento.valor
                        ).toLocaleString(
                          'pt-BR',
                          {
                            minimumFractionDigits: 2
                          }
                        )
                      }
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>

          </Table>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() =>
                setOpenDetalhes(false)
            }
          >
            Fechar
          </Button>

        </DialogActions>

      </Dialog>
    </TableContainer>

  )

}
