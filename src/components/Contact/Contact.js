import React, {Component} from "react";
import s from './Contact.module.css';
import TitleBanner from "../common/TitleBanner/TitleBanner";
import bannerImg from '../../assets/images/marani.jpg';
import {Col, Container, Row} from "react-bootstrap";
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import {connect} from "react-redux";
import {compose} from "redux";
import withStrs from "../../hoc/withStrs";
import Loader from "../common/Loader/Loader";


class Contact extends Component {
    state = {
        showLoader: true
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                showLoader: false,
            })
        }, 300)
    }

    render() {

        if(this.state.showLoader){
            return <Loader />
        }

        return (
            <div>
                <TitleBanner imageURL={bannerImg} text={this.props.getStr('contact', this.props.lang)}/>
                <Container className={s.wrp}>
                    <Row>
                        <Col md={'6'} className={'mb-5'}>
                            <h3 className={`${s.title}`}>{this.props.general.address[`text_${this.props.lang}`]}</h3>
                            <ul className={s.contactData}>
                                <li className={s.contactItem}>{this.props.getStr('phone', this.props.lang)}: {this.props.general.phone[`text_${this.props.lang}`]}</li>
                                <li className={s.contactItem}>{this.props.getStr('email', this.props.lang)}: {this.props.general.email[`text_${this.props.lang}`]}</li>
                            </ul>
                            <div className={'d-flex mt-3'}>
                                <a href={this.props.general.facebook[`text_${this.props.lang}`]} className={s.iconWrp}>
                                    <i className="fab fa-facebook-f"></i>
                                </a>

                                <a href={this.props.general.instagram[`text_${this.props.lang}`]} className={s.iconWrp}>
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </Col>

                        <Col md={'6'}>
                            <div className={s.mapWrp}>

                                <Map
                                    google={this.props.google}
                                    initialCenter={{
                                        lat: 41.8863883,
                                        lng: 44.6504115
                                    }}
                                    zoom={12}
                                >
                                    <Marker position={{
                                        lat: 41.8863883,
                                        lng: 44.6504115
                                    }}/>
                                </Map>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
   general: state.app.general
});

const mapDispatchToProps = dispatch => ({

});

export default compose(
    GoogleApiWrapper({
       apiKey: 'AIzaSyA9XHOeU-o40-4WKMBanl6eSoJaP3pNt6I'
    }),
    connect(mapStateToProps),
    withStrs,
)(Contact);