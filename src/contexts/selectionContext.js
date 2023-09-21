import {createContext, useContext, useReducer} from 'react'

const SelectionContext = createContext(null)

const SelectionDispatchContext = createContext(null)

const selectionReducer = (selection, action) => {
	switch (action.type) {
		case 'changed': {
			return action.selection
		}
		default: {
			throw Error('Unknown action: ' + action.type)
		}
	}
}

export const SelectionProvider = ({children}) => {
	const [selection, dispatch] = useReducer(selectionReducer, null)

	return (
		<SelectionContext.Provider value={selection}>
			<SelectionDispatchContext.Provider value={dispatch}>
				{children}
			</SelectionDispatchContext.Provider>
		</SelectionContext.Provider>
	)
}

export const useSelection = () => useContext(SelectionContext)

export const useSelectionDispatch = () => useContext(SelectionDispatchContext)