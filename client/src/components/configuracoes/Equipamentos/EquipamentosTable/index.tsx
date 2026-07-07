import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  IconButton,
  Tooltip
} from '@mui/material'

import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import HistoryIcon from '@mui/icons-material/History'
import AutorenewIcon from '@mui/icons-material/Autorenew'

type Props = {
  equipos: any[]
  localizacoes?: any[]
  onEditar?: (equipamento: any) => void
  onExcluir?: (equipamento: any) => void
  onDetalhes?: (equipamento: any) => void
  onHistorico?: (equipamento: any) => void
  onEstado?: (equipamento: any) => void
}

export default function EquipamentosTable({

  equipos,
  localizacoes = [],

  onEditar,
  onExcluir,
  onDetalhes,
  onHistorico,
  onEstado

}: Props) {

  const getEstadoColor = (estado: string) => {

    switch (estado) {

      case 'disponivel':
        return 'success'

      case 'alugado':
        return 'primary'

      case 'reservado':
        return 'warning'

      case 'manutencao':
        return 'error'

      default:
        return 'default'

    }

  }

  const getLocalizacao = (id: any) => {

    const local = localizacoes.find(
      l => l.id == id
    )

    return local?.nome || '-'

  }

  return (

    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >

      <TableContainer>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                Código
              </TableCell>

              <TableCell>
                Marca
              </TableCell>

              <TableCell>
                Modelo
              </TableCell>

              <TableCell>
                Série
              </TableCell>

              <TableCell>
                Estado
              </TableCell>

              <TableCell>
                Localização
              </TableCell>

              <TableCell align="right">
                Valor
              </TableCell>

              <TableCell align="center">
                Ações
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {equipos.map((equipamento) => (

              <TableRow
                hover
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
                  {equipamento.numero_serie || '-'}
                </TableCell>

                <TableCell>

                  <Chip
                    size="small"
                    label={equipamento.estado_actual}
                    color={getEstadoColor(
                      equipamento.estado_actual
                    )}
                  />

                </TableCell>

                <TableCell>

                  {getLocalizacao(
                    equipamento.localizacao
                  )}

                </TableCell>

                <TableCell align="right">

                  {equipamento.valor
                    ? Number(
                        equipamento.valor
                      ).toLocaleString(
                        'pt-BR',
                        {
                          style: 'currency',
                          currency: 'BRL'
                        }
                      )
                    : '-'}

                </TableCell>

                <TableCell align="center">

                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                  >

                    <Tooltip title="Detalhes">

                      <IconButton
                        color="primary"
                        onClick={() =>
                          onDetalhes?.(
                            equipamento
                          )
                        }
                      >
                        <VisibilityIcon />
                      </IconButton>

                    </Tooltip>

                    <Tooltip title="Editar">

                      <IconButton
                        color="warning"
                        onClick={() =>
                          onEditar?.(
                            equipamento
                          )
                        }
                      >
                        <EditIcon />
                      </IconButton>

                    </Tooltip>

                    <Tooltip title="Alterar Estado">

                      <IconButton
                        color="secondary"
                        onClick={() =>
                          onEstado?.(
                            equipamento
                          )
                        }
                      >
                        <AutorenewIcon />
                      </IconButton>

                    </Tooltip>

                    <Tooltip title="Histórico">

                      <IconButton
                        color="info"
                        onClick={() =>
                          onHistorico?.(
                            equipamento
                          )
                        }
                      >
                        <HistoryIcon />
                      </IconButton>

                    </Tooltip>

                    <Tooltip title="Excluir">

                      <IconButton
                        color="error"
                        onClick={() => {

                          if (
                            window.confirm(
                              `Excluir ${equipamento.codigo_interno}?`
                            )
                          ) {

                            onExcluir?.(
                              equipamento
                            )

                          }

                        }}
                      >
                        <DeleteIcon />
                      </IconButton>

                    </Tooltip>

                  </Stack>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Paper>

  )

}
