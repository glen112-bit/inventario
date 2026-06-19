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
  InputLabel
} from '@mui/material'
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

  if (!aluguel) return null

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
            <FormControl fullWidth>

              <InputLabel>
                Equipamentos
              </InputLabel>

              <Select
                multiple
                value={form.equipamentos}
                label="Equipamentos"
                onChange={(e)=>
                  setForm({
                    ...form,
                    equipamentos:e.target.value as number[]
                  })
                }
                renderValue={(selected)=>
                  equipamentos
                    .filter(eq =>
                      selected.includes(eq.equipamento_id)
                    )
                    .map(eq =>
                      `${eq.marca} ${eq.modelo}`
                    )
                    .join(', ')
                }
              >

                {equipamentos.map(equipamento => (

                  <MenuItem
                    key={equipamento.equipamento_id}
                    value={equipamento.equipamento_id}
                  >

                    <Checkbox
                      checked={
                        form.equipamentos.includes(
                          equipamento.equipamento_id
                        )
                      }
                    />

                    <ListItemText
                      primary={`${equipamento.marca} ${equipamento.modelo}`}
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

    console.log('DADOS A ENVIAR', dados)
    console.log('ARRAY?', Array.isArray(dados))

    onSalvar(dados)
            }
          }
        >
          Salvar
        </Button>

      </DialogActions>

    </Dialog>

  )
}
