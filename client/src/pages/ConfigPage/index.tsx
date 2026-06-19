import { useState } from 'react'

import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'


import NovoEquipamentoForm from '../../components/equipamentos/NovoEquipamentoForm'
import ClientesTable from '../../components/configuracoes/ClientesTable'
import CategoriasTable from '../../components/configuracoes/CategoriasTable'
import MarcasTable from '../../components/configuracoes/MarcasTable'
import UsuariosTable from '../../components/configuracoes/UsuariosTable'
import EquipamentosTable from '../../components/configuracoes/EquipamentosTable'
import CategoriaDialog from '../../components/configuracoes/CategoriaDialog'

import useClientes from '../../hooks/useClientes'
import useCategorias from '../../hooks/useCategorias'
import useClientesFilter from '../../hooks/useClientesFilter'
import useEquipamentos from '../../hooks/useEquipamentos'
import useEquipamentosFilter from '../../hooks/useEquipamentosFilter'
import useEquipamentoForm from '../../hooks/useEquipamentoForm'
import useLocalizacoes from '../../hooks/useLocalizacoes'
import useUsuarios from '../../hooks/useUsuarios'
import useMarcas from '../../hooks/useMarcas'

export default function ConfiguracoesPage() {

  const [openCategoria,setOpenCategoria] = useState(false)
  const [nomeCategoria,setNomeCategoria] = useState('')
  const [descricaoCategoria,setDescricaoCategoria] = useState('')
  const [categoriaSelecionada,setCategoriaSelecionada] = useState<any>(null)
  // const [marcas, setMarcas] = useState('')
  const [openEquipamento, setOpenEquipamento] = useState(false)
  // const [marca, setMarca] = useState('')
  // const [modelo, setModelo] = useState('')
  // const [estado, setEstado] = useState('')
  // const [descricao, setDescricao] = useState('')
  // const [localizacao, setLocalizacao] = useState('')
  // const [valor, setValor] = useState(0)
  const [aba,setAba] = useState(0)

  const {
    localizacoes
  } = useLocalizacoes()

  const { 
    marcas 
  } = useMarcas()

  const {
    clientes,
    criarCliente,
    atualizarCliente,
    excluirCliente
  } = useClientes()

  const {
    categorias,
    criarCategoria,
    atualizarCategoria
  } = useCategorias()

  const {
    usuarios,
    criarUsuario,
    atualizarUsuario,
    excluirUsuario
  } = useUsuarios()

  const {
    equipos,
    setEquipos,
    carregarEquipamentos,
    criarEquipamento,
    salvarEquipamento,
    alterarEstado
  } = useEquipamentos()

  const {
    form,
    setForm,
    resetForm,
    validate,
    buildPayload
  } = useEquipamentoForm()

  const salvarCategoria = async () => {
    try {
      if(categoriaSelecionada){
        await atualizarCategoria(
          categoriaSelecionada.id,
          {
            nome: nomeCategoria,
            descricao: descricaoCategoria
          }
        )
      } else {
        await criarCategoria({
          nome: nomeCategoria,
          descricao: descricaoCategoria
        })
      }
      setOpenCategoria(false)
      setNomeCategoria('')
      setDescricaoCategoria('')
      setCategoriaSelecionada(null)
    } catch(error) {
      console.error(error)
    }
  }
  const editarCategoria = ( categoria:any) => {
    setCategoriaSelecionada(
      categoria
    )
    setNomeCategoria(
      categoria.nome
    )

    setDescricaoCategoria(
      categoria.descricao || ''
    )
    setOpenCategoria(true)
  }
  const handleEditar = (equipo: any) => {
    console.log('Editar:', equipo)
  }

  const salvarNovoEquipamento = async () => {

    try {

      if (!validate()) {
        return
      }

      await criarEquipamento(
        buildPayload()
      )

      resetForm()

      setOpenEquipamento(false)

      await carregarEquipamentos()

    } catch (error) {

      console.error(error)

    }

  }

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
          borderRadius:1,
          overflow:'hidden'
        }}
      >

        <Tabs
          value={aba}
          onChange={(_,value)=>
            setAba(value)
          }
          variant="fullWidth"
        >
          <Tab label="Clientes" />
          <Tab label="Categorias" />
          <Tab label="Usuários" />
          <Tab label="Equipamentos" />
        </Tabs>

      </Paper>

      <Box mt={3}>

        {aba === 0 &&
        <ClientesTable clientes = {clientes} />
        }

        {aba === 1 &&
          <CategoriasTable 
            categorias = {categorias} 
            onEditar = { editarCategoria }
          />
        }

        {aba === 2 &&
          <UsuariosTable 
            usuarios = {usuarios}
            criarUsuario = { criarUsuario }
            atualizarUsuario = { atualizarUsuario }
            excluirUsuario = { excluirUsuario }
          />
        }
        {aba === 3 && (
          <>
            <Box
              display="flex"
              justifyContent="flex-end"
              mb={2}
            >
              <Button
                variant="contained"
                onClick={() => {
                  setOpenEquipamento(true)
                }}
              >
                Novo Equipamento
              </Button>
            </Box>

            <EquipamentosTable
              equipos={equipos}
              onEditar={handleEditar}
              localizacoes={localizacoes}
            />
          </>
        )}
      </Box>
      <CategoriaDialog
        open={openCategoria}
        nome={nomeCategoria}
        descricao={descricaoCategoria}
        setNome={setNomeCategoria}
        setDescricao={setDescricaoCategoria}
        onClose={() => setOpenCategoria(false)}
        onSalvar={salvarCategoria}
        editando={!!categoriaSelecionada}
      />
      <Dialog
        open={openEquipamento}
        onClose={() => setOpenEquipamento(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Novo Equipamento
        </DialogTitle>

        <DialogContent>

          <NovoEquipamentoForm
            form={form}
            setForm={setForm}
            categorias={categorias}
            marcas={marcas}
            localizacoes={localizacoes}
          />

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() => setOpenEquipamento(false)}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={salvarNovoEquipamento}
          >
            Salvar
          </Button>

        </DialogActions>

      </Dialog>

      <DialogActions>

        <Button
          onClick={() => setOpenEquipamento(false)}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={salvarNovoEquipamento}
        >
          Salvar
        </Button>

      </DialogActions>
    </Box>


  )

}
