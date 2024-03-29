import React, {Component, createRef} from 'react';
import s from './PhoneValidator.module.css';
import BaseBtn from "../common/NormalBtns/BaseBtn";
import ModalWrp from "../common/ModalWrp/ModalWrp";

class PhoneValidator extends Component {

    state = {
        verificationCode: '',
    }

    onVerificationCodeChanged = (e) => {
        this.setState({
            verificationCode: e.target.value,
        })
    }

    render() {
        return (
            <ModalWrp
                showPopup={this.props.showPhoneValidator}
                onClosePopup={this.props.onClosePopup}
            >
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.onSubmitHandler(this.state.verificationCode);
                }}>
                    <h3 className={`mb-2 ${s.title}`}><label htmlFor="">{this.props.getStr('verif_title')}</label></h3>
                    <p className={`mb-3 d-block ${s.par}`}>{this.props.getStr('verif_code_text')}</p>
                    <input
                        type="text"
                        className={'form-control'}
                        value={this.state.verificationCode}
                        onChange={this.onVerificationCodeChanged}/>
                    <div className={'mt-3'}>
                        <BaseBtn
                            btnType={'Yellow'}
                            text={this.props.getStr('submit')}
                            size={'md'}
                        />
                    </div>
                </form>
            </ModalWrp>
        );
    }
}

export default PhoneValidator;