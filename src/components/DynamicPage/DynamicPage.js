import React, {Component} from 'react';
import s from './DynamicPage.module.css';
import {connect} from "react-redux";
import {clearSinglePageData, getDynamicPageData} from "../../store/reducers/dynamicPageReducer";
import TitleBanner from "../common/TitleBanner/TitleBanner";
import {Col, Container, Row} from "react-bootstrap";
import {imagePathGenerator} from "../../api/api";

class DynamicPage extends Component {

   componentDidMount() {
      // get page pathname from uriParam
      const path = this.props.match.params.pageName;
      // get page's data and set it to redux state
      this.props.getSinglePageData(path)
         .then(res => {
            if(!res || Object.entries(res).length === 0){
               this.props.history.push('/page-not-found');
            }
         })
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      console.log(this.props.singlePageData);
   }

   componentWillUnmount() {
      // clear single page data
      this.props.clearSinglePageData();
   }

   render() {

      if(!this.props.singlePageData){
         return <div>Loading...</div>;
      }

      console.log(this.props.singlePageData);
      return (
         <div className={s.wrp}>
            <TitleBanner
               imageURL={imagePathGenerator(this.props.singlePageData.image)}
               className={s.banner}
            />
            <Container>
               <Row className={'justify-content-center'}>
                  <Col md={'10'}>
                     <div className={s.contentWrp}>
                        <h2 className={'text-center'}>{this.props.singlePageData.title_en}</h2>

                        <div className={s.textWrp} dangerouslySetInnerHTML={{
                           __html: this.props.singlePageData.text_en,
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

export default connect(mapStateToProps, mapDispatchToProps)(DynamicPage);