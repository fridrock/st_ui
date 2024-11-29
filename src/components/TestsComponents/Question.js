import { TESTS_ENDPOINT, useAuthFetch } from "../../utils"
import Button from "../default/Button"
import ResponseView from "./ResponseView"

export default function Question({question, deleteFromState}){
    console.log("getting question")
    console.log(question)
    const authFetch = useAuthFetch()
    async function deleteQuestion(){
        const response = await authFetch(`${TESTS_ENDPOINT}/questions/${question.id}`, {method:"DELETE"})       
        if(response.status == 200){
            deleteFromState()
        }
    }
    return (
        <div className="border-2 border-black p-5">
            <p className="text-xl">{question.questionText}</p>
            <h3>Responses:</h3>
            {question.responses && question.responses.map((r, index)=> <ResponseView response={r} key={index}></ResponseView>)}
            <Button text="Delete" onClick={deleteQuestion}></Button>
        </div>
    )
}