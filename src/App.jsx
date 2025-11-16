import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { AssistantSection, CasesSection, TasksSection, ClientsSection, BillingSection, SettingsSection } from './components/Sections'

function App() {
  const [active, setActive] = useState('assistant')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderSection = () => {
    switch (active) {
      case 'assistant':
        return <AssistantSection />
      case 'cases':
        return <CasesSection />
      case 'tasks':
        return <TasksSection />
      case 'clients':
        return <ClientsSection />
      case 'billing':
        return <BillingSection />
      case 'settings':
        return <SettingsSection />
      default:
        return <div className="bg-white border rounded-lg p-5">Coming soon...</div>
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header onToggleSidebar={() => setSidebarOpen(v => !v)} />
      <div className="flex">
        <Sidebar active={active} setActive={setActive} open={sidebarOpen} />
        <main className="flex-1 p-4 lg:p-6 space-y-4 lg:ml-0 ml-72">
          {renderSection()}
        </main>
      </div>
    </div>
  )
}

export default App
