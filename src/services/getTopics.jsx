export const getTopics = () =>{
    return fetch('http://localhost:8088/topics').then(res=>res.json())
}