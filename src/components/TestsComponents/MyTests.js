import { useEffect, useState } from "react"
import MyTest from "./MyTest"
import { TESTS_ENDPOINT, useAuthFetch, USERS_ENDPOINT } from "../../utils"
import RunningTest from "./RunningTest"

export default function MyTests(){
    const [tests, setTests] = useState([])
    const [startedTest, setStartedTest] = useState(null)
    const authFetch = useAuthFetch()
    async function getTests(){
        const userInfo = await getUserInfo()
        const groupId = userInfo.groupId
        const response = await authFetch(`${TESTS_ENDPOINT}/tests-groups/byGroup/${groupId}`, {method:"GET"})
        const tests = await response.json()
        setTests(tests?tests:[])
    }

    async function getUserInfo(){
        const response = await authFetch(`${USERS_ENDPOINT}/users/userInfo`, {method:"GET"})
        if(response.status == 200){
            return response.json()
        }
    }
    useEffect(()=>{
        getTests()
    }, [])
    return (
        <div className="flex flex-col w-screen justify-start items-center">
            <h1 className="text-xl">My Tests</h1>
            {startedTest === null && tests && tests.map(t=><MyTest test={t} startTest={()=>setStartedTest(t)}></MyTest>)}
            {startedTest && <RunningTest test={startedTest} goBack={()=>setStartedTest(null)}></RunningTest>}
        </div>
    )
}