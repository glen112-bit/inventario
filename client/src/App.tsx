import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

import DashboardLayout from './components/DashboardLayout'

import DashboardPage from './pages/DashboardPage'
import InventarioPage from './pages/InventarioPage'
import AlugueisPage from './pages/AlugueisPage'
import ManutencaoPage from './pages/ManutencaoPage'
import ManutencaoDetalhesPage from './pages/ManutencaoDetalhesPage'
import AnalyticsPage from './pages/AnalyticsPage'
import QRScannerPage from './pages/QRScannerPage'

import LoginPage from './pages/LoginPage'
import SetupAdminPage from './pages/SetupAdminPage'
import AceitarConvitePage from './pages/AceitarConvitePage'

import ConfigPage from './pages/ConfigPage'

import UsuariosPage from './pages/configuracoes/UsuariosPage'
import ClientesPage from './pages/configuracoes/ClientesPage'
import EquipamentosPage from './pages/configuracoes/EquipamentosPage'
import CategoriasPage from './pages/configuracoes/CategoriasPage'
import MarcasPage from './pages/configuracoes/MarcasPage'
import LocalizacoesPage from './pages/configuracoes/LocalizacoesPage'
import SistemaPage from './pages/configuracoes/SistemaPage'

import NovaSaidaPage from './pages/Operacoes/NovaSaidaPage'
import NovaDevolucaoPage from './pages/Operacoes/NovaDevolucaoPage'
import HistoricoOperacoesPage from './pages/Operacoes/Historico/HistoricoOperacoesPage'
import HistoricoEquipamentosPage from './pages/Operacoes/Historico/HistoricoEquipamentosPage'


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ================================= */}
        {/* ROTAS PÚBLICAS */}
        {/* ================================= */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/registrar-admin"
          element={<SetupAdminPage />}
        />

        <Route
          path="/convite/:token"
          element={<AceitarConvitePage />}
        />


        {/* ================================= */}
        {/* ROTAS PRIVADAS */}
        {/* ================================= */}

        <Route element={<PrivateRoute />}>

          <Route element={<DashboardLayout />}>

            <Route
              path="/"
              element={<DashboardPage />}
            />

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


            {/* ============================= */}
            {/* OPERAÇÕES */}
            {/* ============================= */}

            <Route
              path="/operacoes/saida"
              element={<NovaSaidaPage />}
            />

            <Route
              path="/operacoes/devolucao"
              element={<NovaDevolucaoPage />}
            />

            <Route
              path="/operacoes/historico"
              element={<HistoricoOperacoesPage />}
            />

            <Route
              path="/equipamentos/historico"
              element={<HistoricoEquipamentosPage />}
            />


            {/* ============================= */}
            {/* CONFIGURAÇÕES */}
            {/* ============================= */}

            <Route
              path="/config"
              element={<ConfigPage />}
            />

            <Route
              path="/config/clientes"
              element={<ClientesPage />}
            />

            <Route
              path="/config/usuarios"
              element={<UsuariosPage />}
            />

            <Route
              path="/config/equipamentos"
              element={<EquipamentosPage />}
            />

            <Route
              path="/config/categorias"
              element={<CategoriasPage />}
            />

            <Route
              path="/config/marcas"
              element={<MarcasPage />}
            />

            <Route
              path="/config/localizacoes"
              element={<LocalizacoesPage />}
            />

            <Route
              path="/config/sistema"
              element={<SistemaPage />}
            />

          </Route>

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App
