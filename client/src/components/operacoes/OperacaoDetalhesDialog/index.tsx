import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import VisibilityIcon from '@mui/icons-material/Visibility'

import api from '../../../services/api'
import EquipamentoProfileDialog from '../../equipamentos/Profile/EquipamentoProfileDialog'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Paper,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Divider
} from '@mui/material'

type Props = {
  open: boolean
  operacao: any
  onClose: () => void
}

export default function OperacaoDetalhesDialog({
  open,
  operacao,
  onClose
}: Props) {

  if (!operacao) return null
const [profileOpen,setProfileOpen]=useState(false)

const [profile,setProfile]=useState<any>(null)

const abrirEquipamento = async(id:number)=>{

    console.log("ID",id)

    const {data}=await api.get(
        `/equipamentos/${id}/profile`
    )

    console.log(data)

    setProfile(data)

    setProfileOpen(true)

}

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        Operação #{operacao.id}
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={2}
          mb={3}
        >
          <Grid size={{ xs:12, md:6 }}>
            <Paper sx={{ p:2 }}>
              <Typography variant="subtitle2">
                Cliente
              </Typography>
              <Typography>
                {operacao.cliente ?? '-'}
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs:12, md:6 }}>
            <Paper sx={{ p:2 }}>
              <Typography variant="subtitle2">
                Usuário
              </Typography>
              <Typography>
                {operacao.usuario ?? '-'}
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs:12, md:4 }}>
            <Paper sx={{ p:2 }}>
              <Typography variant="subtitle2">
                Tipo
              </Typography>
              <Chip
                label={operacao.tipo}
                color={
                  operacao.tipo === 'saida'
                    ? 'primary'
                    : 'secondary'
                }
              />
            </Paper>
          </Grid>
          <Grid size={{ xs:12, md:4 }}>
            <Paper sx={{ p:2 }}>
              <Typography variant="subtitle2">
                Status
              </Typography>
              <Chip
                label={operacao.status}
                color={
                  operacao.status === 'finalizada'
                    ? 'success'
                    : 'warning'
                }
              />
            </Paper>
          </Grid>
          <Grid size={{ xs:12, md:4 }}>

            <Paper sx={{ p:2 }}>

              <Typography variant="subtitle2">

                Data

              </Typography>

              <Typography>

                {
                  operacao.data_operacao
                    ? new Date(
                        operacao.data_operacao
                      ).toLocaleString()
                    : '-'
                }

              </Typography>

            </Paper>

          </Grid>

        </Grid>

        <Divider sx={{ mb:2 }} />

        <Typography
          variant="h6"
          mb={2}
        >

          Equipamentos

        </Typography>

        <Table size="small">

          <TableHead>

            <TableRow>

              <TableCell>Código</TableCell>

              <TableCell>Modelo</TableCell>

              <TableCell>Marca</TableCell>

              <TableCell>Saída</TableCell>

              <TableCell>Retorno</TableCell>
    <TableCell align="center">

        Perfil

    </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {

              operacao.itens?.map(
                (item:any) => (

                  <TableRow key={item.id} hover>

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

                      <Chip
                        label={item.estado_saida}
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
    <TableCell align="center">

        <Tooltip title="Perfil do Equipamento">

            <IconButton
                color="primary"
                onClick={(e) => {
                  e.stopPropagation()
                    abrirEquipamento(
                        item.equipamento_id
                    )
                }
              }
            >

                <VisibilityIcon/>

            </IconButton>

        </Tooltip>

    </TableCell>
                  </TableRow>

                )

              )

            }

          </TableBody>

        </Table>

        {

          operacao.observacoes && (

            <>

              <Divider sx={{ my:3 }} />

              <Typography
                variant="subtitle2"
              >

                Observações

              </Typography>

              <Typography>

                {operacao.observacoes}

              </Typography>

            </>

          )

        }

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Fechar
        </Button>

      </DialogActions>
<EquipamentoProfileDialog

    open={profileOpen}

    equipamento={profile?.equipamento}

    historico={profile?.historico ?? []}

    analytics={profile?.analytics ?? {}}

    operacoes={profile?.operacoes ?? []}

  onClose={()=>{
    setProfile(null)
    setProfileOpen(false)
  }}

/>
    </Dialog>

  )

}
