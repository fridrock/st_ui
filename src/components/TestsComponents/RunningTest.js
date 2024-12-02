import { useState } from "react";
import Button from "../default/Button";
import { TESTS_ENDPOINT, useAuthFetch } from "../../utils";

export default function RunningTest({test, goBack}){
    const [studentResponses, setStudentResponses] = useState(mapPropsToState())
    const authFetch = useAuthFetch()
    function mapPropsToState(){
        let res = {}
        for (let i = 0;i<test.questions.length;i++){
            res[test.questions[i].id] = []
        }
        return res
    }
    function transformResponses(responses){
        return Object.entries(responses).map(([questionId, userResponsesIds]) => ({
          questionId: questionId,
          userResponsesIds: userResponsesIds
        }));
      };
    function handleChange(questionId, responseId){
        let newQuestionResponses = studentResponses[questionId]
        if (!newQuestionResponses.includes(responseId)){
            newQuestionResponses.push(responseId)
        }else{
            newQuestionResponses = newQuestionResponses.filter(r=>r != responseId)
        }
        setStudentResponses((prev)=>({
            ...prev,
            [questionId]: newQuestionResponses
        }))
    }
    async function checkResults(){
        let body = {
            testId: test.id,
            questionResponses: transformResponses(studentResponses)
        }
        let response = await authFetch(`${TESTS_ENDPOINT}/tests/check`, {
            method: "POST",
            body: JSON.stringify(body)
        })
        if(response.status == 200){
            goBack()
        }
    }
    console.log(test)
    return (
        <div className="flex flex-col justify-start items-center">
            <Button text="Go back" onClick={goBack}></Button>
            {test.questions && test.questions.map((question, index)=>(
                <div key={question.Id} className="flex flex-col justify-start items-start">
                    <h3 className="text-xl">{`${index + 1} ${question.questionText}`}</h3>
                        {question.responses.map((response) => (
                        <label key={response.id}>
                            <input
                            type="checkbox"
                            checked={studentResponses[question.id].includes(response.id)}
                            onChange={() => handleChange( question.id, response.id)}
                            />
                            {response.responseText}
                        </label>
                        ))}
                    <br />
              </div>
            ))}
            <Button text="Submit" onClick={checkResults}></Button>

        </div>
    )
}