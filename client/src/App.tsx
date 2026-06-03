import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 

// IMPORTA TU LAYOUT (Asegúrate de que la ruta del archivo sea la correcta)
import DashboardLayout from './components/DashboardLayout' 

import DashboardPage from './pages/DashboardPage'
import InventarioPage from './pages/InventarioPage'
import AlugueisPage from './pages/AlugueisPage'
import ClientesPage from './pages/ClientesPage'
import UsuariosPage from './pages/UsuariosPage'
import ManutencaoPage from './pages/ManutencaoPage'
import AnalyticsPage from './pages/AnalyticsPage'
import QRScannerPage from './pages/QRScannerPage'
import ConfigPage from './pages/ConfigPage'

import ManutencaoDetalhesPage from './pages/ManutencaoDetalhesPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. CONFIGURAMOS EL LAYOUT COMO RUTA PADRE:
            Este componente se mantendrá siempre visible (traerá tu Sidebar).
          */}
        <Route element={<DashboardLayout />}>

          {/* 2. LAS RUTAS HIJAS:
              Todo lo que esté aquí adentro se renderizará de forma dinámica 
              en el lugar exacto donde colocaste la etiqueta <Outlet />.
            */}
          <Route path="/" element={<DashboardPage />} />
          <Route path="/inventario" element={<InventarioPage />} />
          <Route path="/alugueis" element={<AlugueisPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/manutencao" element={<ManutencaoPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/qr-scanner" element={<QRScannerPage />} />
          <Route path="/config" element={<ConfigPage />} />

<Route
  path="/manutencao/detalhes/:tipo"
  element={<ManutencaoDetalhesPage />}
/>
        </Route>
      </Routes>
    </BrowserRouter> 
  )
}

export default App
