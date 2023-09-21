// noinspection JSValidateTypes

import {useState}                           from 'react'
import {useSelection, useSelectionDispatch} from '../../contexts/selectionContext.js'
import {useTheme, useThemeDispatch}         from '../../contexts/themeContext.js'
import {useTodosDispatch}                   from '../../contexts/todosContext.js'
import s                                    from './style.module.css'

const Insert = () => {
	const dispatchTodo = useTodosDispatch()
	const dispatchTheme = useThemeDispatch()
	const theme = useTheme()
	const selection = useSelection()
	const dispatchSelection = useSelectionDispatch()

	const [name, setName] = useState('')
	const [age, setAge] = useState(0)
	const [subscription, setSubscription] = useState('Subscribed')
	const [employment, setEmployment] = useState(false)
	const [lastId, setLastId] = useState(localStorage.getItem('lastId') || 0)

	const onAgeChange = (e) => {
		const number = Number(e.target.value)
		setAge(isNaN(number) || number < 0 ? 0 : number)
	}

	const onAgeDown = () => {
		setAge(age => age > 0 ? age - 1 : 0)
	}

	const onAgeUp = () => {
		setAge(age => age + 1)
	}

	const onThemeChange = () => {
		dispatchTheme({
			type: 'changed',
			theme: theme === 'dark' ? 'light' : 'dark'
		})
	}

	const onInsert = () => {
		if (name.length === 0) return alert('Enter a name')
		if (age.length === 0) return alert('Enter an age')
		if (age === 0) return alert('Age cannot be 0')


		const nextId = lastId + 1
		setLastId(nextId)
		localStorage.setItem('lastId', nextId)
		dispatchTodo({
			type: 'added',
			id: nextId,
			name,
			age,
			subscription,
			employment
		})
	}

	const onDelete = () => {
		if (selection) {
			dispatchTodo({
				type: 'deleted',
				id: selection
			})
			dispatchSelection({
				type: 'changed',
				selection: null
			})
		}
	}

	return (
		<div className={s.insert}>
			<div className={s.field}>
				<input type={'text'} placeholder={'Name'} value={name} onChange={e => setName(e.target.value)}/>
			</div>
			<div className={s.field}>
				<input type={'text'} placeholder={'Age'} value={age} onChange={onAgeChange}/>
				<div className={s.updown} style={{paddingBottom: 8}} onClick={onAgeDown}>⌄</div>
				<div className={s.updown} style={{paddingTop: 8}} onClick={onAgeUp}>⌃</div>
			</div>
			<div className={s.field}>
				<select value={subscription} onChange={e => setSubscription(e.target.value)}>
					<option value={'Subscribed'}>Subscribed</option>
					<option value={'Unsubscribed'}>Unsubscribed</option>
					<option value={'Other'}>Other</option>
				</select>
			</div>
			<div className={s.field} style={{border: 'none'}} onClick={() => setEmployment(employment => !employment)}>
				<div className={employment ? s.checked : s.unchecked}>{employment ? '✓' : ''}</div>
				<span style={{marginLeft: 5}}>Employed</span>
			</div>
			<div className={s.button}
				 onClick={onInsert}>Insert
			</div>
			<div className={s.line}></div>
			<div className={s.field} style={{border: 'none'}} onClick={onThemeChange}>
				<div className={s.radio}>
					<div className={theme === 'light' ? s.radioChecked : s.radioUnchecked}></div>
				</div>
				<span style={{marginLeft: 5}}>Mode</span>
			</div>
			<div className={[s.button, selection === null ? s.disabled : ''].join(' ')} onClick={onDelete}>Delete</div>
		</div>
	)
}

export default Insert