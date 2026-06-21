import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

type Props = {
  value: number | string
  localizacoes: any[] 
  onChange: (value:any) => void
}

export default function LocalizacaoSelect({
  value,
  localizacoes,
  onChange
}: Props) {

  return (

    <FormControl
      fullWidth
      margin="normal"
    >

      <InputLabel>
        Localização
      </InputLabel>

      <Select

        value={value}
        label="Localização"
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
      >

        {
          localizacoes.map(

            localizacao => (

              <MenuItem
                key={localizacao.localizacao}
                value={localizacao.localizacao}
              >
                {localizacao.localizacao}
              </MenuItem>

            )
          )
        }

      </Select>

    </FormControl>

  )

}
