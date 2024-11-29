import { useAuthFetch, TESTS_ENDPOINT} from "../../utils"
import Button from "../default/Button"

export default function SuggestedGroup({test ,suggested, deleteFromState, addToGroupsIds}){
    const authFetch = useAuthFetch()
    async function addToTest(){
        const response = await authFetch(`${TESTS_ENDPOINT}/tests-groups`, {
            method:"POST",
            body:JSON.stringify({
                groupId: suggested.id,
                testId: test.id
            })
        })
        if(response.status == 200){
            deleteFromState()
            addToGroupsIds()
        }
    }
    return (
        <div className="flex justify-between w-6/12 p10 border-2 border-black mt-5">
            <p>{`${suggested.name}`}</p>
            <Button text="Add to test" onClick={addToTest}></Button>
        </div>
    )
}