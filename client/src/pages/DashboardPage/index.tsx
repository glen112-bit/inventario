import { useEffect, useState } from 'react'
import axios from 'axios'

import Grid from '@mui/material/Grid'

import Inventory2Icon from '@mui/icons-material/Inventory2'
import HandshakeIcon from '@mui/icons-material/Handshake'
import BuildIcon from '@mui/icons-material/Build'
import PeopleIcon from '@mui/icons-material/People'

import KpiCard from '../../components/KpiCard'

export default function DashboardPage() {

  const [stats, setStats] = useState({
  totalEquipos: 0,
  equiposDisponibles: 0,
  mantenimientosPendientes: 0,
  usuarios: 0
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {

    try {

      const res = await axios.get(
        'http://localhost:3001/api/dashboard/stats'
      )

      setStats(res.data)
console.log(res.data)
    } catch (err) {

      console.error(err)

    }
  }

  return (

    <>
      <h1>Dashboard</h1>

      <Grid container spacing={3} mt={1}>

        <Grid item xs={12} md={3}>
          <KpiCard
            title="Equipos"
            value={stats.totalEquipos || 0}
            icon={<Inventory2Icon />}
            color="#3b82f6"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <KpiCard
            title="Disponibles"
            value={stats.equiposDisponibles || 0}
            icon={<HandshakeIcon />}
            color="#10b981"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <KpiCard
            title="Mantenimiento"
            value={stats.mantenimientosPendientes || 0}
            icon={<BuildIcon />}
            color="#f59e0b"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <KpiCard
            title="Usuarios"
            value={stats.usuarios || 0}
            icon={<PeopleIcon />}
            color="#8b5cf6"
          />
        </Grid>

      </Grid>
    </>
  )

}
