import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function SectionCard({ title, description, children }) {
  return (
    <div className="bg-white border rounded-lg p-5 shadow-sm">
      <div className="mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      {children}
    </div>
  )
}

export function AssistantSection() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  const send = async () => {
    if (!input.trim()) return
    const payload = { role: 'user', content: input }
    await fetch(`${API}/assistant/messages`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setMessages(prev => [...prev, payload])
    setInput('')
  }

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${API}/assistant/messages`)
      const data = await res.json()
      setMessages(data)
    }
    load()
  }, [])

  return (
    <SectionCard title="AI Assistant" description="Ask legal questions, draft documents, and explore precedents.">
      <div className="space-y-3">
        <div className="h-64 overflow-y-auto border rounded p-3 bg-gray-50">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-sm">No messages yet. Ask something to get started.</p>
          ) : (
            <ul className="space-y-2">
              {messages.map((m, i) => (
                <li key={i} className="text-sm"><span className="font-semibold">{m.role}:</span> {m.content}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type your question..." className="flex-1 border rounded px-3 py-2" />
          <button onClick={send} className="bg-blue-600 text-white px-4 rounded">Send</button>
        </div>
      </div>
    </SectionCard>
  )
}

export function CasesSection() {
  const [title, setTitle] = useState('')
  const [list, setList] = useState([])
  const load = async () => {
    const res = await fetch(`${API}/cases`)
    const data = await res.json()
    setList(data)
  }
  useEffect(() => { load() }, [])
  const add = async () => {
    if (!title) return
    await fetch(`${API}/cases`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, client_id: 'demo', status: 'open' }) })
    setTitle('')
    load()
  }
  return (
    <SectionCard title="Cases" description="Track matters.">
      <div className="flex gap-2 mb-3">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New case title" className="flex-1 border rounded px-3 py-2" />
        <button onClick={add} className="bg-blue-600 text-white px-4 rounded">Add</button>
      </div>
      <ul className="divide-y">
        {list.map((c, i) => (
          <li key={i} className="py-2 text-sm flex items-center justify-between">
            <span>{c.title}</span>
            <span className="px-2 py-0.5 text-xs rounded bg-gray-100">{c.status}</span>
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}

export function TasksSection() {
  const [title, setTitle] = useState('')
  const [list, setList] = useState([])
  const load = async () => {
    const res = await fetch(`${API}/tasks`)
    const data = await res.json()
    setList(data)
  }
  useEffect(() => { load() }, [])
  const add = async () => {
    if (!title) return
    await fetch(`${API}/tasks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, status: 'todo' }) })
    setTitle('')
    load()
  }
  return (
    <SectionCard title="Tasks" description="Manage to-dos.">
      <div className="flex gap-2 mb-3">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task" className="flex-1 border rounded px-3 py-2" />
        <button onClick={add} className="bg-blue-600 text-white px-4 rounded">Add</button>
      </div>
      <ul className="divide-y">
        {list.map((t, i) => (
          <li key={i} className="py-2 text-sm flex items-center justify-between">
            <span>{t.title}</span>
            <span className="px-2 py-0.5 text-xs rounded bg-gray-100">{t.status}</span>
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}

export function ClientsSection() {
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const load = async () => {
    const res = await fetch(`${API}/clients`)
    const data = await res.json()
    setList(data)
  }
  useEffect(() => { load() }, [])
  const add = async () => {
    if (!name) return
    await fetch(`${API}/clients`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, type: 'individual' }) })
    setName('')
    load()
  }
  return (
    <SectionCard title="Clients" description="Manage clients.">
      <div className="flex gap-2 mb-3">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="New client" className="flex-1 border rounded px-3 py-2" />
        <button onClick={add} className="bg-blue-600 text-white px-4 rounded">Add</button>
      </div>
      <ul className="divide-y">
        {list.map((c, i) => (
          <li key={i} className="py-2 text-sm">{c.name}</li>
        ))}
      </ul>
    </SectionCard>
  )
}

export function BillingSection() {
  const [list, setList] = useState([])
  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${API}/invoices`)
      const data = await res.json()
      setList(data)
    }
    load()
  }, [])
  return (
    <SectionCard title="Billing" description="Track invoices and payments.">
      <ul className="divide-y">
        {list.map((inv, i) => (
          <li key={i} className="py-2 text-sm flex items-center justify-between">
            <span>Invoice {inv.number || inv._id?.slice(-6) || i + 1}</span>
            <span className="px-2 py-0.5 text-xs rounded bg-gray-100">{inv.status}</span>
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}

export function SettingsSection() {
  const [key, setKey] = useState('org.name')
  const [value, setValue] = useState('{"name":"My Firm"}')
  const [list, setList] = useState([])
  const load = async () => {
    const res = await fetch(`${API}/settings`)
    const data = await res.json()
    setList(data)
  }
  useEffect(() => { load() }, [])
  const add = async () => {
    try {
      const parsed = JSON.parse(value)
      await fetch(`${API}/settings`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key, value: parsed, scope: 'org' }) })
      load()
    } catch (e) {
      alert('Invalid JSON value')
    }
  }
  return (
    <SectionCard title="Settings" description="Configure your workspace.">
      <div className="flex gap-2 mb-3">
        <input value={key} onChange={e => setKey(e.target.value)} placeholder="Key" className="flex-1 border rounded px-3 py-2" />
        <input value={value} onChange={e => setValue(e.target.value)} placeholder="JSON value" className="flex-1 border rounded px-3 py-2" />
        <button onClick={add} className="bg-blue-600 text-white px-4 rounded">Save</button>
      </div>
      <ul className="divide-y">
        {list.map((s, i) => (
          <li key={i} className="py-2 text-sm flex items-center justify-between">
            <span>{s.key}</span>
            <span className="text-xs text-gray-500">{s.scope}</span>
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}
