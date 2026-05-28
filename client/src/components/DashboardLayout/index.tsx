import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#070B14] text-white">
      <Sidebar />
      <main className="ml-[290px] flex-1 p-10">
        <Outlet />
      </main>
    </div>
  )
}
