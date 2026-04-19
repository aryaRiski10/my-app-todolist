import { useState } from 'react'
import './App.css'

import svgClose from '/close.svg'

function Form({ onAddItem }) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [checked, setChecked] = useState(false)

  function handlerClick() {
    if (!name) return

    // onAddItem({ name, quantity, checked })
    const newItem = { id: Date.now(), name, quantity, checked }
    onAddItem(newItem)

    setName('')
    setQuantity(1)
    setChecked(false)
  }

  function handlerQuantity() {
    setQuantity(quantity + 1)
  }

  return (
    <div className="form todo-input">
      <input className="input-item" type="text" placeholder="Add a new task" value={name} onChange={(e) => setName(e.target.value)} />
      <button className="btn-quantity" onClick={handlerQuantity}>{quantity}+</button>
      <button className="btn-add" onClick={handlerClick}>Add Task</button>
    </div>
  )
}

function List({ items, onToggleChecked, onRemoveItem }) {
  const [active, setActive] = useState('all')

  const filteredItems = items.filter((item) => {
    if (active === 'active') return !item.checked
    if (active === 'completed') return item.checked
    return true
  })

  const totalAll = items.length
  const totalActive = items.filter((item) => !item.checked).length
  const totalCompleted = items.filter((item) => item.checked).length

  return (
    <div className="todo-list mt-4">
      <div className="tabs-todo">
        <button className={`filter-btn ${active === 'all' ? 'active' : ''}`} onClick={() => setActive('all')}>({totalAll}) All</button>
        <button className={`filter-btn ${active === 'active' ? 'active' : ''}`} onClick={() => setActive('active')}>({totalActive}) Active</button>
        <button className={`filter-btn ${active === 'completed' ? 'active' : ''}`} onClick={() => setActive('completed')}>({totalCompleted}) Completed</button>
      </div>
      <h4 className="py-4 px-1">{filteredItems.length === 0 ? 'No items' : 'Lists'}</h4>
      <ul>
        {filteredItems.map((item, index) => (
          <li key={item.id}>
            <div className="item-list">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => onToggleChecked(item.id)}
              />
              <span style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>
                {item.name} ( {item.quantity} )
              </span>
            </div>
            <button className="btn-remove" onClick={() => onRemoveItem(item.id)}>
              <img src={svgClose} alt="Remove" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  const [items, setItems] = useState([])

  function handleAddItem(newItem) {
    setItems([...items, newItem])
  }

  function handleRemoveItem(id) {
    const newItems = items.filter((item) => item.id !== id)
    setItems(newItems)
  }

  function handleToggleChecked(id) {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    )
    setItems(newItems)
  }
  return (
    <div className="container todo max-w-[480px] p-4">
      <h1>My To-Do List App</h1>
      <Form onAddItem={handleAddItem} />
      <List items={items} onToggleChecked={handleToggleChecked} onRemoveItem={handleRemoveItem} />

    </div>
  )
}

export default App
