import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material'

type Props = {
  open:boolean
  aluguel:any
  equipamentos:any[]
  complemento?:any
  onClose:()=>void
  onSalvar:(dados:any)=>void
}

export default function ComplementoDialog({

  open,
  aluguel,
 equipamentos = [],
  complemento,
  onClose,
  onSalvar

}:Props){

  const [form,setForm] = useState({

    fecha_salida:'',
    fecha_retorno:'',
    observacoes:'',
    equipamentos:[] as number[]

  })

  useEffect(()=>{

    if(complemento){

      setForm({

        fecha_salida:
          complemento.fecha_salida?.substring(0,10) || '',

        fecha_retorno:
          complemento.fecha_retorno?.substring(0,10) || '',

        observacoes:
          complemento.observacoes || '',

        equipamentos:
          complemento.equipamentos?.map(
            (e:any)=>e.equipamento_id
          ) || []

      })

    }else{

      setForm({

        fecha_salida:'',
        fecha_retorno:'',
        observacoes:'',
        equipamentos:[]

      })

    }

  },[complemento,open])

  const selecionarEquipamento = (
    equipamentoId:number
  )=>{

    setForm(prev=>({

      ...prev,

      equipamentos: prev.equipamentos.includes(
        equipamentoId
      )

      ? prev.equipamentos.filter(
          id=>id!==equipamentoId
        )

      : [

          ...prev.equipamentos,

          equipamentoId

        ]

    }))

  }

  const salvar=()=>{

    if(form.equipamentos.length===0){

      alert(
        'Selecione pelo menos um equipamento.'
      )

      return

    }

    onSalvar({

      ...form,

      aluguel_id: aluguel.id

    })

  }

  return(

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>

        {

          complemento

          ? 'Editar Complemento'

          : 'Novo Complemento'

        }

      </DialogTitle>

      <DialogContent>

        <Grid
          container
          spacing={2}
          sx={{mt:1}}
        >

          <Grid size={{xs:12,md:6}}>

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

          <Grid size={{xs:12,md:6}}>

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

          <Grid size={{xs:12}}>

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

          <Grid size={{xs:12}}>

            <Typography
              variant="h6"
              mb={1}
            >

              Equipamentos

            </Typography>

            <List>

              {

                equipamentos.map(

                  (equipamento:any)=>(

                    <ListItem
                      disablePadding
                      key={
                        equipamento.equipamento_id
                      }
                    >

                      <ListItemButton
                        onClick={()=>

                          selecionarEquipamento(

                            equipamento.equipamento_id

                          )

                        }
                      >

                        <Checkbox
                          checked={
                            form.equipamentos.includes(

                              equipamento.equipamento_id

                            )
                          }
                        />

                        <ListItemText

                          primary={`${equipamento.codigo_interno} - ${equipamento.modelo}`}

                          secondary={
                            equipamento.marca
                          }

                        />

                      </ListItemButton>

                    </ListItem>

                  )

                )

              }

            </List>

          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={salvar}
        >
          Salvar
        </Button>

      </DialogActions>

    </Dialog>

  )

}
