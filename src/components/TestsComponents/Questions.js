import { useEffect, useState } from "react"
import { TESTS_ENDPOINT, useAuthFetch } from "../../utils"
import Question from "./Question"

export default function Questions({test}){
    const [questions, setQuestions] = useState([])
    const authFetch = useAuthFetch()
    async function getQuestions(){
        const response = await authFetch(`${TESTS_ENDPOINT}/tests/${test.id}`, {method:"GET"})
        if(response.status == 200){
            let body = await response.json()
            setQuestions(body?body.questions:[])
        }
    }
    useEffect(()=>{
        getQuestions()
    }, [])

    function deleteQuestion(question){
        setQuestions(questions.filter(q=>q.id!=question.id))
    }
    return (
        <div className="flex flex-col w-screen justify-start items-center">
            <h1>Questions</h1>
            {questions && questions.map((q,index)=><Question deleteFromState={()=>deleteQuestion(q)} question={q} key={index}></Question>)}
        </div>
    )
}