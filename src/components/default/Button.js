export default function Button({onClick, text, visible = true, highlighted = false}){
    const color = highlighted?'bg-blue-700':'bg-blue-500'
    return (
        <>
            {visible && <button onClick={onClick} className={`${color} hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition bg duration-500 ease-in-out`}>{text}</button>}
        </>
    )
}