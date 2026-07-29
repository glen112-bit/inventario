import {
  Box,
  Button,
  InputAdornment,
  TextField
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'

type Props = {
  search: string
  setSearch: (value: string) => void
  onNovo: () => void
}

export default function EquipamentosToolbar({
  search,
  setSearch,
  onNovo
}: Props) {

  return (

    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap={2}
      mb={3}
      flexWrap="wrap"
    >

      <TextField
        placeholder="Pesquisar equipamento..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        sx={{
          flex: 1,
          minWidth: 320
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </Box>

  )

}
