import { useEffect, useState } from "react";
import Button from "../default/Button";
import { TESTS_ENDPOINT, useAuthFetch, USERS_ENDPOINT } from "../../utils";
import StudentResult from "./StudentResult";


export default function GroupComponent({test, group, deleteFromTest}){
    const [resultsShown, setResultsShown] = useState(false)
    const [resultsList, setResultsList] = useState([]) 
    const authFetch = useAuthFetch()
    async function getResults(){
        const response = await authFetch(`${USERS_ENDPOINT}/users/byGroup?${new URLSearchParams({groupId: group.id})}`, {method:"GET"})
        if(response.status == 200){
            let users = await response.json()
            let results = await Promise.all(
                users.map(u=>getResult(u.id))
            )
            console.log(results)
            results = results.filter(r=>r!==undefined)
            console.log(results)
            if(results.length!=0){
                let combined = []
                for(let i = 0;i<users.length;i++){
                    combined.push(createUserInfoAndResult(users[i], results[i]))
                }
                setResultsList(combined)
            }
            
        }
    }

    async function getResult(userId){
        const response = await authFetch(`${TESTS_ENDPOINT}/results/studentResult?${new URLSearchParams({userId: userId, testId: test.id})}`)
        if(response.status == 200){
            return await response.json()
        }
    }
    function createUserInfoAndResult(user, result){
        return {
            name: user.name,
            surname: user.surname,
            thirdName: user.thirdName,
            correct: result.correct,
            maxCorrect: result.maxCorrect,
            testName: test.name
        }
    }
    useEffect(()=>{
        getResults()
    }, [])
    function toggleResults(){
        setResultsShown(!resultsShown)
    }
    return (
        <div className="flex flex-col justify-start items-center w-screen">
            <div className="flex flex-row justify-between items-center w-screen border-2 border-black mt-5">
                <p >{`${group.name}`}</p>
                <Button onClick={toggleResults} text={resultsShown?"Close results":"Show results"}></Button>
                <Button onClick={deleteFromTest} text="Delete from test"></Button>
            </div>
            {resultsShown && resultsList && resultsList.map((r,index)=><StudentResult key={index} result={r}></StudentResult>)}
        </div>
    )
}