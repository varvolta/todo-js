import {
	createContext,
	useContext,
	useReducer
} from 'react'

const TodosContext = createContext(null)

const TodosDispatchContext = createContext(null)

const todosReducer = (todos, action) => {
	switch (action.type) {
		case 'added': {
			const newTodos = [...todos, {
				id: action.id,
				name: action.name,
				age: action.age,
				subscription: action.subscription,
				employment: action.employment
			}]
			localStorage.setItem('todos', JSON.stringify(newTodos))
			return newTodos
		}
		case 'changed': {
			const newTodos = todos.map(todo => {
				if (todo.id === action.todo.id) {
					return action.todo
				} else {
					return todo
				}
			})
			localStorage.setItem('todos', JSON.stringify(newTodos))
			return newTodos
		}
		case 'deleted': {
			const newTodos = todos.filter(todo => todo.id !== action.id)
			localStorage.setItem('todos', JSON.stringify(newTodos))
			return newTodos
		}
		default: {
			throw Error('Unknown action: ' + action.type)
		}
	}
}

const initialTodos = JSON.parse(localStorage.getItem('todos') || '[]')

export const TodosProvider = ({children}) => {
	const [todos, dispatch] = useReducer(todosReducer, initialTodos)

	return (
		<TodosContext.Provider value={todos}>
			<TodosDispatchContext.Provider value={dispatch}>
				{children}
			</TodosDispatchContext.Provider>
		</TodosContext.Provider>
	)
}

export const useTodos = () => useContext(TodosContext)


export const useTodosDispatch = () => useContext(TodosDispatchContext)
