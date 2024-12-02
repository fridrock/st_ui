import Button from "../default/Button";

export default function MyTest({test, startTest}){
    return (
        <div className="flex flex-row justify-start items-center p-10 border-2 border-black mt-5">
            {test.name}
            <Button text="Start test" onClick={startTest}></Button>
        </div>
    )
}