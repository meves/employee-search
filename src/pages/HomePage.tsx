import React from "react";
import { Header } from "../components/Header/Header";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Content } from "../components/Content/Content";

const HomePage = () => {
    return (
        <>
        <Header/>
        <Sidebar/>
        <Content/>
        </>
    )
}

export default HomePage