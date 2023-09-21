import './styles/app.css'
import Insert              from './components/insert/index.js'
import Panel               from './components/panel/index.js'
import Table               from './components/table/index.js'
import {SelectionProvider} from './contexts/selectionContext.js'
import {ThemeProvider}     from './contexts/themeContext.js'
import {TodosProvider}     from './contexts/todosContext.js'

const App = () => {
	return (
		<ThemeProvider>
			<TodosProvider>
				<SelectionProvider>
					<div className={'app'}>
						<Panel title={'Insert Row'}>
							<Insert/>
						</Panel>
						<Panel style={{flex: 1}}>
							<Table/>
						</Panel>
					</div>
				</SelectionProvider>
			</TodosProvider>
		</ThemeProvider>
	)
}

export default App
