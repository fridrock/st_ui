export default function ResponseView({response}){
    return (
        <div className="flex flex-cor justify-start items-center">
            <p>{response.responseText}</p>
            <input type="checkbox" checked={response.correctness} disabled className="ml-5"></input>
        </div>
    )
}