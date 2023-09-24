import React from "react";
import styles from './Content.module.scss'
import { useAppSelector } from "../../store/hooks";
import Image from '../../assets/images/image-placeholder.jpg'
import { selectProfile } from "../../store/slices/usersSlice";
import { Preloader } from "../shared/Preloader/Preloader";
import { selectProfileLoading } from "../../store/slices/uiSlice";
import { selectSearchStatus } from "../../store/slices/searchSlice";

export const Content = () => {
    const profile = useAppSelector(selectProfile)
    const profileLoading = useAppSelector(selectProfileLoading)
    const searchStatus = useAppSelector(selectSearchStatus)
    
    return (
        <main className={styles.content}>
            { profileLoading ? <Preloader/> : null }
            { (profile && searchStatus === 'found') ? <UserProfile/> : null }
            { !profile ? <ProfilePlaceholder/> : null }
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
    const user = useAppSelector(selectProfile)
        
    return (
        <div className={styles.userProfile}>
            <figure className={styles.figure}>
                <img className={styles.image} src={Image} alt={user?.name} />
            </figure>
            <div className={styles.profile}>
                <div className={styles.username}>{user?.name}</div>
                <div className={styles.details}>
                    <span className={styles.label}>email: </span>
                    <a className={styles.contacts} href={`mailto: ${user?.email}`}>{user?.email}</a>
                </div>
                <div className={styles.details}> 
                    <span className={styles.label}>phone: </span>
                    <a className={styles.contacts} href={`tel: ${user?.phone}`}>{user?.phone}</a>
                </div>
                <div className={styles.aboutTitle}>О себе:</div>
                <p className={styles.aboutDescription}>
                    Heelo!
                    I am ${user?.username}. My full name is ${user?.name}.
                    I live in ${user?.address.city} on ${user?.address.street}.
                    I locate at ${user?.address.geo.lat} northern latitude and ${user?.address.geo.lng} west longitude.
                    I work at company ${user?.company.name}. Our company ${user?.company.catchPhrase} and ${user?.company.bs}.
                    Good luck.
                </p>
            </div>
        </div>
    )
}