import React, {Component} from "react";
import {setLangEn, setLangGe} from "../store/reducers/appReducer";
import {connect} from "react-redux";

const withLang = (Comp) => {
    class Lang extends Component {
        componentDidMount() {
            if (this.props.location) {
                const searchParams = new URLSearchParams(this.props.location.search);
                this.setLang(searchParams);
            }
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            if (this.props.location) {
                const searchParams = new URLSearchParams(this.props.location.search);
                if (this.props.lang !== searchParams.get('lang')) {
                    this.setLang(searchParams);
                }
            }
        }

        setElementsFont = (elementNames, fontName) => {
                debugger;
            elementNames.forEach((el , i) => {
                const elemNodes = document.querySelectorAll(el);
                for(let x = 0; x < elemNodes.length; x++){
                    elemNodes[x].style.fontFamily = `'${fontName}', Arial`;
                }
            })
        }

        setGeorgianFont = () => {
            document.body.style.fontFamily = "'englishReg', Arial";
            this.setElementsFont(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], 'englishBold');
            //     'englishBold'
            // 'georgianBold'
            // 'georgianReg'
        }

        setEnglishFont = () => {
            // document.body.style.fontFamily = "'englishReg', Arial";
            this.setElementsFont(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], 'englishBold');
        }


        setLang = (searchParams) => {
            if (searchParams.get('lang') === 'ge') {
                this.props.setLangGe();
            } else {
                this.props.setLangEn();
            }

        }

        render() {
            return (
                <Comp {...this.props} />
            )
        }

    }

    const mapStateToProps = (state) => ({
        lang: state.app.lang,
    });

    const mapDispatchToProps = (dispatch) => ({
        setLangGe: () => dispatch(setLangGe()),
        setLangEn: () => dispatch(setLangEn())
    });

    return connect(mapStateToProps, mapDispatchToProps)(Lang);
}

export default withLang;
