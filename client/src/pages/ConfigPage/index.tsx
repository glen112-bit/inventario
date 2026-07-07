import { Box, Typography, Grid } from '@mui/material'

import SettingsCard from '../../components/configuracoes/Config/SettingsCard'

import PeopleIcon from '@mui/icons-material/People'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import CategoryIcon from '@mui/icons-material/Category'
import BusinessIcon from '@mui/icons-material/Business'
import PlaceIcon from '@mui/icons-material/Place'
import GroupIcon from '@mui/icons-material/Group'
import SettingsIcon from '@mui/icons-material/Settings'

import { useNavigate } from 'react-router-dom'

export default function ConfiguracoesPage() {

  const navigate = useNavigate()

  return (

    <Box>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
      >
        Configurações
      </Typography>

      <Grid container spacing={3}>

        <Grid size={{ xs:12, md:4 }}>
          <SettingsCard
            title="Usuários"
            description="Gerenciar usuários e permissões"
            icon={<PeopleIcon fontSize="large" />}
            onClick={() => navigate('/config/usuarios')}
          />
        </Grid>

        <Grid size={{ xs:12, md:4 }}>
          <SettingsCard
            title="Clientes"
            description="Gerenciar clientes"
            icon={<GroupIcon fontSize="large" />}
            onClick={() => navigate('/config/clientes')}
          />
        </Grid>

        <Grid size={{ xs:12, md:4 }}>
          <SettingsCard
            title="Equipamentos"
            description="Cadastro de equipamentos"
            icon={<Inventory2Icon fontSize="large" />}
            onClick={() => navigate('/config/equipamentos')}
          />
        </Grid>

        <Grid size={{ xs:12, md:4 }}>
          <SettingsCard
            title="Categorias"
            description="Categorias do inventário"
            icon={<CategoryIcon fontSize="large" />}
            onClick={() => navigate('/config/categorias')}
          />
        </Grid>

        <Grid size={{ xs:12, md:4 }}>
          <SettingsCard
            title="Marcas"
            description="Marcas cadastradas"
            icon={<BusinessIcon fontSize="large" />}
            onClick={() => navigate('/config/marcas')}
          />
        </Grid>

        <Grid size={{ xs:12, md:4 }}>
          <SettingsCard
            title="Localizações"
            description="Locais de armazenamento"
            icon={<PlaceIcon fontSize="large" />}
            onClick={() => navigate('/config/localizacoes')}
          />
        </Grid>

        <Grid size={{ xs:12, md:4 }}>
          <SettingsCard
            title="Sistema"
            description="Parâmetros gerais"
            icon={<SettingsIcon fontSize="large" />}
            onClick={() => navigate('/config/sistema')}
          />
        </Grid>

      </Grid>

    </Box>

  )

}
