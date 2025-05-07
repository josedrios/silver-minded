export default function TerminalBox({
    children,
    title='NULL',
    variant='primary',
    className='',
    isRight= false
}){
    return (
        <div className={`terminal-box-container ${variant}`}>
            <p className="terminal-box-header">{title}</p>
            <div className="terminal-box-body">{children}</div>
        </div>
    )
}