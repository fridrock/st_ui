export default function Tab({onClick, text, visible = true}){
    return (
        <>
        {visible && <button className="btn" onClick={onClick}>{text}</button>}
        </>
    )

}