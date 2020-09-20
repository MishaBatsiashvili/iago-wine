import React, {Component, createRef} from 'react';
import s from './CheckoutSuccess.module.css';
import BaseBtn from "../common/NormalBtns/BaseBtn";
import ModalWrp from "../common/ModalWrp/ModalWrp";

class CheckoutSuccess extends Component {

    generateOrderLink = (invoiceId, invoice_key) => {
        const urlParams = new URLSearchParams('');
        urlParams.set('invoice', invoiceId);
        urlParams.set('key', invoice_key);

        if (process.env.REACT_APP_INVOICE_URL) {
            return process.env.REACT_APP_INVOICE_URL + '?' + urlParams.toString();
        }

    }

    renderLinkBtn = () => {
        if (this.props.invoiceId && this.props.invoiceKey) {
            const link = this.generateOrderLink(this.props.invoiceId, this.props.invoiceKey);
            return (
                <div className={'mt-3'}>
                    <a href={link} target="_blank">
                        <BaseBtn
                            btnType={'Yellow'}
                            text={this.props.getStr('see_order')}
                            size={'md'}
                        />
                    </a>
                </div>
            )
        }

        return null;
    }

    render() {

        return (
            <ModalWrp
                showPopup={this.props.showCheckoutSuccess}
                onClosePopup={this.props.onClosePopup}
            >
                <h3 className={`mb-2 ${s.title}`}><label htmlFor="">{this.props.getStr('checkout_success')}</label></h3>
                <p className={`mb-3 d-block ${s.par}`}>{this.props.getStr('order_details_text')}: <span
                    className={'font-weight-bold'}>{this.props.email}</span></p>
                {this.renderLinkBtn()}
            </ModalWrp>
        );
    }
}

export default CheckoutSuccess;