import { useState } from "react"
import SuggestedStudent from "./SuggestedStudent"
import { useAuthFetch, USERS_ENDPOINT } from "../../utils"

export default function AddStudent({group}){
    const [email, setEmail] = useState('')
    const [suggested, setSuggested] = useState([])
    const authFetch = useAuthFetch()
    function deleteFromSuggested(student){
        setSuggested(suggested => suggested.filter(s=>s.id!=student.id))
    }
    async function onEmailUpdate(e){
        setEmail(e.target.value)
        let response = await authFetch(`${USERS_ENDPOINT}/users/byEmail?${new URLSearchParams({email: email})}`, {
            method: "GET",
        })
        if (response.status == 200){
            let body = await response.json()
            if (body){
                body = body.filter(st=>st.groupId != group.id)
            }
            console.log(body)
            setSuggested(body?body:[])
        }
    }
    return (
        <div className="border-1 border-black">
            <form>
                <label>Input email</label>
                <input type="text" onChange={onEmailUpdate} value={email} placeholder="Email"></input>
            </form>
            <div className="suggested">
                {suggested && suggested.map(suggested => <SuggestedStudent key={suggested.id} group={group} suggested={suggested} deleteFromState={()=>deleteFromSuggested(suggested)}/>)}
            </div>
        </div>
    )
}
    