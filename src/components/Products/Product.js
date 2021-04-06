import React from "react";
import s from './Product.module.css';
import {Col} from "react-bootstrap";
import BtnPriceSide from "../common/BtnPriceSide/BtnPriceSide";
import OutOfStockBtn from "../common/NormalBtns/OutOfStockBtn";

const Product = props => {

    const renderOutOfStockOverlay = () => {
        if(props.inStock === '0'){
            return <div className={s.outOfStock}>
                <div className={s.outOfStockText}>
                    <div>Out of Stock</div>
                </div>
            </div>
        }
    }

    const renderOutOfStockBtn = () => {
        if(props.inStock === '0'){
            return (
                <div className={'d-flex justify-content-center'}>
                    <OutOfStockBtn text={props.getStr('out_of_stock', props.lang)}/>
                </div>
            )
        } else {
            return (
                <BtnPriceSide
                    onBtnClicked={() => props.addCartItem(props.id)}
                    centered
                    btnType={'Yellow'}
                    text={props.getStr('add_to_cart', props.lang)}
                    price={props.price}/>
            )
        }
    }

    return (
        <Col md={6} className={s.productWrp}>
            <div className={s.innerWrp}>
               <div className={s.imgWrp}>
                  <img src={props.imageLink} className={s.img} alt=""/>
               </div>
               <div className={s.wrp}>
                  <p className={s.name}>{props.name}</p>
                  <p className={s.desc}>{props.desc}</p>

                   {renderOutOfStockBtn()}

               </div>
            </div>
        </Col>
    )
}

export default Product;