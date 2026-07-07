import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem
} from '@mui/material'

type Props = {
  open: boolean
  equipamento?: any
  categorias?: any[]
  marcas?: any[]
  localizacoes?: any[]
  onClose: () => void
  onSalvar: (dados: any) => void
}

export default function EquipamentoDialog({
  open,
  equipamento,
  categorias = [],
  marcas = [],
  localizacoes = [],
  onClose,
  onSalvar
}: Props) {

  const [form, setForm] = useState({

    codigo_interno: '',
    numero_serie: '',

    categoria_id: '',
    marca_id: '',
    localizacao: '',

    modelo: '',
    descricao: '',

    valor: '',
    fecha_compra: '',

    estado_actual: 'disponivel',

    observacoes: ''

  })

  useEffect(() => {

    if (equipamento) {

      setForm({

        codigo_interno: equipamento.codigo_interno || '',
        numero_serie: equipamento.numero_serie || '',

        categoria_id: equipamento.categoria_id || '',
        marca_id: equipamento.marca_id || '',
        localizacao: equipamento.localizacao || '',

        modelo: equipamento.modelo || '',
        descricao: equipamento.descripcion || equipamento.descricao || '',

        valor: equipamento.valor || '',
        fecha_compra: equipamento.fecha_compra
          ? equipamento.fecha_compra.substring(0, 10)
          : '',

        estado_actual: equipamento.estado_actual || 'disponivel',

        observacoes: equipamento.observacoes || ''

      })

    } else {

      limparFormulario()

    }

  }, [equipamento, open])

  const limparFormulario = () => {

    setForm({

      codigo_interno: '',
      numero_serie: '',

      categoria_id: '',
      marca_id: '',
      localizacao: '',

      modelo: '',
      descricao: '',

      valor: '',
      fecha_compra: '',

      estado_actual: 'disponivel',

      observacoes: ''

    })

  }

  const salvar = () => {

    if (!form.codigo_interno.trim()) {

      alert('Informe o código interno.')

      return

    }

    if (!form.modelo.trim()) {

      alert('Informe o modelo.')

      return

    }

    if (!form.categoria_id) {

      alert('Selecione uma categoria.')

      return

    }

    if (!form.marca_id) {

      alert('Selecione uma marca.')

      return

    }

    onSalvar(form)

    limparFormulario()

  }

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>

        {equipamento
          ? 'Editar Equipamento'
          : 'Novo Equipamento'}

      </DialogTitle>

      <DialogContent>

        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
        >

          <Grid size={{ xs: 12, md: 6 }}>

            <TextField
              fullWidth
              label="Código Interno"
              value={form.codigo_interno}
              onChange={(e) =>
                setForm({
                  ...form,
                  codigo_interno: e.target.value
                })
              }
            />

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <TextField
              fullWidth
              label="Número de Série"
              value={form.numero_serie}
              onChange={(e) =>
                setForm({
                  ...form,
                  numero_serie: e.target.value
                })
              }
            />

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <TextField
              select
              fullWidth
              label="Categoria"
              value={form.categoria_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  categoria_id: e.target.value
                })
              }
            >

              {categorias.map((categoria) => (

                <MenuItem
                  key={categoria.id}
                  value={categoria.id}
                >
                  {categoria.nome}
                </MenuItem>

              ))}

            </TextField>

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <TextField
              select
              fullWidth
              label="Marca"
              value={form.marca_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  marca_id: e.target.value
                })
              }
            >

              {marcas.map((marca) => (

                <MenuItem
                  key={marca.id}
                  value={marca.id}
                >
                  {marca.nome}
                </MenuItem>

              ))}

            </TextField>

          </Grid>

          <Grid size={{ xs: 12 }}>

            <TextField
              fullWidth
              label="Modelo"
              value={form.modelo}
              onChange={(e) =>
                setForm({
                  ...form,
                  modelo: e.target.value
                })
              }
            />

          </Grid>

          <Grid size={{ xs: 12 }}>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Descrição"
              value={form.descricao}
              onChange={(e) =>
                setForm({
                  ...form,
                  descricao: e.target.value
                })
              }
            />

          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>

            <TextField
              fullWidth
              type="number"
              label="Valor"
              value={form.valor}
              onChange={(e) =>
                setForm({
                  ...form,
                  valor: e.target.value
                })
              }
            />

          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>

            <TextField
              fullWidth
              type="date"
              label="Data da Compra"
              InputLabelProps={{
                shrink: true
              }}
              value={form.fecha_compra}
              onChange={(e) =>
                setForm({
                  ...form,
                  fecha_compra: e.target.value
                })
              }
            />

          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>

            <TextField
              select
              fullWidth
              label="Localização"
              value={form.localizacao}
              onChange={(e) =>
                setForm({
                  ...form,
                  localizacao: e.target.value
                })
              }
            >

              {localizacoes.map((local) => (

                <MenuItem
                  key={local.id}
                  value={local.id}
                >
                  {local.nome}
                </MenuItem>

              ))}

            </TextField>

          </Grid>

          <Grid size={{ xs: 12 }}>

            <TextField
              select
              fullWidth
              label="Estado"
              value={form.estado_actual}
              onChange={(e) =>
                setForm({
                  ...form,
                  estado_actual: e.target.value
                })
              }
            >

              <MenuItem value="disponivel">
                Disponível
              </MenuItem>

              <MenuItem value="alugado">
                Alugado
              </MenuItem>

              <MenuItem value="reservado">
                Reservado
              </MenuItem>

              <MenuItem value="manutencao">
                Manutenção
              </MenuItem>

            </TextField>

          </Grid>

          <Grid size={{ xs: 12 }}>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Observações"
              value={form.observacoes}
              onChange={(e) =>
                setForm({
                  ...form,
                  observacoes: e.target.value
                })
              }
            />

          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={() => {

            limparFormulario()

            onClose()

          }}
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
