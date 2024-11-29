import Button from "../default/Button";

export default function TestElement({test, setTab, setChoosenTest}){
    function choooseTest(){
        setTab('testDescription')
        setChoosenTest(test)
    }
    return (
        <div className="p-5 w-6/12 m-5 border-2 border-black">
            <p>{test.name}</p>
            <Button text="Edit Test" onClick={choooseTest}></Button>
        </div>

    )
}
