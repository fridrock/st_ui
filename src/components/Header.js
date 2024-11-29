import { useAppState } from "../store";
import Button from "./default/Button";

export default function Header(){
    const authorized = useAppState().isAuthorized()
    const roleName = useAppState().getRoleName()
    const setPage = useAppState().setCurPage
    const setUserInfo = useAppState().setUserInfo
    function logout(){
        setUserInfo({
            authorized: false,
            authToken: '',
            roleName: ''
        })
        setPage('main')
    }
    return (
        <header className="flex justify-around w-screen p-10  ">
            <Button onClick={()=>setPage('groups')} text="Groups" visible={authorized && roleName === "TEACHER"}></Button>
            <Button onClick={()=>setPage('tests')} text="Tests" visible={authorized && roleName === "TEACHER"}></Button>
            <Button onClick={()=>setPage('mytests')} text="My tests" visible={authorized && roleName === "STUDENT"}></Button>
            <Button onClick={()=>setPage('myresults')} text="My results" visible={authorized && roleName === "STUDENT"}></Button>
            <Button onClick={()=>setPage("login")} text="Login" visible={!authorized}/>
            <Button onClick={()=>setPage("main")} text="main"/>
            <Button visible={authorized} text="Logout" onClick={logout}></Button>
        </header>
    )
}