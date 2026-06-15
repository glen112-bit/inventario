import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

type Props = {
  value: number | string
  marcas: any[]
  onChange: (value:any) => void
}

export default function MarcaSelect({
  value,
  marcas,
  onChange
}: Props) {

  return (

    <FormControl
      fullWidth
      margin="normal"
    >

      <InputLabel>
        Marca
      </InputLabel>

      <Select
        value={value}
        label="Marca"
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
      >

        {
          marcas.map(
            marca => (

              <MenuItem
                key={marca.id}
                value={marca.id}
              >
                {marca.nombre}
              </MenuItem>

            )
          )
        }

      </Select>

    </FormControl>

  )

}
