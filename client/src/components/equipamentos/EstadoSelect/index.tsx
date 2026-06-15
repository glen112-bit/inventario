import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

type Props = {
  value: string
  onChange: (value:string) => void
}

export default function EstadoSelect({
  value,
  onChange
}: Props) {

  return (

    <FormControl
      fullWidth
      margin="normal"
    >

      <InputLabel>
        Estado
      </InputLabel>

      <Select
        value={value}
        label="Estado"
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
      >

        <MenuItem value="disponivel">
          Disponível
        </MenuItem>

        <MenuItem value="alugado">
          Alugado
        </MenuItem>

        <MenuItem value="manutencao">
          Manutenção
        </MenuItem>

        <MenuItem value="danificado">
          Danificado
        </MenuItem>

      </Select>

    </FormControl>

  )

}
