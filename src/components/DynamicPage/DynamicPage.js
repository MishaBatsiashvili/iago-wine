import React, {Component} from 'react';
import s from './DynamicPage.module.css';
import {connect} from "react-redux";
import {clearSinglePageData, getDynamicPageData} from "../../store/reducers/dynamicPageReducer";
import TitleBanner from "../common/TitleBanner/TitleBanner";
import {Col, Container, Row} from "react-bootstrap";
import {imagePathGenerator} from "../../api/api";
import withStrs from "../../hoc/withStrs";
import {compose} from "redux";
import Loader from "../common/Loader/Loader";
import {scrollToTop} from "../../helpers/helpers";

class DynamicPage extends Component {

   state={
      showLoader: true,
   }

   componentDidMount() {
      // get page pathname from uriParam
      const path = this.props.match.params.pageName;
      // get page's data and set it to redux state
      this.props.getSinglePageData(path)
         .then(res => {
            if(!res || Object.entries(res).length === 0){
               this.props.history.push('/page-not-found');
            }
            scrollToTop()
         })
   }

   componentDidUpdate(prevProps, prevState, snapshot) {

      if(this.props.match.params.pageName !== prevProps.match.params.pageName && this.state.showLoader === false){
         const path = this.props.match.params.pageName;
         this.props.getSinglePageData(path)
             .then(res => {
                if(!res || Object.entries(res).length === 0){
                   this.props.history.push('/page-not-found');
                }

                this.setState({
                   showLoader: true,
                });

                scrollToTop();
             });
      } else {
         if (this.state.showLoader) {
            if (this.props.singlePageData) {
               setTimeout(() => {
                  this.setState({
                     showLoader: false,
                  })
               }, 300);
            }
         }
      }

   }

   componentWillUnmount() {
      // clear single page data
      this.props.clearSinglePageData();
   }

   render() {

      if(this.state.showLoader){
         return <Loader />
      }

      console.log(this.props.singlePageData);
      return (
         <div className={s.wrp}>
            <TitleBanner
               imageURL={imagePathGenerator(this.props.singlePageData.image ,'pages')}
               className={s.banner}
            />
            <Container className={'mt-4'}>
               <Row className={'justify-content-center'}>
                  <Col md={'10'}>
                     <div className={s.contentWrp}>
                        <h2 className={'text-center'}>{this.props.singlePageData[`title_${this.props.lang}`]}</h2>

                        <div className={s.textWrp} dangerouslySetInnerHTML={{
                           __html: this.props.singlePageData[`text_${this.props.lang}`],
                        }} />

                     </div>
                  </Col>
               </Row>

            </Container>
         </div>
      );
   }
}

const mapStateToProps = state => ({
   singlePageData: state.dynamicPage.singlePageData,
});

const mapDispatchToProps = dispatch => ({
   getSinglePageData: (path) => dispatch(getDynamicPageData(path)),
   clearSinglePageData: () => dispatch(clearSinglePageData())
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStrs
)(DynamicPage);