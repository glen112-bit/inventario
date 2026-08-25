import { useEffect,useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import VisibilityIcon from '@mui/icons-material/Visibility'
import HistoryIcon from '@mui/icons-material/History'
import BuildIcon from '@mui/icons-material/Build'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import api from '../../../../services/api'
import EquipamentoProfileDialog from '../../../../components/equipamentos/Profile/EquipamentoProfileDialog'
export default function HistoricoEquipamentosPage(){
  const [historico,setHistorico]=useState<any[]>([])
  const [busca,setBusca]=useState('')
  const [profile,setProfile]=useState<any>(null)
  const [profileOpen,setProfileOpen]=useState(false)
  useEffect(()=>{
    carregarHistorico()
  },[])
  const carregarHistorico=async()=>{
    try{
      const {data}=await api.get(
        '/equipamentos/historico'
      )
      setHistorico(data)
    }catch(error){
      console.error(error)
    }
  }
  const abrirPerfil=async(id:number)=>{
    try{
      const {data}=await api.get(
        `/equipamentos/${id}/profile`
      )
      setProfile(data)
      setProfileOpen(true)
    }catch(error){
      console.error(error)
    }
  }
  const getIcon=(estado:string)=>{
    switch(estado){
      case 'manutencao':
        return <BuildIcon color="warning"/>
      case 'alugado':
        return <LocalShippingIcon color="primary"/>
      case 'disponivel':
        return <Inventory2Icon color="success"/>
      case 'devolvido':
        return <KeyboardReturnIcon color="secondary"/>
      default:
        return <HistoryIcon/>
    }
  }
  const rows=historico.filter(
    item=>
      `
    ${item.codigo_interno}
    ${item.modelo}
    ${item.marca}
    ${item.usuario}
    `
    .toLowerCase()
    .includes(
      busca.toLowerCase()
    )
  )
  return(
    <Box>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Histórico dos Equipamentos
      </Typography>
      <Paper sx={{p:2,mb:2}}>
        <TextField
          fullWidth
          placeholder="Pesquisar equipamento..."
          value={busca}
          onChange={e=>setBusca(e.target.value)}
          InputProps={{
            startAdornment:
              <InputAdornment position="start">
                <SearchIcon/>
              </InputAdornment>
          }}
        />
      </Paper>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell/>
                <TableCell>Equipamento</TableCell>
                <TableCell>Evento</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Usuário</TableCell>
                <TableCell>Data</TableCell>
                <TableCell align="center">
                  Perfil
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                rows.map(item=>(
                  <TableRow
                    key={item.id}
                    hover
                  >
                    <TableCell>
                      <Avatar>
                        {getIcon(item.estado_novo)}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography fontWeight={700}>
                          {item.codigo_interno}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {item.marca} {item.modelo}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.tipo_evento??'Alteração'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                        {item.estado_novo}
                    </TableCell>
                    <TableCell>
                      {item.usuario??'-'}
                    </TableCell>
                    <TableCell>
                      {
                        new Date(
                          item.created_at
                        ).toLocaleString()
                      }
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip
                        title="Abrir Perfil"
                      >
                        <IconButton
                          onClick={()=> {
                            // console.log('click', item)
                            abrirPerfil(item.equipamento_id)
                          }}
                        >
                          <VisibilityIcon/>
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <EquipamentoProfileDialog
        open={profileOpen}
        equipamento={profile?.equipamento}
        historico={profile?.historico??[]}
        analytics={profile?.analytics}
        operacoes={profile?.operacoes??[]}
        onClose={()=>setProfileOpen(false)}
      />
    </Box>
  )
}
