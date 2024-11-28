import {useState} from "react"
import Button from "../default/Button"
import { myFetch, USERS_ENDPOINT } from "../../utils"
import { useAppState } from "../../store"

export default function AuthPage(){
    const [form, setForm] = useState({
        email: '',
        password:''
    })
    const setPage = useAppState().setCurPage
    const setUserInfo = useAppState().setUserInfo

    async function submitForm(e){
        e.preventDefault()
        const response = await myFetch(`${USERS_ENDPOINT}/users/auth`, "POST", form)
        if(response.status===200){
            let body = await response.json();
            setUserInfo({
                authorized: true,
                authToken: body.accessToken,
                roleName: body.roleName
            })
            setPage('main')
        }
    }
    return (
        <>
        <h3>Auth form</h3>
        <form className="mt-10 flex w-6/12 border-2 border-black p-10 flex-col">
            <input type="text" placeholder="Email" className="mt-5" onChange={(e)=>setForm({...form, email: e.target.value})} value={form.email}></input>
            <input type="text" placeholder="Password" className="mt-5 mb-5" onChange={(e)=>setForm({...form, password: e.target.value})} value={form.password}></input>
            <Button onClick={(e)=>submitForm(e)} text="Log in"></Button>
        </form>
        </>
    )
}