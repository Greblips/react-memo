/* eslint-disable prettier/prettier */


import SuperItem from "../SuperItem/SuperItem"
import { useState } from "react"
import eye from "./images/eye.svg";


export default function SuperItemsView({ onClick }) {

    const [popup, setPopup] = useState(null);

    const obj = {
        id: 1,
        img: eye,
        title: "Прозрение",
        text: "На 5 секунд показываются все карты. Таймер длительности игры на это время останавливается.",
        hover: true,
    }
    return <SuperItem
        onClick={onClick}
        key={obj.id}
        id={obj.id}
        img={obj.img}
        text={obj.text}
        title={obj.title}
        hover={obj.hover}
        popup={popup}
        setPopup={setPopup}
    // superpowers={superpowers}
    // setSuperpowers={setSuperpowers}
    />
}