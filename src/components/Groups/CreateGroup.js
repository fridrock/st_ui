import { useState } from "react"
import { useAuthFetch, USERS_ENDPOINT } from "../../utils"
import Button from "../default/Button"

export default function CreateGroup({setTab}){
    const [name, setName] = useState('')
    const authFetch = useAuthFetch()
    async function submitForm(e){
        e.preventDefault()
        const response = await authFetch(`${USERS_ENDPOINT}/groups`, {
            method: "POST",
            body: JSON.stringify({name})
        })
        if (response.status == 200){
            setTab("list")
        }
    }
    return (
        <form className="flex flex-col border-2 border-black mt-10 p-5">
            <label className="mb-5">Group name</label>
            <input onChange={(e)=>setName(e.target.value)} value={name} className="mb-5" placeholder="name"></input>
            <Button onClick={submitForm} text="Create" ></Button>
        </form>
    )
}