
import { useMemo, useState } from 'react'
import api from '../../../services/api'
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'

import EquipamentosTable from '../../../components/configuracoes/Equipamentos/EquipamentosTable'
import EquipamentoDialog from '../../../components/configuracoes/Equipamentos/EquipamentoDialog'

import useEquipamentos from '../../../hooks/useEquipamentos'
import useCategorias from '../../../hooks/useCategorias'
import useMarcas from '../../../hooks/useMarcas'
import useLocalizacoes from '../../../hooks/useLocalizacoes'
import useEquipamentosPage from '../../../hooks/useEquipamentosPage'
import EquipamentoDetalhesDialog from '../../../components/configuracoes/Equipamentos/EquipamentoDetalhesDialog'
import EquipamentosHeader from '../../../components/configuracoes/Equipamentos/EquipamentosHeader'
import EquipamentosToolbar from '../../../components/configuracoes/Equipamentos/EquipamentosToolbar'

import EquipamentoHistoricoDialog from '../../../components/configuracoes/Equipamentos/EquipamentoHistoricoDialog'

import EquipamentoEstadoDialog from '../../../components/configuracoes/Equipamentos/EquipamentoEstadoDialog'
export default function EquipamentosPage() {

  const page = useEquipamentosPage()


  return (

    <>
      <EquipamentosHeader />

      <EquipamentosToolbar
        search={page.search}
        setSearch={page.setSearch}
        onNovo={page.novoEquipamento}
      />
      <Paper
        sx={{
          p: 3,
          borderRadius: 3
        }}
      >
        <EquipamentosTable
          equipos={page.equipamentosFiltrados}
          localizacoes={page.localizacoes}
          onEditar={page.editarEquipamento}
          onExcluir={page.excluirEquipamento}
          onDetalhes={page.abrirDetalhes}
          onEstado={page.abrirEstado}
          onHistorico={page.abrirHistorico}
        />
      </Paper>

      <EquipamentoDialog
        open={page.open}
        equipamento={page.equipamentoSelecionado}
        categorias={page.categorias}
        marcas={page.marcas}
        localizacoes={page.localizacoes}
        onClose={() => page.setOpen(false)}
        onSalvar={page.salvar}
      />

      <EquipamentoDetalhesDialog
        open={page.openDetalhes}
        equipamento={page.equipamentoSelecionado}
        onClose={() => page.setOpenDetalhes(false)}
      />

      <EquipamentoEstadoDialog 
        open={page.openEstado}
        equipamento={page.equipamentoSelecionado}
        onClose={() => page.setOpenEstado(false)}
        onSalvar={page.alterarEstado}
      />


      <EquipamentoHistoricoDialog 
        open={page.openHistorico}
        historico={page.historico}
        equipamento={page.equipamentoSelecionado}
        onClose={() => page.setOpenHistorico(false)}
      />
    </>

  )

}
