import { useState } from "react"
import Button from "../default/Button"
import GroupsList from "./GroupsList"
import AddGroup from "./AddGroup"
import Questions from "./Questions"
import AddQuestion from "./AddQuestion"

export default function TestDescription({test, goBack}){
    const [tab, setTab] = useState('questions')
    return (
        <div className="flex flex-col justify-start items-center">
            <div className="mt-5 flex w-screen justify-between items-center flex-row border-2 p-5 border-black">
                <Button text="Back" onClick={goBack}></Button>
                <h1 className="ml-5">{test.name}</h1>
                <Button text="Questions" onClick={()=>setTab("questions")} highlighted={tab==="questions"}></Button>
                <Button text="Add question" onClick={()=>setTab("addQuestion")} highlighted={tab==="addQuestion"}></Button>
                <Button text="List of groups" onClick={()=>setTab("list")} highlighted={tab==="list"}></Button>
                <Button text="Add group" onClick={()=>setTab("add")} highlighted={tab=== "add"}></Button>
            </div>
            {tab == "questions" && <Questions test={test}></Questions>}
            {tab == "addQuestion" && <AddQuestion test={test}></AddQuestion>}
            {tab == "list" && <GroupsList test={test}></GroupsList>}
            {tab == "add" && <AddGroup test={test}></AddGroup>}
        </div>
    )
}