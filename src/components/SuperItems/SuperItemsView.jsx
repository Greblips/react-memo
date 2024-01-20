/* eslint-disable prettier/prettier */
import styles from "../SuperItems/SuperItems.module.css"
import eye from "./images/eye.svg";
import { useState } from "react";
export default function SuperItemsView({ viewCards }) {
    const [buttonPressed, setButtonPressed] = useState(false)

    const handleClick = () => {
        if (!buttonPressed) {
            setButtonPressed(true);
            viewCards()
        }
    };
    return (
        <>
            <div className={`${styles.superPowers} ${buttonPressed && styles.superPowersDisabled}`} data-tooltip="Прозрение на 5 секунд показыавются все карты. Таймер длительности игры на это время останавливается"
                onClick={handleClick}
                disabled={buttonPressed}
            >
                <img src={eye} alt="Кнопка" />
            </div>

        </>
    );
}