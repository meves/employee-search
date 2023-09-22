import React from "react";
import { v4 as uuidv4 } from "uuid";
import styles from './Preloader.module.scss'

export const Preloader = () => {
    const circles = Array.from(new Array<number>(5));

    return (
        <div>
            {circles.map(() => ( 
                <span className={styles.circle} key={uuidv4()}></span> 
            ))}
        </div>
    )
}