/* eslint-disable prettier/prettier */
import alohaImg from "./images/Aloha.svg";
import styles from "../SuperItems/SuperItems.module.css"
import { useState } from "react";
export default function SuperItemsAloha({ aloha }) {
    const [buttonPressed, setButtonPressed] = useState(false)

    const handleClick = () => {
        if (!buttonPressed) {
            setButtonPressed(true);
            aloha()

        }
    };

    return (
        <>
            <div className={`${styles.superPowers} ${buttonPressed && styles.superPowersDisabled}`} data-tooltip="Открываются случайная правильная пара карт"
                onClick={handleClick}
                disabled={buttonPressed}

            >
                <img className={styles.superPowersImg} src={alohaImg} alt="Алоха" />
            </div >

        </>
    );
}







// ```Javascript
// импортировать alohaImg из «./images/Aloha.svg»;
// импортировать стили из «../SuperItems/SuperItems.module.css»;
// импортировать {useState} из «реагировать»;

// экспортировать функцию по умолчанию SuperItemsAloha({ onClick }) {
//     const [buttonPressed, setButtonPressed] = useState (false);

//     const handleClick = () => {
//         если (!buttonPressed) {
//             setButtonPressed (истина);
//             по щелчку();
//         }
//     };

//     возвращаться (
//         <>
//             <дел
//                 className={styles.superPowers}
//                 data-tooltip="Открывается случайная правильная пара карт"
//                 onClick={handleClick}
//                 отключен = {buttonPressed}
//             >
//                 <img className={styles.superPowersImg} src={alohaImg} alt="Aloha" />
//             </div>
//         </>
//     );
// }
// ```

