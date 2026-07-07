import {
  TextField,
  InputAdornment
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

type Props = {
  value:string
  onChange:(text:string)=>void
}

export default function EquipamentosFilter({
  value,
  onChange
}:Props){

  return (

    <TextField
      fullWidth
      placeholder="Pesquisar equipamento..."
      value={value}
      onChange={(e)=>
        onChange(e.target.value)
      }
      InputProps={{
        startAdornment:(
          <InputAdornment position="start">
            <SearchIcon/>
          </InputAdornment>
        )
      }}
    />

  )

}
