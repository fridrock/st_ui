import { useEffect, useState } from "react"
import { useAuthFetch, USERS_ENDPOINT } from "../../utils"
import Button from "../default/Button"
import CreateGroup from "./CreateGroup"
import GroupsList from "./GroupsList"

export default function Groups(){
    const [tab, setTab] = useState('list')
    // const authFetch = useAuthFetch()
    // async function callSomething(){
    //     const response = await authFetch(`${USERS_ENDPOINT}/users/byEmail?${new URLSearchParams({email:"j"})}`, {method:"GET"})
    //     console.log(await response.json())
    // }
    // useEffect(()=>{
    //     callSomething()
    // },[])
    return (
        <div className="flex flex-col justify-start items-center">
            <div className="flex justify-around w-2/12">
                <Button text="My groups" onClick={()=>setTab('list')} highlighted={tab === "list"}></Button>
                <Button text="Create group" onClick={()=>setTab("create")} highlighted={tab === "create"}></Button>
            </div>
            <div className="flex width-screen">
                {tab === "create" && <CreateGroup setTab={setTab}></CreateGroup>}
                {tab === "list" && <GroupsList setTab={setTab}></GroupsList>}
            </div>
        </div>
    )
}