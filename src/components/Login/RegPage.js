import { useAppState } from "../../store"
import { USERS_ENDPOINT , myFetch} from "../../utils"
import Button from "../default/Button"
import {useState} from "react"

export default function RegPage(){
    const [form, setForm] = useState({
        name:'',
        surname:'',
        thirdName:'',
        email: '',
        password:'',
        roleName:'STUDENT'
    })
    const setPage = useAppState().setCurPage
    const setUserInfo = useAppState().setUserInfo

    async function submitForm(e){
        e.preventDefault()
        const response = await myFetch(`${USERS_ENDPOINT}/users/reg`, "POST", form)
        if(response.status==200){
            let body = await response.json();
            setUserInfo({
                authorized: true,
                authToken: body.accessToken,
                roleName: body.roleName
            })
            setPage('main')
        }
        // let r2 = await authFetch(`${USERS_ENDPOINT}/users/byEmail?${new URLSearchParams({email:'j'}).toString()}`,{
        //     method: "GET"
        // })
        // console.log(await r2.json())
    }
    
    return (
        <>
        <h3>Auth form</h3>
        <form className="mt-10 flex w-6/12 border-2 border-black p-10 flex-col">
            <input type="text" placeholder="Name" className="mt-5" onChange={(e)=>setForm({...form, name: e.target.value})} value={form.name}></input>
            <input type="text" placeholder="Surname" className="mt-5" onChange={(e)=>setForm({...form, surname: e.target.value})} value={form.surname}></input>
            <input type="text" placeholder="Thirdname" className="mt-5" onChange={(e)=>setForm({...form, thirdName: e.target.value})} value={form.thirdName}></input>
            <input type="text" placeholder="Email" className="mt-5" onChange={(e)=>setForm({...form, email: e.target.value})} value={form.email}></input>
            <input type="text" placeholder="Password" className="mt-5" onChange={(e)=>setForm({...form, password: e.target.value})} value={form.password}></input>
            <fieldset className="mt-5 mb-5">
                <legend className="mb-5">Выберите свою роль:</legend>

                <label>
                    <input
                        type="radio"
                        name="role"
                        value="Student"
                        checked={form.roleName === 'STUDENT'}
                        onChange={(e)=>setForm({...form, roleName: e.target.value.toUpperCase()})}
                    />
                Student
                </label>

                <label className="ml-5">
                <input
                    type="radio"
                    name="role"
                    value="Teacher"
                    checked={form.roleName === 'TEACHER'}
                    onChange={(e)=>setForm({...form, roleName: e.target.value.toUpperCase()})}
                />
                Teacher
                </label>
            </fieldset>
            <Button onClick={(e)=>submitForm(e)} text="Log in"></Button>
        </form>
        </>
    )
}