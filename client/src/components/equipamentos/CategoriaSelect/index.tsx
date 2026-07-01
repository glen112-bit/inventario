import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material'

type Props = {
  value: number | string
  categorias: any[]
  onChange: (value: any) => void
  onNovaCategoria:() => void
}

export default function CategoriaSelect({
  value,
  categorias,
  onChange,
  onNovaCategoria
}: Props) {

  return (

    <FormControl
      fullWidth
      margin="normal"
    >

      <InputLabel>
        Categoria
      </InputLabel>

      <Select
        value={value ?? ''}
        label="Categoria"
        onChange={(e) => {
          if(e.target.value === '__nova_categoria__'){
            onNovaCategoria()
            return
          }
          onChange(
            e.target.value
          )
        }
        }
      >

        {
          categorias.map((categoria) => (
                <MenuItem
                  key={categoria.id}
                  value={categoria.id}
                >
                  {categoria.nome}
                </MenuItem>

            )

          )

        }
        <MenuItem
          value="__nova_categoria__"
        >
          ➕ Cadastrar nova categoria
        </MenuItem>

      </Select>

    </FormControl>

  )

}
