import React from "react";
import s from './Product.module.css';
import {Col} from "react-bootstrap";
import BtnPriceSide from "../common/BtnPriceSide/BtnPriceSide";

const Product = props => {

    return (
        <Col md={6} className={s.productWrp}>
           <div className={s.imgWrp}>
              <img src={props.imageLink} className={s.img} alt=""/>
           </div>
           <div className={s.wrp}>
              <p className={s.name}>{props.name}</p>
              <p className={s.desc}>{props.desc}</p>
              <BtnPriceSide
                 onBtnClicked={() => props.addCartItem(props.id)}
                 centered
                 btnType={'Yellow'}
                 text={props.getStr('add_to_cart', props.lang)}
                 price={props.price}/>
           </div>
        </Col>
    )
}

export default Product;