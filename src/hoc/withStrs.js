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

        render(){
            return (
                <Comp {...this.props} getStr={this.getStr} />
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