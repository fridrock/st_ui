import { useState } from "react"
import { TESTS_ENDPOINT, useAuthFetch} from "../../utils"
import Button from "../default/Button"

export default function CreateTest({setTab}){
    const [name, setName] = useState('')
    const authFetch = useAuthFetch()
    async function submitForm(e){
        e.preventDefault()
        const response = await authFetch(`${TESTS_ENDPOINT}/tests`, {
            method: "POST",
            body: JSON.stringify({name})
        })
        if (response.status == 200){
            setName('')
            setTab("list")
        }
    }
    return (
        <form className="flex flex-col border-2 border-black mt-10 p-5">
            <label className="mb-5">Test name</label>
            <input onChange={(e)=>setName(e.target.value)} value={name} className="mb-5" placeholder="name"></input>
            <Button onClick={submitForm} text="Create" ></Button>
        </form>
    )
}