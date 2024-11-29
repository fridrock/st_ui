import Button from "../default/Button";

export default function GroupElement({group, setTab, setChoosenGroup}){
    function choooseGroup(){
        setTab('groupDescription')
        setChoosenGroup(group)
    }
    return (
        <div className="p-5 w-6/12 m-5 border-2 border-black">
            <p>{group.name}</p>
            <Button text="Edit Group" onClick={choooseGroup}></Button>
        </div>
    )
}