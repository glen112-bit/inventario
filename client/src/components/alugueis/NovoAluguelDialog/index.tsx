import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel
} from '@mui/material'
import { useState } from 'react'

type Props = {
  open:boolean
  onClose:() => void
  clientes:any[]
  equipamentos:any[]
  onSalvar:(dados:any)=>void
}

export default function NovoAluguelDialog({
  open,
  onClose,
  clientes,
  equipamentos,
  onSalvar
}:Props){
  // console.log(equipamentos)
  const [form,setForm] = useState({
    cliente_id:'',
    equipamentos: [] as number[],
    fecha_salida:'',
    fecha_retorno:'',
    observacoes:''
  })

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>
        Novo Aluguel
      </DialogTitle>

      <DialogContent>

        <Grid container spacing={2} sx={{ mt:1 }}>

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
          <Grid size={{xs:12}}>
            <FormControl fullWidth>
              <InputLabel>Equipamentos</InputLabel>

              <Select
                multiple
                value={form.equipamentos}
                label="Equipamentos"
                onChange={(e) =>
                  setForm({
                  ...form,
                  equipamentos: e.target.value as number[]
                })
                }
                renderValue={(selected) =>
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
                {equipamentos
                  .filter(
                    e => e.estado_actual === 'disponivel'
                  )
                  .map(equipamento => (
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
              InputLabelProps={{
                shrink:true
              }}
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
              InputLabelProps={{
                shrink:true
              }}
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
          onClick={() => {
            if(!form.cliente_id){
              alert('Seleccione um cliente')
              return
            }
            if(!form.fecha_salida || !form.fecha_retorno) {
              alert("Informe Datas")
              return
            }
            if(form.equipamentos.length === 0) {
              alert('Seleccione um equipamento')
              return
            }
            onSalvar({
              id: aluguel.id,
              ...form
            })
          }
          }
        >
          Salvar
        </Button>

      </DialogActions>

    </Dialog>

  )

}
