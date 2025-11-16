import { Briefcase, ListChecks, FileText, Users, Receipt, Settings, Bot, BarChart3 } from 'lucide-react'

const nav = [
  { key: 'assistant', label: 'AI Assistant', icon: Bot },
  { key: 'cases', label: 'Cases', icon: Briefcase },
  { key: 'tasks', label: 'Tasks', icon: ListChecks },
  { key: 'documents', label: 'Documents', icon: FileText },
  { key: 'clients', label: 'Clients', icon: Users },
  { key: 'billing', label: 'Billing', icon: Receipt },
  { key: 'reports', label: 'Reports', icon: BarChart3 },
  { key: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ active, setActive, open }) {
  return (
    <aside className={`$${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed z-30 lg:static top-0 left-0 h-full w-72 bg-white border-r transition-transform`}>
      <div className="p-4 text-2xl font-bold">LexisPro</div>
      <nav className="px-2 space-y-1">
        {nav.map(item => {
          const Icon = item.icon
          const isActive = active === item.key
          return (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
