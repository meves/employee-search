import React, { ChangeEvent, FC, FormEvent, useCallback, useState } from "react";
import styles from './Sidebar.module.scss'
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetSearchResultsThunk, resetSearchStatus, selectSearchStatus } from "../../store/slices/searchSlice";
import { findUsersThunk, getUsersThunk, resetProfile, selectFoundUsers, setUserProfileThunk } from "../../store/slices/usersSlice";
import Image from '../../assets/images/image-placeholder.jpg'
import { Preloader } from "../shared/Preloader/Preloader";
import { resetProfileLoading, resetUsersLoading, selectUsersLoading, setProfileLoading, setUsersLoading } from "../../store/slices/uiSlice";
import { resetResponseError, selectResponseError, setResponseError } from "../../store/slices/errorSlice";
import { validateInput } from "../libs/validators";
import { validateStatus } from "../libs/constants";

export const Sidebar = () => {
    const searchStatus = useAppSelector(selectSearchStatus)
    const usersLoading = useAppSelector(selectUsersLoading)

    return (
        <aside className={styles.sidebar}>
            <Title titleText="Поиск сотрудников" />
            <SearchForm/>
            { usersLoading ? <Preloader/> : null }
            { searchStatus === 'found' ? <Cards/> : null }
            <ErrorMessage/>
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
    const searchStatus = useAppSelector(selectSearchStatus)
    const responseError = useAppSelector(selectResponseError)
    
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setError('')
        const value = event.currentTarget.value
        const isValid = validateInput(value)
        setValue(value)
        if (!value) {
            dispatch(resetSearchResultsThunk())
            dispatch(resetResponseError())
        } else if (value && responseError) {
            dispatch(resetResponseError())            
        } else if (!isValid) {
            setError(validateStatus.WRONG_INPUT)
        } else if (isValid) {
            dispatch(resetSearchStatus())
            dispatch(resetProfile())
        }
    }, [dispatch, responseError])

    const handleSubmitForm = useCallback(async (event: FormEvent) => {
        event.preventDefault()
        dispatch(setUsersLoading())  
        const trimmedValue = value.trim()
        if (!trimmedValue) {
            setError(validateStatus.EMPTY_FIELD)
        } else if (trimmedValue && !error) {
            try {
                await dispatch(getUsersThunk())
                await dispatch(findUsersThunk(value))
            } catch (error: any) {
                dispatch(setResponseError(error))
            } finally {
                dispatch(resetUsersLoading())
            }
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
            <Title titleText="Результаты" />
            { (searchStatus === 'start' && !responseError) ? 
                <button 
                    className={`${styles.searchButton} ${styles.searchText}`}
                    type="submit" 
                >Начните поиск
                </button> : null 
            }
        </form>
    )
}

const ErrorMessage = () => {
    const responseError = useAppSelector(selectResponseError)

    if (!responseError) {
        return null
    }

    return (
        <div className={`${styles.notFoundText} ${styles.searchText}`}>{responseError}</div>
    )
}

const Cards = () => {
    const dispatch = useAppDispatch()
    const foundUsers = useAppSelector(selectFoundUsers)    

    const handleListItemOnClick = useCallback((id: number) => {
        dispatch(setProfileLoading())
        dispatch(setUserProfileThunk(id))
            .finally(() => {
                dispatch(resetProfileLoading())
            })
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