import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Paper
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect, useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  aluguel: any
  clientes: any[]
  equipamentos: any[]
  onSalvar: (dados:any) => void
}

export default function EditarAluguelDialog({
  open,
  onClose,
  aluguel,
  clientes,
  equipamentos,
  onSalvar
}: Props) {

  const [form, setForm] = useState({
    cliente_id: '',
    fecha_salida: '',
    fecha_retorno: '',
    observacoes: '',
    equipamentos: [] as number[]
  })

  useEffect(() => {

    if (!aluguel) return

      setForm({
        cliente_id: aluguel.cliente_id || '',
        fecha_salida: aluguel.fecha_salida?.substring(0,10) || '',
        fecha_retorno: aluguel.fecha_retorno?.substring(0,10) || '',
        observacoes: aluguel.observacoes || '',
        equipamentos:
          aluguel.equipamentos?.map(
            (e:any) => e.equipamento_id
        ) || []
      })

  }, [aluguel])

  const equipamentosSelecionados = equipamentos.filter(
    eq => form.equipamentos.includes(
      eq.equipamento_id
    )
  )

  if (!aluguel) return null
    const removerEquipamento = (
      equipamentoId:number
    ) => {

      setForm(prev => ({
        ...prev,
        equipamentos: prev.equipamentos.filter(
          id => id !== equipamentoId
        )
      }))

    }
    return (

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
      >

        <DialogTitle>
          Editar Aluguel #{aluguel.id}
        </DialogTitle>

        <DialogContent>

          <Grid container spacing={2} sx={{ mt: 1 }}>

            <Grid size={{ xs:12 }}>
              <TextField
                select
                fullWidth
                label="Cliente"
                value={form.cliente_id}
                onChange={(e)=>
                  setForm({
                  ...form,
                  cliente_id:e.target.value
                })
                }
              >
                {clientes.map(cliente => (
                  <MenuItem
                    key={cliente.id}
                    value={cliente.id}
                  >
                    {cliente.nome}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs:12 }}>

              <Typography
                variant="h6"
                sx={{ mb: 2 }}
              >
                Equipamentos do Aluguel
              </Typography>

              <Paper
                variant="outlined"
                sx={{ mb: 3 }}
              >

                <Table size="small">

                  <TableHead>
                    <TableRow>
                      <TableCell>Código</TableCell>
                      <TableCell>Marca</TableCell>
                      <TableCell>Modelo</TableCell>
                      <TableCell width={80}>
                        Ações
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>

                    {equipamentosSelecionados.map(eq => (

                      <TableRow
                        key={eq.equipamento_id}
                      >

                        <TableCell>
                          {eq.codigo_interno}
                        </TableCell>

                        <TableCell>
                          {eq.marca}
                        </TableCell>

                        <TableCell>
                          {eq.modelo}
                        </TableCell>

                        <TableCell>

                          <IconButton
                            color="error"
                            onClick={() =>
                              removerEquipamento(
                                eq.equipamento_id
                            )
                            }
                          >
                            <DeleteIcon />
                          </IconButton>

                        </TableCell>

                      </TableRow>

                    ))}

                  </TableBody>

                </Table>

              </Paper>

              <FormControl fullWidth>

                <InputLabel>
                  Adicionar Equipamentos
                </InputLabel>

                <Select
                  multiple
                  value={form.equipamentos}
                  label="Adicionar Equipamentos"
                  onChange={(e)=>
                    setForm({
                    ...form,
                    equipamentos:
                      e.target.value as number[]
                  })
                  }
                  renderValue={(selected)=>
                    equipamentos
                  .filter(eq =>
                          selected.includes(
                            eq.equipamento_id
                  )
                         )
                         .map(eq =>
                              `${eq.codigo_interno} - ${eq.modelo}`
                             )
                             .join(', ')
                  }
                >

                  {equipamentos
                    .filter(
                      eq =>
                        eq.estado_actual ===
                        'disponivel'
                      ||
                        form.equipamentos.includes(
                          eq.equipamento_id
                      )
                    )
                    .map(eq => (

                      <MenuItem
                        key={eq.equipamento_id}
                        value={eq.equipamento_id}
                      >

                        <Checkbox
                          checked={
                            form.equipamentos.includes(
                              eq.equipamento_id
                          )
                          }
                        />

                        <ListItemText
                          primary={`${eq.codigo_interno} - ${eq.marca} ${eq.modelo}`}
                        />

                      </MenuItem>

                    ))}

                </Select>

              </FormControl>

            </Grid>

            <Grid size={{ xs:12, md:6 }}>
              <TextField
                fullWidth
                type="date"
                label="Saída"
                InputLabelProps={{ shrink:true }}
                value={form.fecha_salida}
                onChange={(e)=>
                  setForm({
                  ...form,
                  fecha_salida:e.target.value
                })
                }
              />
            </Grid>

            <Grid size={{ xs:12, md:6 }}>
              <TextField
                fullWidth
                type="date"
                label="Retorno"
                InputLabelProps={{ shrink:true }}
                value={form.fecha_retorno}
                onChange={(e)=>
                  setForm({
                  ...form,
                  fecha_retorno:e.target.value
                })
                }
              />
            </Grid>

            <Grid size={{ xs:12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Observações"
                value={form.observacoes}
                onChange={(e)=>
                  setForm({
                  ...form,
                  observacoes:e.target.value
                })
                }
              />
            </Grid>

          </Grid>

        </DialogContent>

        <DialogActions>

          <Button onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() =>{
              const dados = {
                id: aluguel.id,
                ...form
              }
              onSalvar(dados)
              onClose()
            }
            }
          >
            Salvar
          </Button>

        </DialogActions>

      </Dialog>

    )
}
