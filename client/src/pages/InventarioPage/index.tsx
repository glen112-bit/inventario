import { useEffect,useMemo,useState } from 'react'
import axios from 'axios'

import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Chip,
  Grid,
  Avatar
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import EditIcon from '@mui/icons-material/Edit'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

type Equipamento = {
  equipamento_id:number
  codigo_interno:string
  numero_serie:string
  marca:string
  modelo:string
  estado_actual:string
  valor:string
  categoria_id:number
  ubicacion_id:number
}

export default function EquipamentosPage(){

  const [equipos,setEquipos]=useState<Equipamento[]>([])
  const [search,setSearch]=useState('')
  const [open,setOpen] = useState(false)
  const [openNovo,setOpenNovo] = useState(false)
  const [equipamentoSelecionado,setEquipamentoSelecionado]=useState<any>(null)
  const [estadoAtual,setEstadoAtual]=useState('')
  const [observacao,setObservacao] = useState('')
  const [historico,setHistorico] = useState<any[]>([])
  const [categorias,setCategorias] = useState<any[]>([])
  const [novoEquipamento,setNovoEquipamento] =
    useState({
      marca:'',
      modelo:'',
      numero_serie:'',
      categoria_id:'',
      marca_id:'',
      descripcion:'',
      valor:'',
      fecha_compra:'',
      ubicacion_id:''
  })

  const obterEquipamentos=async()=>{
      try{
        const response=await axios.get(
          'http://localhost:3001/api/inventario'
        )
        setEquipos(response.data)
      }catch(error){
        console.error(error)
      }
    }

const obterCategorias = async () => {
  try {
    const response = await axios.get(
      'http://localhost:3001/api/config/categorias'
    )
    console.log(response.data)
    setCategorias(response.data)
  } catch(error) {
    console.error(error)
  }
}

  useEffect(()=>{
    obterEquipamentos()
    obterCategorias()
  },[])

  const abrirEdicaoEstado = async (
    equipamento: Equipamento
  ) => {
    setEquipamentoSelecionado(
      equipamento
    )
    setEstadoAtual(
      equipamento.estado_actual
    )
    setOpen(true)
    try {
      const response =
        await axios.get(
          `http://localhost:3001/api/config/equipamentos/${equipamento.equipamento_id}/historico`
      )
          setHistorico(
            response.data
          )
    } catch(error) {
      console.error(error)
    }
  }

const salvarEquipamento = async () => {
  try {
    await axios.post(
      'http://localhost:3001/api/inventario',
      novoEquipamento
    )
    setOpenNovo(false)
    await obterEquipamentos()
  } catch(error) {
    console.error(error)
  }
}

  const total = equipos.length

  const disponiveis = equipos.filter(
    e => e.estado_actual === 'disponivel'

  ).length

  const alugados = equipos.filter(
    e => e.estado_actual === 'alugado'

  ).length

  const manutencao = equipos.filter(
    e => e.estado_actual === 'manutencao'

  ).length

  const danificados = equipos.filter(
    e => e.estado_actual === 'danificado'

  ).length

const filtrados = useMemo(() => {

  return equipos.filter(e =>

    e.codigo_interno
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    e.numero_serie
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    e.marca
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    e.modelo
      ?.toLowerCase()
      .includes(search.toLowerCase())

  )

}, [equipos, search])

  const salvarEstado = async () => {

    try {

      console.log(
        equipamentoSelecionado,
        estadoAtual
      )

      await axios.put(
        `http://localhost:3001/api/config/equipamentos/${equipamentoSelecionado.equipamento_id}/estado`,
          {
          estado_actual: estadoAtual,
          observacao
        }
      )

      setEquipos(prev =>
                 prev.map(item =>
                          item.equipamento_id === equipamentoSelecionado.equipamento_id
                            ? {
                              ...item,
                              estado_actual: estadoAtual
                            }
                              : item
                         )
                )

                setOpen(false)

    } catch(error) {

      console.error(
        'ERRO SALVAR:',
        error
      )

    }

  }
console.log(categorias)
  return(

    <Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >

        <Box>

          <Typography
            variant="h4"
            fontWeight={700}
          >
            Equipamentos
          </Typography>

          <Typography color="text.secondary">
            Gestão de equipos de áudio
          </Typography>

        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={()=> setOpenNovo(true)}
        >
          Novo Equipamento
        </Button>

      </Box>

      <Grid container spacing={3} mb={4}>

        <Grid item xs={12} md={3}>
          <Paper sx={{p:3,borderRadius:4}}>
            <Typography color="text.secondary">
              Total
            </Typography>
            <Typography variant="h4">
              {total}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{p:3,borderRadius:4}}>
            <Typography color="text.secondary">
              Disponíveis
            </Typography>
            <Typography variant="h4">
              {disponiveis}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{p:3,borderRadius:4}}>
            <Typography color="text.secondary">
              Alugados
            </Typography>
            <Typography variant="h4">
              {alugados}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{p:3,borderRadius:4}}>
            <Typography color="text.secondary">
              Manutenção
            </Typography>
            <Typography variant="h4">
              {manutencao}
            </Typography>
          </Paper>
        </Grid>
