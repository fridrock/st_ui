import { useEffect, useState } from "react"
import { useAuthFetch, USERS_ENDPOINT } from "../../utils"
import GroupElement from "./GroupElement"

export default function GroupList({setTab, setChoosenGroup}){
    const [groups, setGroups] = useState([])
    const authFetch = useAuthFetch()

    async function getGroups(){
        const response = await authFetch(`${USERS_ENDPOINT}/groups/byTeacher`, {
            method:"GET"
        })
        if (response.status == 200){
            const body = await response.json()
            setGroups(body?body:[])
        }
    }

    useEffect(()=>{
        getGroups()
    }, [])

    return (
        <div className="flex flex-col w-screen items-center">
            {groups && groups.map(g=><GroupElement key={g.id} group={g} setTab={setTab} setChoosenGroup={setChoosenGroup}></GroupElement>)}
        </div>
    )
}