export default function MyTest({test}){
    return (
        <div className="flex flex-row justify-start items-center p-10 border-2 border-black mt-5">
            {test.name}
        </div>
    )
}