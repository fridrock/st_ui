import { useEffect, useState } from "react"
import { useAuthFetch, USERS_ENDPOINT } from "../../utils"
import Button from "../default/Button"
import CreateGroup from "./CreateGroup"
import GroupsList from "./GroupsList"
import GroupDescription from "./GroupDescription"

export default function Groups(){
    const [tab, setTab] = useState('list')
    const [choosenGroup, setChoosenGroup] = useState(null)
    function goBack(){
        setChoosenGroup(null)
        setTab("list")
    }
    return (
        <div className="flex flex-col justify-start items-center">
            <div className="flex justify-around w-2/12">
                <Button text="My groups" onClick={()=>setTab('list')} highlighted={tab === "list"}></Button>
                <Button text="Create group" onClick={()=>setTab("create")} highlighted={tab === "create"}></Button>
            </div>
            <div className="flex width-screen">
                {tab === "create" && <CreateGroup setTab={setTab}></CreateGroup>}
                {tab === "list" && <GroupsList setTab={setTab} setChoosenGroup={setChoosenGroup}></GroupsList>}
                {tab === "groupDescription" && choosenGroup && <GroupDescription group={choosenGroup} goBack={goBack}></GroupDescription>}
            </div>
        </div>
    )
}