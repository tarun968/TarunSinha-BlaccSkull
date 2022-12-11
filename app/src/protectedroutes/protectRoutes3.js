import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {isAuthenticated } from "../apihelper/loginapi";
export default function ProtectedRoute3(){
    let {Token} = isAuthenticated()
    return (
        Token ?  <Outlet/> : <Navigate to='/' /> 
    )
}