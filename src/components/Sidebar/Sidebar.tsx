import React, { ChangeEvent, FC, FormEvent, useCallback, useState } from "react";
import styles from './Sidebar.module.scss'
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetSearchResultsThunk, selectSearchStatus } from "../../store/slices/searchSlice";
import { findUsersThunk, getUsersThunk, selectFoundUsers, setCurrentUserThunk } from "../../store/slices/usersSlice";
import Image from '../../assets/images/image-placeholder.jpg'
import { Preloader } from "../shared/Preloader/Preloader";
import { selectUsersLoading } from "../../store/slices/uiSlice";
import { validateInput } from "../libs/validators";

export const Sidebar = () => {
    const searchStatus = useAppSelector(selectSearchStatus)
    const usersLoading = useAppSelector(selectUsersLoading)

    return (
        <aside className={styles.sidebar}>
            <Title titleText="Поиск сотрудников" />
            <SearchForm/>
            <Title titleText="Результаты" />
            {usersLoading ? <Preloader/> : null}
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
    const [error, setError] = useState('')

    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setError('')
        const value = event.currentTarget.value
        const isValid = validateInput(value)
        setValue(value)
        if(isValid && value) {
            dispatch(resetSearchResultsThunk())            
        } else if (!value) {
            setError('Поле не должно быть пустым')
        } else if (!isValid) {
            setError('неверный ввод')
        }
    }, [dispatch])

    const handleSubmitForm = useCallback((event: FormEvent) => {
        event.preventDefault()        
        if (value.trim() && !error) {
            dispatch(getUsersThunk())
            .then(() => {
                dispatch(findUsersThunk(value))
            })
            .catch(error => {
                setError(error)
            })
        }        
    }, [value, dispatch, error])

    return (
        <form onSubmit={handleSubmitForm}>
            <input 
                className={`${styles.searchInput} ${styles.searchText}`}
                type="text"
                placeholder="Введите Id или имя"
                value={value}
                onChange={handleOnChange}
            />
            { error ? <div className={styles.error}>{error}</div> : null }
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
        dispatch(setCurrentUserThunk(id))
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