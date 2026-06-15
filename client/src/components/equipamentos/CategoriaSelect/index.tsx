import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

type Props = {
  value: number | string
  categorias: any[]
  onChange: (value: any) => void
}

export default function CategoriaSelect({
  value,
  categorias,
  onChange
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
        value={value}
        label="Categoria"
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
      >

        {
          categorias.map(
            categoria => (

              <MenuItem
                key={categoria.id}
                value={categoria.id}
              >
                {categoria.nombre}
              </MenuItem>

            )
          )
        }

      </Select>

    </FormControl>

  )

}
