import { useAuthFetch, USERS_ENDPOINT } from "../../utils"
import Button from "../default/Button"

export default function SuggestedStudent({group,suggested, deleteFromState}){
    const authFetch = useAuthFetch()
    async function addToGroup(){
        console.log({
            groupId: group.id,
            studentId: suggested.id
        })
        const response = await authFetch(`${USERS_ENDPOINT}/groups/add-student`, {
            method:"POST",
            body:JSON.stringify({
                groupId: group.id,
                studentId: suggested.id
            })
        })
        if(response.status == 200){
            deleteFromState()
        }
    }
    return (
        <div className="flex justify-between w-6/12 p10 border-2 border-black mt-5">
            <p>{`${suggested.name} ${suggested.surname} ${suggested.thirdName}`}</p>
            <Button text="Add to group" onClick={addToGroup}></Button>
        </div>
    )
}