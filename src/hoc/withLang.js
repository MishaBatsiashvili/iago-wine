import React,{Component} from "react";
import {setLangEn, setLangGe} from "../store/reducers/appReducer";
import {connect} from "react-redux";

const withLang = (Comp) => {
   class Lang extends Component{
      componentDidMount() {
         const searchParams = new URLSearchParams(this.props.location.search);
         this.setLang(searchParams);
      }

      componentDidUpdate(prevProps, prevState, snapshot) {
         const searchParams = new URLSearchParams(this.props.location.search);
         if(this.props.lang !== searchParams.get('lang')){
            this.setLang(searchParams);
         }
      }

      setLang = (searchParams) => {
         if (searchParams.get('lang') === 'ge') {
            this.props.setLangGe();
         } else {
            this.props.setLangEn();
         }
      }

      render(){
         return <Comp {...this.props} />
      }

   }

   const mapStateToProps = (state) => ({
      lang: state.app.lang
   });

   const mapDispatchToProps = (dispatch) => ({
      setLangGe: () => dispatch(setLangGe()),
      setLangEn: () => dispatch(setLangEn())
   });

   return connect(mapStateToProps, mapDispatchToProps)(Lang);
}

export default withLang;
