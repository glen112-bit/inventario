import { useState } from 'react'
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper
} from '@mui/material'

import MarcasTab from './tabs/MarcasTab'
import CategoriasTab from './tabs/CategoriasTab'
import LocalizacoesTab from './tabs/LocalizacoesTab'
import EstadoEquipamentosTab from './tabs/EstadoEquipamentosTab'

export default function ConfigPage() {

  const [tab, setTab] = useState(0)

  return (

    <Box>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Configurações
      </Typography>

      <Paper
        sx={{
          borderRadius: 3,
          overflow: 'hidden'
        }}
      >

        <Tabs
          value={tab}
          onChange={(_, value) =>
            setTab(value)
          }
        >

          <Tab label="Marcas" />

          <Tab label="Categorias" />

          <Tab label="Localizações" />

          <Tab label="Estado" />

        </Tabs>

      </Paper>

      <Box mt={3}>

        {tab === 0 && <MarcasTab />}

        {tab === 1 && <CategoriasTab />}

        {tab === 2 && <LocalizacoesTab />}

        {tab === 3 && <EstadoEquipamentosTab />}

      </Box>

    </Box>

  )

}
