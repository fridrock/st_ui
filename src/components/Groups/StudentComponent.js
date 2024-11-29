import Button from "../default/Button";

export default function StudentComponent({student, deleteFromGroup}){
    return (
        <div className="flex flex-col w-screen border-2 border-black mt-5">
            <p>{`${student.name} ${student.surname} ${student.thirdName}`}</p>
            <Button onClick={deleteFromGroup} text="Delete from group"></Button>
        </div>
    )
}