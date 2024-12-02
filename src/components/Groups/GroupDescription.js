import { useState } from "react"
import Button from "../default/Button"
import StudentsList from "./StudentsList"
import AddStudent from "./AddStudent"

export default function GroupDescription({group, goBack}){
    const [tab, setTab] = useState('list')
    return (
        <div className="flex flex-col justify-start items-center">
            <div className="mt-5 flex w-screen justify-between items-center flex-row border-2 p-5 border-black">
                <Button text="Back" onClick={goBack}></Button>
                <h1 className="ml-5">{group.name}</h1>
                <Button text="List of students" onClick={()=>setTab("list")} highlighted={tab==="list"}></Button>
                <Button text="Add" onClick={()=>setTab("add")} highlighted={tab=== "add"}></Button>
            </div>
            {tab == "list" && <StudentsList group={group}></StudentsList>}
            {tab == "add" && <AddStudent group={group}></AddStudent>}
        </div>
    )
}