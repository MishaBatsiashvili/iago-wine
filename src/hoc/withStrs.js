import React,{Component} from "react";
import {setLangEn, setLangGe} from "../store/reducers/appReducer";
import {connect} from "react-redux";

const withStrs = (Comp) => {
    class Strs extends Component{

        getStr = (name, lang) => {
            if(this.props.strings && this.props.strings.hasOwnProperty(name) && this.props.lang) {
                return this.props.strings[name][`text_${this.props.lang}`];
            }
            return '';
        }

        linkWithLang = (link) => {
            if (this.props.lang === 'ge') {
                link = link.split('#');
                const partOne = link[0];
                const partTwo = link[1] ?? '';
                return partOne + '?lang=ge#' + partTwo;
            } else {
                return link;
            }
        }

        render(){
            return (
                <Comp
                    {...this.props}
                    getStr={this.getStr}
                    linkWithLang={this.linkWithLang}
                />
            )
        }
    }

    const mapStateToProps = state => ({
       strings: state.app.strings,
       lang: state.app.lang,
    });

    return connect(mapStateToProps)(Strs);
}

export default withStrs;