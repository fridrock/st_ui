import { useState } from "react"
import Button from "../default/Button"
import CreateTest from "./CreateTest"
import TestsList from "./TestsList"
import TestDescription from "./TestDescription"

export default function Tests(){
    const [tab, setTab] = useState('list')
    const [choosenTest, setChoosenTest] = useState(null)
    function goBack(){
        setChoosenTest(null)
        setTab("list")
    }
    return (
        <div className="flex flex-col justify-start items-center">
            <div className="flex justify-around w-2/12">
                <Button text="My tests" onClick={()=>setTab('list')} highlighted={tab === "list"}></Button>
                <Button text="Create test" onClick={()=>setTab("create")} highlighted={tab === "create"}></Button>
            </div>
            <div className="flex width-screen">
                {tab === "create" && <CreateTest setTab={setTab}></CreateTest>}
                {tab === "list" && <TestsList setTab={setTab} setChoosenTest={setChoosenTest}></TestsList>}
                {tab === "testDescription" && choosenTest && <TestDescription test={choosenTest} goBack={goBack}></TestDescription>}
            </div>
        </div>
    )
}