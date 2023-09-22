import React, { FC } from "react";
import styles from './Sidebar.module.scss'
import { useAppSelector } from "../../store/hooks";
import { selectSearchStatus } from "../../store/slices/searchSlice";

const cards = [
    {
        id: 1,
        name: "Bret",
        email: 'Sincere@april.biz',
        imageSrc: ''
    },
    {
        id: 2,
        name: "Bret",
        email: 'Sincere@april.biz',
        imageSrc: ''
    },
    {
        id: 3,
        name: "Bret",
        email: 'Sincere@april.biz',
        imageSrc: ''
    }
]

export const Sidebar = () => {
    const searchStatus = useAppSelector(selectSearchStatus)

    return (
        <aside className={styles.sidebar}>
            <Title titleText="Поиск сотрудников" />
            <SearchInput/>
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

const SearchInput = () => {
    return (
        <input 
            className={`${styles.searchInput} ${styles.searchText}`}
            type="text" 
        />
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
    return (
        <ul className={styles.cards}>
            {cards.map(card => (
                <li key={card.id} className={styles.card}>
                    <figure className={styles.figure}>
                        <img className={styles.image} src={card.imageSrc} alt={card.name} />
                    </figure>
                    <div className={styles.description}>
                        <h4 className={styles.descriptionTitle}>{card.name}</h4>
                        <p className={styles.descriptionText}>{card.email}</p>
                    </div>
                </li>
            ))}
        </ul>
    )
}