import { useMemo, useState } from 'react'

import { Box } from '@mui/material'

import useClientes from '../../hooks/useClientes'
import useClientesFilter from '../../hooks/useClientesFilter'

import ClientesHeader from '../../components/clientes/ClientesHeader'
import ClientesKpis from '../../components/clientes/ClientesKpis'
import ClientesToolbar from '../../components/clientes/ClientesToolbar'
import ClientesTable from '../../components/clientes/ClientesTable'
import NovoClienteDialog from '../../components/clientes/NovoClienteDialog'

export default function ClientesPage() {

  const usuario = JSON.parse(
    localStorage.getItem('usuario') || '{}'
  )

  const {
    clientes,
    carregarClientes,
    criarCliente,
    excluirCliente
  } = useClientes()

  const [search, setSearch] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('')
  const [openNovo, setOpenNovo] = useState(false)

  const {
    filtrados
  } = useClientesFilter(
    clientes,
    search,
    filtroStatus
  )

  const totalClientes = clientes.length

  const clientesActivos = clientes.filter(
    cliente => cliente.activo === 1
  ).length

  const clientesInactivos = clientes.filter(
    cliente => cliente.activo === 0
  ).length

  const exportarExcel = () => {

    console.log('Exportar Excel')

  }

  const exportarPdf = () => {

    console.log('Exportar PDF')

  }

  return (

    <Box>

      <ClientesHeader
        rol={usuario.rol}
        onNovo={() => setOpenNovo(true)}
      />

      <ClientesKpis
        totalClientes={totalClientes}
        clientesActivos={clientesActivos}
        clientesInactivos={clientesInactivos}
      />

      <ClientesToolbar
        search={search}
        filtroStatus={filtroStatus}
        onSearchChange={setSearch}
        onStatusChange={setFiltroStatus}
        onExportExcel={exportarExcel}
        onExportPdf={exportarPdf}
        onPrint={() => window.print()}
      />

      <ClientesTable
        clientes={filtrados}
        onExcluir={excluirCliente}

      />

      <NovoClienteDialog
        open={openNovo}
        onClose={() => setOpenNovo(false)}
        onSalvar={async (dados) => {

          await criarCliente(dados)

          await carregarClientes()

          setOpenNovo(false)

        }}
      />

    </Box>

  )

}
