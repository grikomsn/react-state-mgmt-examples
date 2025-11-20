import { useReducer, useState } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

type FilterType = 'all' | 'active' | 'completed'

interface State {
  todos: Todo[]
  filter: FilterType
}

type Action =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DELETE_TODO'; id: number }
  | { type: 'SET_FILTER'; filter: FilterType }
  | { type: 'CLEAR_COMPLETED' }

const initialState: State = {
  todos: [
    { id: 1, text: 'Learn useReducer', completed: true },
    { id: 2, text: 'Build todo app', completed: false },
    { id: 3, text: 'Master state management', completed: false },
  ],
  filter: 'all',
}

function todoReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.text,
            completed: false,
          },
        ],
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      }
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.filter,
      }
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      }
    default:
      return state
  }
}

const UseReducerExample = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState)
  const [input, setInput] = useState('')

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed
    if (state.filter === 'completed') return todo.completed
    return true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', text: input })
      setInput('')
    }
  }

  const activeCount = state.todos.filter(t => !t.completed).length
  const completedCount = state.todos.filter(t => t.completed).length

  return (
    <div className="example-container">
      <div className="example-header">
        <h1>useReducer Hook</h1>
        <p>Todo list with complex state management and filters</p>
      </div>

      <div className="example-section">
        <h2>Add Todo</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
            style={{ flex: 1 }}
          />
          <button type="submit">Add</button>
        </form>
      </div>

      <div className="example-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0 }}>Todos</h2>
          <div style={{ fontSize: '0.875rem', color: '#999' }}>
            {activeCount} active • {completedCount} completed
          </div>
        </div>

        <div className="button-group" style={{ marginBottom: '1rem' }}>
          <button
            className={state.filter === 'all' ? '' : 'secondary'}
            onClick={() => dispatch({ type: 'SET_FILTER', filter: 'all' })}
          >
            All
          </button>
          <button
            className={state.filter === 'active' ? '' : 'secondary'}
            onClick={() => dispatch({ type: 'SET_FILTER', filter: 'active' })}
          >
            Active
          </button>
          <button
            className={state.filter === 'completed' ? '' : 'secondary'}
            onClick={() => dispatch({ type: 'SET_FILTER', filter: 'completed' })}
          >
            Completed
          </button>
          <button
            className="danger"
            onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
            disabled={completedCount === 0}
          >
            Clear Completed
          </button>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                background: '#1a1a1a',
                borderRadius: '4px',
                marginBottom: '0.5rem',
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span
                style={{
                  flex: 1,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#666' : '#e0e0e0',
                }}
              >
                {todo.text}
              </span>
              <button
                className="danger"
                onClick={() => dispatch({ type: 'DELETE_TODO', id: todo.id })}
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
              >
                Delete
              </button>
            </li>
          ))}
          {filteredTodos.length === 0 && (
            <li style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
              No todos to display
            </li>
          )}
        </ul>
      </div>

      <div className="example-section">
        <h2>Key Concepts</h2>
        <ul style={{ color: '#999', lineHeight: '1.8' }}>
          <li><code>useReducer</code> is ideal for complex state logic with multiple sub-values</li>
          <li>Centralizes state update logic in a reducer function</li>
          <li>Actions describe "what happened" rather than "how to update"</li>
          <li>Makes state transitions explicit and predictable</li>
          <li>Better for state that depends on previous state or involves multiple operations</li>
        </ul>
      </div>
    </div>
  )
}

export default UseReducerExample