<Grid item xs={12} md={3}>
  <Paper sx={{p:3,borderRadius:4}}>
    <Typography color="text.secondary">
      Danificados
    </Typography>
    <Typography variant="h4">
      {danificados}
    </Typography>
  </Paper>
</Grid>
      </Grid>

      <Paper
        sx={{
          p:3,
          borderRadius:4
        }}
      >

        <Box mb={3}>

          <TextField
            fullWidth
            label="Buscar equipamento..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </Box>

        <TableContainer>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>Equipamento</TableCell>
                <TableCell>Série</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Localização</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">
                  Ações
                </TableCell>
              </TableRow>

            </TableHead>

            <TableBody>

              {filtrados.map((equipamento)=>(

                <TableRow
                  hover
                  key={equipamento.equipamento_id}

                >

                  <TableCell>

                    <Box
                      display="flex"
                      alignItems="center"
                      gap={2}
                    >

                      <Avatar>

                        <Inventory2Icon />

                      </Avatar>

                      <Typography
                        fontWeight={600}
                      >
                        {equipamento.marca} {equipamento.modelo}
                      </Typography>

                    </Box>

                  </TableCell>

                  <TableCell>
                    {equipamento.numero_serie}
                  </TableCell>

                  <TableCell>
                    {equipamento.categoria_id}
                  </TableCell>

                  <TableCell>
                    {equipamento.marca}
                  </TableCell>

                  <TableCell>
                    {equipamento.ubicacion_id}
                  </TableCell>

                  <TableCell>
                    R$ {Number(equipamento.valor).toLocaleString(
                      'pt-BR',
                      {
                        minimumFractionDigits: 2
                      }
                    )}
                  </TableCell>

                  <TableCell>

                    <Chip
                      size="small"
                      variant="outlined"
                      label={
                        equipamento.estado_actual === 'disponivel'
                          ? 'Disponível'
                          : equipamento.estado_actual === 'alugado'
                            ? 'Alugado'
                            : equipamento.estado_actual === 'manutencao'
                              ? 'Manutenção'
                              : 'Danificado'
                      }
                    />

                  </TableCell>

                  <TableCell align="center">

                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() =>
                        abrirEdicaoEstado(
                          equipamento
                      )
                      }
                    >
                      Editar
                    </Button>

                  </TableCell>
                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Alterar Estado</DialogTitle>

        <DialogContent>

          <FormControl fullWidth margin="normal">
            <InputLabel>Estado</InputLabel>
            <TextField
              fullWidth
              margin="normal"
              label="Código"
              value={
                equipamentoSelecionado?.codigo_interno || ''
              }
              disabled
            />

            <TextField
              fullWidth
              margin="normal"
              label="Equipamento"
              value={
                equipamentoSelecionado
                  ? `${equipamentoSelecionado.marca} ${equipamentoSelecionado.modelo}`
                  : ''
              }
              disabled
            />

            <TextField
              fullWidth
              margin="normal"
              label="Número Série"
              value={
                equipamentoSelecionado?.numero_serie || ''
              }
              disabled
            />
            <Select
              value={estadoAtual}
              label="Estado"
              onChange={(e) => setEstadoAtual(e.target.value)}
            >
              <MenuItem value="disponivel">Disponível</MenuItem>
              <MenuItem value="alugado">Alugado</MenuItem>
              <MenuItem value="manutencao">Manutenção</MenuItem>
              <MenuItem value="danificado">Danificado</MenuItem>
            </Select>
            <TextField
              fullWidth
              multiline
              rows={4}
              margin="normal"
              label="Observação"
              value={observacao}
              onChange={(e)=>
                setObservacao(e.target.value)
              }
            />
            <Typography
              variant="h6"
              mt={3}
              mb={2}
            >
              Histórico de Alterações
            </Typography>

            <Paper
              variant="outlined"
              sx={{
                maxHeight:250,
                overflow:'auto',
                p:2
              }}
            >

              {
                historico.length === 0
                  ? (
                    <Typography
                      color="text.secondary"
                    >
                      Nenhum histórico encontrado
                    </Typography>
                  )
                  : historico.map(item => (

                    <Box
                      key={item.id}
                      mb={2}
                    >

                      <Typography
                        fontWeight={600}
                      >
                        {item.estado_anterior}
                        {' → '}
                        {item.estado_novo}
                      </Typography>

                      <Typography
                        variant="body2"
                      >
                        {item.observacao}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {
                          new Date(
                            item.created_at
                          ).toLocaleString(
                          'pt-BR'
                          )
                        }
                      </Typography>

                    </Box>

                  ))
              }

            </Paper>
          </FormControl>

        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={salvarEstado}
          >
            Salvar
          </Button>
        </DialogActions>

      </Dialog>
<Dialog
  open={openNovo}
  onClose={() => setOpenNovo(false)}
  maxWidth="sm"
  fullWidth
>
  <DialogTitle>
    Novo Equipamento
  </DialogTitle>

  <DialogContent>

    <TextField
      fullWidth
      margin="normal"
      label="Marca"
      value={novoEquipamento.marca}
      onChange={(e) =>
        setNovoEquipamento({
          ...novoEquipamento,
          marca: e.target.value
        })
      }
    />

    <TextField
      fullWidth
      margin="normal"
      label="Modelo"
      value={novoEquipamento.modelo}
      onChange={(e) =>
        setNovoEquipamento({
          ...novoEquipamento,
          modelo: e.target.value
        })
      }
    />

    <Select>
      <MenuItem value={1}>
        Microfones
      </MenuItem>

      <MenuItem value={2}>
        Mesas
      </MenuItem>

      <MenuItem value={3}>
        Speakers
      </MenuItem>

      <MenuItem value={4}>
        Racks
      </MenuItem>
    </Select>

    <FormControl
  fullWidth
  margin="normal"
>
  <InputLabel>
    Categoria
  </InputLabel>
  <Select
    value={novoEquipamento.categoria_id}
    label="Categoria"
    onChange={(e) =>
      setNovoEquipamento({
        ...novoEquipamento,
        categoria_id: e.target.value
      })
    }
  >
    {
      categorias.map(categoria => (
        <MenuItem
          key={categoria.id}
          value={categoria.id}
        >
          {categoria.nome}
        </MenuItem>
      ))
    }
  </Select>
</FormControl>
  </DialogContent>

  <DialogActions>

    <Button
      onClick={() =>
        setOpenNovo(false)
      }
    >
      Cancelar
    </Button>

    <Button
      variant="contained"
      onClick={salvarEquipamento}
    >
      Salvar
    </Button>

  </DialogActions>

</Dialog>
    </Box>

  )

}
