import {createContext, useContext, useReducer} from 'react'

const ThemeContext = createContext(null)

const ThemeDispatchContext = createContext(null)

const themeReducer = (theme, action) => {
	switch (action.type) {
		case 'changed': {
			localStorage.setItem('theme', action.theme)
			return action.theme
		}
		default: {
			throw Error('Unknown action: ' + action.type)
		}
	}
}

export const ThemeProvider = ({children}) => {
	const [theme, dispatch] = useReducer(themeReducer, localStorage.getItem('theme') || 'dark')

	return (
		<ThemeContext.Provider value={theme}>
			<ThemeDispatchContext.Provider value={dispatch}>
				<div data-theme={theme}>
					{children}
				</div>
			</ThemeDispatchContext.Provider>
		</ThemeContext.Provider>
	)
}

export const useTheme = () => useContext(ThemeContext)

export const useThemeDispatch = () => useContext(ThemeDispatchContext)