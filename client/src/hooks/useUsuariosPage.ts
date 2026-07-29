import { useMemo, useState } from 'react'
import useUsuarios from './useUsuarios'

export default function useUsuariosPage() {

  const {
    usuarios,
    criarUsuario,
    atualizarUsuario,
    excluirUsuario,
    buscarUsuario,
    alterarSenha,
    alterarStatus
  } = useUsuarios()

  const [openDialog, setOpenDialog] =  useState(false)

  const [openDetalhes, setOpenDetalhes] =  useState(false)

  const [openSenha, setOpenSenha] = useState(false)

  const [usuarioSelecionado, setUsuarioSelecionado] = useState<any>(null)

  const [textoBusca, setTextoBusca] = useState('')

  const [rolFiltro, setRolFiltro] = useState('')

  const [estadoFiltro, setEstadoFiltro] = useState('')

  const novoUsuario = () => {

    setUsuarioSelecionado(null)

    setOpenDialog(true)

  }

  const editarUsuario = async (usuario:any) => {

    const dados =
      await buscarUsuario(usuario.id)

    setUsuarioSelecionado(dados)

    setOpenDialog(true)

  }

  const verUsuario = async (usuario:any) => {

    const dados =
      await buscarUsuario(usuario.id)

    setUsuarioSelecionado(dados)

    setOpenDetalhes(true)

  }

  const abrirSenha = (usuario:any) => {

    setUsuarioSelecionado(usuario)

    setOpenSenha(true)

  }

  const salvarUsuario = async(payload:any) => {

    if(payload.id){

      await atualizarUsuario(
        payload.id,
        payload
      )

    }else{

      await criarUsuario(payload)

    }

    setOpenDialog(false)

  }

  const removerUsuario = async(id:number) => {

    if(!confirm('Excluir usuário?'))
      return

    await excluirUsuario(id)

  }

  const salvarSenha = async(password:string) => {

    await alterarSenha(
      usuarioSelecionado.id,
      password
    )

    setOpenSenha(false)

  }

  const alterarEstado = async(usuario:any) => {

    await alterarStatus(

      usuario.id,

      !usuario.ativo

    )

  }

  const usuariosFiltrados = useMemo(() => {

    return usuarios.filter(usuario => {

      const busca =
        textoBusca === '' ||

        usuario.nome
          ?.toLowerCase()
          .includes(
            textoBusca.toLowerCase()
          ) ||

        usuario.telefone
          ?.includes(textoBusca)

      const rol =

        rolFiltro === '' ||

        usuario.rol === rolFiltro

      const estado =

        estadoFiltro === '' ||

        String(usuario.ativo) === estadoFiltro

      return busca && rol && estado

    })

  },[
    usuarios,
    textoBusca,
    rolFiltro,
    estadoFiltro
  ])

  return {

    usuarios: usuariosFiltrados,

    openDialog,
    setOpenDialog,

    openDetalhes,
    setOpenDetalhes,

    openSenha,
    setOpenSenha,

    usuarioSelecionado,

    textoBusca,
    setTextoBusca,

    rolFiltro,
    setRolFiltro,

    estadoFiltro,
    setEstadoFiltro,

    novoUsuario,

    editarUsuario,

    verUsuario,

    abrirSenha,

    salvarUsuario,

    removerUsuario,

    salvarSenha,

    alterarEstado

  }

}
