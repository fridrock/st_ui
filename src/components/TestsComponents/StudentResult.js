export default function StudentResult({result}){
    return (
        <div className="flex flex-row justify-start items-center mt-5 border-2 border-black p-5">
            <p>{`Student ${result.name} ${result.surname} ${result.thirdName} scored ${result.correct} of ${result.maxCorrect} for test ${result.testName}`}</p>
        </div>
    )
}