// noinspection JSValidateTypes

import {useSelection, useSelectionDispatch} from '../../contexts/selectionContext.js'
import {useTodos, useTodosDispatch}         from '../../contexts/todosContext.js'
import s                                    from './style.module.css'


const Table = () => {
	const todos = useTodos()
	const dispatchTodo = useTodosDispatch()
	const selection = useSelection()
	const dispatchSelection = useSelectionDispatch()

	const onChange = (todo, key, value) => {
		console.log(key, value)
		dispatchTodo({
			type: 'changed',
			todo: {
				...todo,
				[key]: value
			}
		})
	}

	const onSelect = (id) => {
		dispatchSelection({
			type: 'changed',
			selection: id
		})
	}

	return (
		<table className={s.table}>
			<thead>
			<tr>
				<th>
					<div>Name</div>
				</th>
				<th>Age</th>
				<th>Subscription</th>
				<th>Employment</th>
			</tr>
			</thead>
			<tbody>
			{todos.map(todo => {
				return (
					<tr key={todo.id} onClick={() => onSelect(todo.id)}
						className={todo.id === selection ? s.selected : ''}>
						<td>
							<input
								size={1}
								type={'text'}
								value={todo.name}
								onChange={e => onChange(todo, 'name', e.target.value)}
							/>
						</td>
						<td>
							<input
								size={1}
								type={'text'}
								value={todo.age}
								onChange={e => {
									const number = Number(e.target.value)
									onChange(todo, 'age', isNaN(number) || number < 0 ? 0 : number)
								}}
							/>
						</td>
						<td>
							<select
								value={todo.subscription}
								onChange={e => onChange(todo, 'subscription', e.target.value)}
							>
								<option value={'Subscribed'}>Subscribed</option>
								<option value={'Unsubscribed'}>Unsubscribed</option>
								<option value={'Other'}>Other</option>
							</select>
						</td>
						<td>
							<select
								value={todo.employment}
								onChange={e => onChange(todo, 'employment', e.target.value)}
							>
								<option value={true}>Employed</option>
								<option value={false}>Unemployed</option>
							</select>
						</td>
					</tr>
				)
			})}
			</tbody>
		</table>
	)
}

export default Table