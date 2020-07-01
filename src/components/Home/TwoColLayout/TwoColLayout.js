import React from "react";
import s from './TwoColLayout.module.css';
import {Container, Row, Col} from 'react-bootstrap';
import BaseBtn from "../../common/NormalBtns/BaseBtn";
import List from "./List";

const placeholderText = 'The area of ​​our activities is organic viticulture and winemaking. The company was the first in Georgia who received the first Bio Certificate in Georgia in 2005. The wine cellar produces 5000 bottles of white dried natural wines per year. At this stage 100% wine produced in the wine cellar exports. The vineyard is cultivated in Mtskheta village. Chalk Traditional and ecological methods are used in vineyards, grapes and wine making processes. The company produces wine from one of the best Georgian varieties of grapes in the Chinuri traditional "traditional" queens.'

const TwoColLayout = props => {

    return (
        <Container className={props.marginTop ? s.marginTop : s.marginTopMobile}>
            <Row>
                <Col lg={6} className={`${props.reverseMode ? `${s.reverse} ${s.rightImgCol}` : s.leftImgCol} ${s.marginBottom}`}>
                    <div className={s.imgWrp}>
                        <img src={props.imgLink} className={s.img} alt=""/>
                    </div>
                </Col>
                <Col lg={6}>
                    <div className={s.textWrp}>
                        <h1 className={s.title}>{props.title}</h1>
                        <p className={s.text}>{placeholderText}</p>
                        {props.btnText
                            ? <BaseBtn text={props.btnText} btnType={'Yellow'} size={'md'} />
                            : null
                        }

                        {props.listArr ? <List listArr={props.listArr} /> : null}

                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default TwoColLayout;