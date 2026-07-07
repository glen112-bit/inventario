import {
  Grid,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  Select
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'

type Props = {
  form: any
  setForm: any
  clientes: any[]
  equipamentos: any[]
}

export default function AluguelForm({
  form,
  setForm,
  clientes,
  equipamentos
}: Props) {

  const removerEquipamento = (
    equipamentoId:number
  ) => {

    setForm((prev:any)=>({

      ...prev,

      equipamentos:
        prev.equipamentos.filter(
          (id:number)=>id!==equipamentoId
        )

    }))

  }

  const equipamentosSelecionados =
    equipamentos.filter(eq =>
      form.equipamentos.includes(
        eq.equipamento_id
      )
    )

  return (

    <Grid
      container
      spacing={3}
      sx={{ mt:1 }}
    >

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

          {clientes.map(cliente=>(

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
                .filter(eq=>
                  selected.includes(
                    eq.equipamento_id
                  )
                )
                .map(eq=>
                  `${eq.codigo_interno} - ${eq.modelo}`
                )
                .join(', ')

            }
          >

            {equipamentos
              .filter(eq=>

                eq.estado_actual==='disponivel'

                ||

                form.equipamentos.includes(
                  eq.equipamento_id
                )

              )
              .map(eq=>(

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
                    primary={`${eq.codigo_interno} • ${eq.marca} ${eq.modelo}`}
                  />

                </MenuItem>

              ))}

          </Select>

        </FormControl>

      </Grid>

      <Grid size={{ xs:12 }}>

        <Typography
          variant="h6"
          sx={{ mb:2 }}
        >
          Equipamentos Selecionados
        </Typography>

        <Paper variant="outlined">

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

                <TableCell width={80}>
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {equipamentosSelecionados.map(eq=>(

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
                      onClick={()=>
                        removerEquipamento(
                          eq.equipamento_id
                        )
                      }
                    >
                      <DeleteIcon/>
                    </IconButton>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </Paper>

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

  )

}
