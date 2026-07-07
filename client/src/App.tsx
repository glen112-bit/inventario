import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DashboardLayout from './components/DashboardLayout'

import DashboardPage from './pages/DashboardPage'
import InventarioPage from './pages/InventarioPage'
import AlugueisPage from './pages/AlugueisPage'
import ManutencaoPage from './pages/ManutencaoPage'
import ManutencaoDetalhesPage from './pages/ManutencaoDetalhesPage'
import AnalyticsPage from './pages/AnalyticsPage'
import QRScannerPage from './pages/QRScannerPage'
import LoginPage from './pages/LoginPage'

import ConfigPage from './pages/ConfigPage'

import UsuariosPage from './pages/configuracoes/UsuariosPage'
import ClientesPage from './pages/configuracoes/ClientesPage'
import EquipamentosPage from './pages/configuracoes/EquipamentosPage'
import CategoriasPage from './pages/configuracoes/CategoriasPage'
import MarcasPage from './pages/configuracoes/MarcasPage'
import LocalizacoesPage from './pages/configuracoes/LocalizacoesPage'
import SistemaPage from './pages/configuracoes/SistemaPage'

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Login sem Dashboard */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* Layout principal */}
        <Route element={<DashboardLayout />}>

          {/* Dashboard */}
          <Route
            path="/"
            element={<DashboardPage />}
          />

          {/* Operação */}
          <Route
            path="/inventario"
            element={<InventarioPage />}
          />

          <Route
            path="/alugueis"
            element={<AlugueisPage />}
          />

          <Route
            path="/manutencao"
            element={<ManutencaoPage />}
          />

          <Route
            path="/manutencao/detalhes/:tipo"
            element={<ManutencaoDetalhesPage />}
          />

          <Route
            path="/analytics"
            element={<AnalyticsPage />}
          />

          <Route
            path="/qr-scanner"
            element={<QRScannerPage />}
          />

          {/* Configurações */}
          <Route path="/config">

            <Route
              index
              element={<ConfigPage />}
            />

            <Route
              path="clientes"
              element={<ClientesPage />}
            />

            <Route
              path="usuarios"
              element={<UsuariosPage />}
            />

            <Route
              path="equipamentos"
              element={<EquipamentosPage />}
            />

            <Route
              path="categorias"
              element={<CategoriasPage />}
            />

            <Route
              path="marcas"
              element={<MarcasPage />}
            />

            <Route
              path="localizacoes"
              element={<LocalizacoesPage />}
            />

            <Route
              path="sistema"
              element={<SistemaPage />}
            />

          </Route>

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App
