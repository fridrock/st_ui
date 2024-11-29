export default function MyResult({result}){
    return (
        <div className="flex flex-row justify-start items-center mt-5 border-2 border-black p-5">
            <p>{`For test ${result.testName} you scored ${result.correct} of ${result.maxCorrect}`}</p>
        </div>
    )
}