import React from "react";
import styles from './Header.module.scss'

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>Жилфонд</div>
            <div className={styles.user}>Пользователь</div>
        </header>
    )
}