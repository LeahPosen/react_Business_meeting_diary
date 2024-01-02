import BusinessDetails from "../public/businessDetails"
import AllServices from "../public/AllServices"
import { useContext,useEffect } from "react";
import { IsAdminContext } from "../../App";
export default function Home() {
    const  setAdmin=useContext(IsAdminContext).setIsAdmin;
    useEffect(()=>{
        setAdmin(false);
    });
    return (<>
        <BusinessDetails></BusinessDetails><br /><br />
        <AllServices></AllServices><br /><br />
    </>)
}