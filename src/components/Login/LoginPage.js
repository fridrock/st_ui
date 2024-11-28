import { useState } from "react"
import RegPage from "./RegPage"
import AuthPage from "./AuthPage"
import Button from "../default/Button"

export default function LoginPage(){
    const [tab, setTab] = useState('auth')
    return (
        <div className="flex justify-center items-center w-full flex-col">
            <div className="flex gap-4 justify-center">
                <Button onClick={()=>setTab("auth")} text="Auth"></Button>
                <Button onClick={()=>setTab("reg")} text="Reg"></Button>
            </div>
            {tab === "auth" ? <AuthPage></AuthPage> : <RegPage></RegPage>}
        </div>
    )
}