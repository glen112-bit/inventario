import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 

// IMPORTA TU LAYOUT (Asegúrate de que la ruta del archivo sea la correcta)
import DashboardLayout from './components/DashboardLayout' 

import DashboardPage from './pages/DashboardPage'
import InventarioPage from './pages/InventarioPage'
import AlugeisPage from './pages/AlugeisPage'
import ClientesPage from './pages/ClientesPage'
import UsuariosPage from './pages/UsuariosPage'
import ManutencaoPage from './pages/ManutencaoPage'
import AnalyticsPage from './pages/AnalyticsPage'
import QRScannerPage from './pages/QRScannerPage'
import ConfigPage from './pages/ConfigPage'

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
          <Route path="/alugeis" element={<AlugeisPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/manutencao" element={<ManutencaoPage />} />
          <Route path="/analitics" element={<AnalyticsPage />} />
          <Route path="/qr-scanner" element={<QRScannerPage />} />
          <Route path="/config" element={<ConfigPage />} />

        </Route>
      </Routes>
    </BrowserRouter> 
  )
}

export default App
