import { useEffect, useState } from "react"
import SuggestedGroup from "./SuggestedGroup"
import { TESTS_ENDPOINT, useAuthFetch, USERS_ENDPOINT} from "../../utils"

export default function AddGroup({test}){
    const [groups, setGroups] = useState([])
    const [ids, setIds] = useState([])
    const authFetch = useAuthFetch()
    async function getState(){
        let response = await authFetch(`${TESTS_ENDPOINT}/tests-groups?${new URLSearchParams({testId: test.id})}`, {
            method: "GET",
        })
        if(response.status == 200){
            let groupsInTest = await response.json()
            response = await authFetch(`${USERS_ENDPOINT}/groups/byTeacher`, {
                method: "GET",
            })
            if (response.status == 200){
                let groups = await response.json()
                if (groups){
                    groups = groups.filter(gr=>!groupsInTest.includes(gr.id))
                }
                setGroups(groups?groups:[])
                setIds(groupsInTest?groupsInTest:[])
            }   
        }
    }
    useEffect(()=>{
        getState()
    }, [])
    
    function addToGroupsIds(groupId){
        setIds([...ids, groupId])
    }
    function deleteFromSuggested(group){
        setGroups(groups=>groups.filter(g=>g.id!=group.id))
    }
    
    
    return (
        <div className="border-1 border-black">
            <div className="suggested">
                {groups && groups.map(suggested => <SuggestedGroup key={suggested.id} test={test} suggested={suggested} deleteFromState={()=>deleteFromSuggested(suggested)} addToGroupsIds={()=>addToGroupsIds(suggested.id)}/>)}
            </div>
        </div>
    )
}
    