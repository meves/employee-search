import React, { ChangeEvent, FC, FormEvent, useCallback, useState } from "react";
import styles from './Sidebar.module.scss'
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetStatus, selectSearchStatus } from "../../store/slices/searchSlice";
import { findUsersThunk, selectFoundUsers, setCurrentuserThunk } from "../../store/slices/usersSlice";
import Image from '../../assets/images/image-placeholder.jpg'

export const Sidebar = () => {
    const searchStatus = useAppSelector(selectSearchStatus)
    
    return (
        <aside className={styles.sidebar}>
            <Title titleText="Поиск сотрудников" />
            <SearchForm/>                
            <Title titleText="Результаты" />
            {   searchStatus === 'start' ? <SearchButton/> :
                searchStatus === 'found' ? <Cards/> :
                searchStatus === 'notfound' ? <UsersNotFound/> : null 
            }
        </aside>
    )
}

interface TitleProps {
    titleText: string
}

const Title: FC<TitleProps>  = ({titleText}) => {
    return (
        <h3 className={styles.title}>{titleText}</h3>
    )
}

const SearchForm = () => {
    const dispatch = useAppDispatch()

    const [value, setValue] = useState('')

    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        setValue(value)
        if (!value) {
            dispatch(resetStatus())
        }
    }, [dispatch])

    const handleSubmitForm = useCallback((event: FormEvent) => {
        event.preventDefault()
        if (value) {
            dispatch(findUsersThunk(value))
        }     
        
    }, [value, dispatch])

    return (
        <form onSubmit={handleSubmitForm}>
            <input 
                className={`${styles.searchInput} ${styles.searchText}`}
                type="text"
                placeholder="Введите Id или имя"
                value={value}
                onChange={handleOnChange}
            />
        </form>
    )
}

const SearchButton = () => {
    return (
        <button className={`${styles.searchButton} ${styles.searchText}`}>Начните поиск</button>
    )
}

const UsersNotFound = () => {
    return (
        <div className={`${styles.notFoundText} ${styles.searchText}`}>Ничего не найдено</div>
    )
}

const Cards = () => {
    const dispatch = useAppDispatch()
    const foundUsers = useAppSelector(selectFoundUsers)

    const handleListItemOnClick = useCallback((id: number) => {
        dispatch(setCurrentuserThunk(id))
    }, [dispatch])

    return (
        <ul className={styles.cards}>
            {foundUsers.map(user => (
                <li 
                    key={user.id} 
                    className={styles.card}
                    onClick={() => {
                        handleListItemOnClick(user.id)               
                    }}
                >
                    <figure className={styles.figure}>
                        <img className={styles.image} src={Image} alt={user.name} />
                    </figure>
                    <div className={styles.description}>
                        <h4 className={styles.descriptionTitle}>{user.username}</h4>
                        <p className={styles.descriptionText}>{user.email}</p>
                    </div>
                </li>
            ))}
        </ul>
    )
}