import s from './style.module.css'

const Panel = ({title, style, children}) => {
	return (
		<div className={s.panel} style={style}>
			<div className={s.title}>{title}</div>
			<div className={s.scroll}>
				{children}
			</div>
		</div>
	)
}

export default Panel