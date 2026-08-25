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
  DialogActions,
  IconButton
} from '@mui/material'

import VisibilityIcon from '@mui/icons-material/Visibility'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import EditIcon from '@mui/icons-material/Edit'


/* ======================================================
   PROPS
====================================================== */

type Props = {
  categorias: any[]
  localizacoes: any[]
  equipamentos: any[]

  onEditar: (equipamento: any) => void

  abrirProfile: (id: number) => void
}


/* ======================================================
   TIPO EQUIPAMENTO
====================================================== */

type Equipamento = {
  equipamento_id: number
  marca: string
  modelo: string
  numero_serie: string
  categoria: string
  estado_actual: string
  codigo_interno: string
  localizacao?: string
  valor?: number
}


/* ======================================================
   COMPONENT
====================================================== */

export default function EquipamentosTable({
  equipamentos,
  categorias,
  localizacoes,
  onEditar,
  abrirProfile
}: Props) {

  const [openQr, setOpenQr] = useState(false)

  const [
    equipamentoSelecionado,
    setEquipamentoSelecionado
  ] = useState<any>(null)

  const [openDetalhes, setOpenDetalhes] =
    useState(false)

  const [
    equipamentosModelo,
    setEquipamentosModelo
  ] = useState<Equipamento[]>([])


  /* ======================================================
     ESTADO → LABEL
  ====================================================== */

  const getEstadoLabel = (
    estado: string
  ) => {

    switch (estado) {

      case 'disponivel':
        return 'Disponível'

      case 'alugado':
        return 'Alugado'

      case 'manutencao':
        return 'Manutenção'

      case 'mantenimiento':
        return 'Manutenção'

      case 'danificado':
        return 'Danificado'

      default:
        return estado

    }

  }


  /* ======================================================
     ABRIR DETALHES DO MODELO
  ====================================================== */

  const abrirDetalhes = async (
    equipamento: any
  ) => {

    try {

      const response = await api.get(
        `/inventario/${equipamento.marca}/${equipamento.modelo}`
      )

      console.log(
        'EQUIPAMENTOS DO MODELO:',
        response.data
      )

      setEquipamentosModelo(
        response.data
      )

      setOpenDetalhes(true)

    } catch (error) {

      console.error(
        'ERRO AO CARREGAR MODELO:',
        error
      )

    }

  }


  /* ======================================================
     QR CODE
  ====================================================== */

  const abrirQr = (
    e: React.MouseEvent,
    equipamento: any
  ) => {

    e.stopPropagation()

    setEquipamentoSelecionado(
      equipamento
    )

    setOpenQr(true)

  }


  /* ======================================================
     PROFILE
  ====================================================== */

  const abrirPerfil = (
    e: React.MouseEvent,
    equipamento: any
  ) => {

    e.stopPropagation()

    if (
      equipamento?.equipamento_id
    ) {

      abrirProfile(
        equipamento.equipamento_id
      )

    }

  }


  /* ======================================================
     RENDER
  ====================================================== */

  return (

    <TableContainer>

      <Table>

        {/* ==================================================
            HEADER
        ================================================== */}

        <TableHead>

          <TableRow>

            <TableCell>
              Equipamento
            </TableCell>

            <TableCell>
              Categoria
            </TableCell>

            <TableCell>
              Valor
            </TableCell>

            <TableCell>
              Quantidade
            </TableCell>

            <TableCell>
              Disponíveis
            </TableCell>

            <TableCell>
              QR
            </TableCell>

            <TableCell align="center">
              Ações
            </TableCell>

          </TableRow>

        </TableHead>


        {/* ==================================================
            BODY
        ================================================== */}

        <TableBody>

          {equipamentos.map(
            (equipamento) => (

              <TableRow

                /*
                 * IMPORTANTE:
                 *
                 * Nunca usar marca + modelo como key.
                 *
                 * Existem vários Yamaha-CL5 e Yamaha-QL1.
                 *
                 * equipamento_id é único.
                 */

                key={
                  equipamento.equipamento_id
                }

                hover

                sx={{
                  cursor: 'pointer'
                }}

                onClick={() =>
                  abrirDetalhes(
                    equipamento
                  )
                }

              >

                {/* ==========================================
                    EQUIPAMENTO
                ========================================== */}

                <TableCell>

                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >

                    <Avatar>

                      <Inventory2Icon />

                    </Avatar>

                    <Box>

                      <Typography
                        fontWeight={600}
                      >

                        {equipamento.marca}
                        {' '}
                        {equipamento.modelo}

                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >

                        {equipamento.codigo_interno}

                      </Typography>

                    </Box>

                  </Box>

                </TableCell>


                {/* ==========================================
                    CATEGORIA
                ========================================== */}

                <TableCell>

                  {equipamento.categoria || '-'}

                </TableCell>


                {/* ==========================================
                    VALOR
                ========================================== */}

                <TableCell>

                  R${' '}

                  {Number(
                    equipamento.valor || 0
                  ).toLocaleString(
                    'pt-BR',
                    {
                      minimumFractionDigits: 2
                    }
                  )}

                </TableCell>


                {/* ==========================================
                    QUANTIDADE
                ========================================== */}

                <TableCell>

                  {equipamento.quantidade ?? 1}

                </TableCell>


                {/* ==========================================
                    DISPONÍVEIS
                ========================================== */}

                <TableCell>

                  {equipamento.disponiveis ?? 0}
                  {' '}
                  disponíveis

                </TableCell>


                {/* ==========================================
                    QR CODE
                ========================================== */}

                <TableCell align="center">

                  <Box

                    sx={{
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}

                    onClick={(e) =>
                      abrirQr(
                        e,
                        equipamento
                      )
                    }

                  >

                    <QRCode

                      size={35}

                      value={
                        `https://tu-dominio.com/equipamento/${equipamento.equipamento_id}`
                      }

                    />

                  </Box>

                </TableCell>


                {/* ==========================================
                    AÇÕES
                ========================================== */}

                <TableCell align="center">

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={1}
                  >

                    {/* EDITAR */}

                    <Button

                      size="small"

                      variant="outlined"

                      startIcon={
                        <EditIcon />
                      }

                      onClick={(e) => {

                        e.stopPropagation()

                        onEditar(
                          equipamento
                        )

                      }}

                    >

                      Editar

                    </Button>


                    {/* PROFILE */}

                    <IconButton

                      color="primary"

                      title="Ver perfil"

                      onClick={(e) =>
                        abrirPerfil(
                          e,
                          equipamento
                        )
                      }

                    >

                      <VisibilityIcon />

                    </IconButton>

                  </Box>

                </TableCell>

              </TableRow>

            )
          )}

        </TableBody>

      </Table>


      {/* ====================================================
          DIALOG QR
      ==================================================== */}

      <Dialog

        open={openQr}

        onClose={() =>
          setOpenQr(false)
        }

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

                value={
                  `https://tu-dominio.com/equipamento/${equipamentoSelecionado.equipamento_id}`
                }

                size={200}

              />


              <Typography
                variant="h6"
              >

                {equipamentoSelecionado.marca}

                {' '}

                {equipamentoSelecionado.modelo}

              </Typography>


              <Typography>

                Código:{' '}

                {
                  equipamentoSelecionado.codigo_interno
                }

              </Typography>


              <Typography>

                Série:{' '}

                {
                  equipamentoSelecionado.numero_serie ||
                  '-'
                }

              </Typography>


              <Typography>

                Estado:{' '}

                {
                  getEstadoLabel(
                    equipamentoSelecionado.estado_actual
                  )
                }

              </Typography>

            </Box>

          )}

        </DialogContent>


        <DialogActions>

          <Button

            onClick={() =>
              window.print()
            }

            variant="contained"

          >

            Imprimir

          </Button>


          <Button

            onClick={() =>
              setOpenQr(false)
            }

          >

            Fechar

          </Button>

        </DialogActions>

      </Dialog>


      {/* ====================================================
          DIALOG DETALHES DO MODELO
      ==================================================== */}

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

          (
          {equipamentosModelo.length}
          )

        </DialogTitle>


        <DialogContent>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>
                  Código
                </TableCell>

                <TableCell>
                  Série
                </TableCell>

                <TableCell>
                  Categoria
                </TableCell>

                <TableCell>
                  Estado
                </TableCell>

                <TableCell>
                  Localização
                </TableCell>

                <TableCell>
                  Valor
                </TableCell>

              </TableRow>

            </TableHead>


            <TableBody>

              {equipamentosModelo.map(
                (equipamento) => (

                  <TableRow

                    /*
                     * Também usamos o ID aqui.
                     */

                    key={
                      equipamento.equipamento_id
                    }

                  >

                    <TableCell>

                      {
                        equipamento.codigo_interno
                      }

                    </TableCell>


                    <TableCell>

                      {
                        equipamento.numero_serie ||
                        '-'
                      }

                    </TableCell>


                    <TableCell>

                      {
                        equipamento.categoria ||
                        '-'
                      }

                    </TableCell>


                    <TableCell>

                      <Chip

                        size="small"

                        label={
                          getEstadoLabel(
                            equipamento.estado_actual
                          )
                        }

                        color={
                          equipamento.estado_actual ===
                            'manutencao' ||
                          equipamento.estado_actual ===
                            'mantenimiento'
                            ? 'error'
                            : equipamento.estado_actual ===
                              'alugado'
                            ? 'warning'
                            : equipamento.estado_actual ===
                              'disponivel'
                            ? 'success'
                            : 'default'
                        }

                      />

                    </TableCell>


                    <TableCell>

                      {
                        equipamento.localizacao ||
                        '-'
                      }

                    </TableCell>


                    <TableCell>

                      R${' '}

                      {Number(
                        equipamento.valor || 0
                      ).toLocaleString(
                        'pt-BR',
                        {
                          minimumFractionDigits: 2
                        }
                      )}

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
