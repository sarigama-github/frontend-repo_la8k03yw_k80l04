import { Search, Menu } from 'lucide-react'

export default function Header({ onToggleSidebar }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="lg:hidden p-2 rounded hover:bg-gray-100">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold">Legal Dashboard</h1>
      </div>
      <div className="hidden md:flex items-center gap-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Quick search..."
            className="pl-8 pr-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
      </div>
    </header>
  )
}
