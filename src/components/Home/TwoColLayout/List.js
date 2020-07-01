import React from "react";
import s from './List.module.css';

const List = props => {
    const listItemsJSX = () => props.listArr.map(item => {
        return <li className={s.item}><span>{item.name}</span></li>
    });

    return <ul className={'pl-4'}>{listItemsJSX()}</ul>
}

export default List;