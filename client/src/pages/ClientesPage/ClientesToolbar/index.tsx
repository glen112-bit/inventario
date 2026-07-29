import {
  Box,
  TextField,
  MenuItem,
  Stack,
  Button
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import TableViewIcon from '@mui/icons-material/TableView'
import PrintIcon from '@mui/icons-material/Print'

type Props = {
  search: string
  filtroStatus: string

  onSearchChange: (value: string) => void
  onStatusChange: (value: string) => void

  onExportPdf?: () => void
  onExportExcel?: () => void
  onPrint?: () => void
}

export default function ClientesToolbar({
  search,
  filtroStatus,
  onSearchChange,
  onStatusChange,
  onExportPdf,
  onExportExcel,
  onPrint
}: Props) {

  return (

    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
      mb={3}
    >

      <Stack
        direction="row"
        spacing={2}
        sx={{ flex: 1 }}
      >

        <TextField
          fullWidth
          label="Buscar cliente..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          InputProps={{
            startAdornment: <SearchIcon />
          }}
        />

        <TextField
          select
          label="Estado"
          value={filtroStatus}
          onChange={(e) =>
            onStatusChange(e.target.value)
          }
          sx={{ minWidth: 180 }}
        >

          <MenuItem value="">
            Todos
          </MenuItem>

          <MenuItem value="activo">
            Activos
          </MenuItem>

          <MenuItem value="inactivo">
            Inactivos
          </MenuItem>

        </TextField>

      </Stack>

      <Stack
        direction="row"
        spacing={1}
      >

        <Button
          variant="outlined"
          startIcon={<TableViewIcon />}
          onClick={onExportExcel}
        >
          Excel
        </Button>

        <Button
          variant="outlined"
          color="error"
          startIcon={<PictureAsPdfIcon />}
          onClick={onExportPdf}
        >
          PDF
        </Button>

        <Button
          variant="outlined"
          startIcon={<PrintIcon />}
          onClick={onPrint}
        >
          Imprimir
        </Button>

      </Stack>

    </Box>

  )

}
