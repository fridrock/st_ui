import { useEffect, useState } from "react";
import { TESTS_ENDPOINT, useAuthFetch } from "../../utils";
import MyResult from "./MyResult";

export default function MyResults(){
    const [results, setResults] = useState([])
    const authFetch = useAuthFetch()
    async function getResults(){
        const response = await authFetch(`${TESTS_ENDPOINT}/results`, {method:"GET"})
        if(response.status == 200){
            const body = await response.json()
            setResults(body?body:[])
        }
    }
    useEffect(()=>{
        getResults()
    }, [])
    return (
        <div className="flex flex-col justify-start items-center mt-10 w-screen">
            <h2 className="text-xl">My Results</h2>
            {results && results.map((r,index)=><MyResult key={index} result={r}></MyResult>)}
        </div>
    )
}