import React from "react";
import { Header } from "../components/Header/Header";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Content } from "../components/Content/Content";
import styles from './HomePage.module.scss'

const HomePage = () => {
    return (
        <div className={styles.home}>
            <Header/>
            <Sidebar/>
            <Content/>
        </div>
    )
}

export default HomePage