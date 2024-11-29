import { useEffect, useState } from "react";
import { TESTS_ENDPOINT, useAuthFetch, USERS_ENDPOINT } from "../../utils";
import GroupComponent from "./GroupComponent";

export default function GroupsList({test}){
    const [groups, setGroups] = useState([])
    const authFetch = useAuthFetch()
    async function deleteFromTest(group){
        const response = await authFetch(`${TESTS_ENDPOINT}/tests-groups`,{
            method: "DELETE",
            body: JSON.stringify({
                groupId: group.id,
                testId: test.id
            })
        })
        if(response.status == 200){
            setGroups(groups=>groups.filter(gr=>gr.id!=group.id))
        }

    }

    async function getGroups(){
        const response = await authFetch(`${TESTS_ENDPOINT}/tests-groups?${new URLSearchParams({testId: test.id})}`,{
            method: "GET"
        })
        if (response.status == 200){
            let groups = await response.json()
            groups = await Promise.all(groups.map((id) => getGroupById(id)))
            setGroups(groups?groups:[])
        }
    }

    async function getGroupById(groupId){
        const response = await authFetch(`${USERS_ENDPOINT}/groups/${groupId}`, {
            method: "GET"
        })
        if(response.status == 200){
            return await response.json()
        }
    }
    useEffect(()=>{
        getGroups()
    },[])
    return (
        <div className="flex flex-col justify-start items-center">
            {groups && groups.map(gr=><GroupComponent key={gr.id} test={test} group={gr} deleteFromTest={()=>deleteFromTest(gr)}></GroupComponent>)}
        </div>
    )
}