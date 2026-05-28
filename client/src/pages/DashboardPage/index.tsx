import {
  Calendar,
  Boxes,
  Wrench,
  DollarSign,
} from 'lucide-react'

const cards = [
  {
    title: 'Locações Ativas',
    value: 24,
    icon: Calendar,
  },
  {
    title: 'Total no Inventário',
    value: 320,
    icon: Boxes,
  },
  {
    title: 'Em Manutenção',
    value: 8,
    icon: Wrench,
  },
  {
    title: 'Faturamento',
    value: '$12.400',
    icon: DollarSign,
  },
]

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="text-6xl font-black tracking-tight">
          Painel de Controle
        </h1>

        <p className="mt-4 text-lg text-gray-400">
          Visão geral das operações em tempo real.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon

          return (
            <div
              key={card.title}
              className="rounded-3xl border border-white/10 bg-[#101726] p-6 transition-all duration-300 hover:translate-y-[-4px] hover:border-cyan-400/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">
                    {card.title}
                  </p>

                  <h2 className="mt-4 text-5xl font-black">
                    {card.value}
                  </h2>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                  <Icon size={28} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
