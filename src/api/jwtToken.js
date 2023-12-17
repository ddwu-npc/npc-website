import { redirect } from "react-router-dom";

export const getToken = () => {  
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken == null)
        return redirect("/account");
    return localStorage.getItem('jwtToken');
};