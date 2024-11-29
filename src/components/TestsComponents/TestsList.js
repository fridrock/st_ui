import { useEffect, useState } from "react"
import { useAuthFetch, TESTS_ENDPOINT } from "../../utils"
import TestElement from "./TestElement"

export default function TestsList({setTab, setChoosenTest}){
    const [tests, setTests] = useState([])
    const authFetch = useAuthFetch()

    async function getTests(){
        const response = await authFetch(`${TESTS_ENDPOINT}/tests`, {
            method:"GET"
        })
        if (response.status == 200){
            const body = await response.json()
            setTests(body?body:[])
        }
    }

    useEffect(()=>{
        getTests()
    }, [])

    return (
        <div className="flex flex-col w-screen items-center">
            {tests && tests.map(t=><TestElement test={t} setTab={setTab} setChoosenTest={setChoosenTest}></TestElement>)}
        </div>
    )
}