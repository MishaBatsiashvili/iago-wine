import React from "react";
import s from './List.module.css';
import {Col, Row} from "react-bootstrap";

const List = props => {

    const portionSize = 4;
    const colsAmnt = Math.ceil(props.listArr.length / portionSize);

    const colItemsJSX = [];
    for (let x = 0; x < colsAmnt; x++) {

        colItemsJSX.push(
            <Col key={x} xs={12} sm={6} md={4}>
                <ul className={'pl-4'}>
                    {props.listArr.slice(x * portionSize, (x + 1) * portionSize).map(item => {

                        return (
                            <li key={`${item.id}`} className={s.item}>
                                <a href={item.link}>{item.title_en}</a>
                            </li>
                        )

                    })}
                </ul>
            </Col>
        )

    }

    return <Row>
        {colItemsJSX}
    </Row>
}

export default List;