import { useEffect, useState } from "react";
import { useAuthFetch, USERS_ENDPOINT } from "../../utils";
import StudentComponent from "./StudentComponent";

export default function StudentsList({group}){
    const [students, setStudents] = useState([])
    const authFetch = useAuthFetch()
    async function deleteFromGroup(student){
        const response = await authFetch(`${USERS_ENDPOINT}/groups/delete-student`,{
            method: "DELETE",
            body: JSON.stringify({
                groupId: group.id,
                studentId: student.id
            })
        })
        if(response.status == 200){
            setStudents(students=>students.filter(st=>st.id!=student.id))
        }

    }
    async function getStudents(){
        const response = await authFetch(`${USERS_ENDPOINT}/users/byGroup?${new URLSearchParams({groupId: group.id})}`,{
            method: "GET"
        })
        if (response.status == 200){
            const body = await response.json()
            console.log(body)
            setStudents(body?body:[])
        }
    }
    useEffect(()=>{
        getStudents()
    },[])
    return (
        <div className="flex flex-col justify-start items-center">
            {students && students.map(st=><StudentComponent key={st.id} student={st} deleteFromGroup={()=>deleteFromGroup(st)}></StudentComponent>)}
        </div>
    )
}