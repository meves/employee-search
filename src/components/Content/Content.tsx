import React from "react";
import styles from './Content.module.scss'
import { useAppSelector } from "../../store/hooks";
import { selectSearchStatus } from "../../store/slices/searchSlice";

export const Content = () => {
    const searchStatus = useAppSelector(selectSearchStatus)
    return (
        <main className={styles.content}>
            {   searchStatus === 'found' ? 
                <UserProfile/> :
                <ProfilePlaceholder/>
            }
        </main>
    )
}

const ProfilePlaceholder = () => {
    return (
        <div className={styles.userNotFound}>
            <p>Выберите сотрудника, чтобы посмотреть его профиль</p>
        </div>
    )
}

const UserProfile = () => {
    return (
        <div className={styles.userProfile}>
            <figure className={styles.figure}>
                <img className={styles.image} src="/images/я.jpg" alt="" />
            </figure>
            <div className={styles.profile}>
                <div className={styles.username}>Name Name</div>
                <div className={styles.details}>
                    <span className={styles.label}>email: </span>
                    <a className={styles.contacts} href="mailto:meves.sergey@gmail.com">meves.sergey@gmail.com</a>
                </div>
                <div className={styles.details}> 
                    <span className={styles.label}>phone: </span>
                    <a className={styles.contacts} href="tel:+7-918-253-8109">+7-918-253-8109</a>
                </div>
                <div className={styles.aboutTitle}>О себе:</div>
                <p className={styles.aboutDescription}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>
    )
}