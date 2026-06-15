import {
  TextField
} from '@mui/material'
import Grid from '@mui/material/Grid'

import CategoriaSelect from '../CategoriaSelect'
import MarcaSelect from '../MarcaSelect'
import LocalizacaoSelect from '../LocalizacaoSelect'
import EstadoSelect from '../EstadoSelect'

type Props = {
  form:any
  setForm:any
  categorias:any[]
  marcas:any[]
  localizacoes:any[]
}

export default function NovoEquipamentoForm({
  form,
  setForm,
  categorias,
  marcas,
  localizacoes
}:Props) {

  return (

    <Grid container spacing={2}>

      <Grid size={{ xs:12, md:6 }}>
        <CategoriaSelect
          value={form.categoria_id}
          categorias={categorias}
          onChange={(value)=>
            setForm({
              ...form,
              categoria_id:value
            })
          }
        />
      </Grid>

      <Grid size={{ xs:12, md:6 }}>
        <MarcaSelect
          value={form.marca_id}
          marcas={marcas}
          onChange={(value)=>
            setForm({
              ...form,
              marca_id:value
            })
          }
        />
      </Grid>

      <Grid size={{ xs:12, md:6 }}>
        <LocalizacaoSelect
          value={form.ubicacion_id}
          localizacoes={localizacoes}
          onChange={(value)=>
            setForm({
              ...form,
              ubicacion_id:value
            })
          }
        />
      </Grid>

      <Grid size={{ xs:12, md:6 }}>
        <EstadoSelect
          value={form.estado_actual}
          onChange={(value)=>
            setForm({
              ...form,
              estado_actual:value
            })
          }
        />
      </Grid>

      <Grid size={{ xs:12, md:6 }}>
        <TextField
          fullWidth
          label="Modelo"
          value={form.modelo}
          onChange={(e)=>
            setForm({
              ...form,
              modelo:e.target.value
            })
          }
        />
      </Grid>

      <Grid size={{ xs:12, md:6 }}>
        <TextField
          fullWidth
          label="Número de Série"
          value={form.numero_serie}
          onChange={(e)=>
            setForm({
              ...form,
              numero_serie:e.target.value
            })
          }
        />
      </Grid>

      <Grid size={{ xs:12 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Descrição"
          value={form.descripcion}
          onChange={(e)=>
            setForm({
              ...form,
              descripcion:e.target.value
            })
          }
        />
      </Grid>

      <Grid size={{ xs:12, md:6 }}>
        <TextField
          fullWidth
          type="number"
          label="Valor"
          value={form.valor}
          onChange={(e)=>
            setForm({
              ...form,
              valor:e.target.value
            })
          }
        />
      </Grid>

      <Grid size={{ xs:12, md:6 }}>
        <TextField
          fullWidth
          type="date"
          label="Data Compra"
          InputLabelProps={{
            shrink:true
          }}
          value={form.fecha_compra}
          onChange={(e)=>
            setForm({
              ...form,
              fecha_compra:e.target.value
            })
          }
        />
      </Grid>

    </Grid>

  )

}
