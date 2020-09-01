import React, {Component} from "react";
import HomeSlider from "./HomeSlider/HomeSlider";
import TwoColLayout from "./TwoColLayout/TwoColLayout";
import HomeProducts from "./HomeProducts/HomeProducts";
import Footer from '../Footer/Footer';

//image urls
import StoryImage from '../../assets/images/marani.jpg';
import ExportImage from '../../assets/images/export.jpg';
import ArticleImage from '../../assets/images/article.jpg';
import withLang from "../../hoc/withLang";
import {getAllSections, getAllSlides, getProducts} from "../../store/reducers/homePageReducer";
import {connect} from "react-redux";
import {imagePathGenerator} from "../../api/api";
import {compose} from "redux";
import withStrs from "../../hoc/withStrs";
///.


class Home extends Component {

    componentDidMount() {
        this.props.getProducts();
        this.props.getAllSections();
        this.props.getAllSlides();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props);
    }

    render(){

        if(!this.props.sections || !this.props.slides){
            return null;
        }

        const aboutSec = this.props.sections['about'];
        const wineExportSec = this.props.sections['wine_export'];
        const articlesSec = this.props.sections['articles'];

        return (
            <div>
                <HomeSlider
                    slides={this.props.slides}
                    lang={this.props.lang}
                    getStr={this.props.getStr}
                />

                <TwoColLayout
                    reverseMode
                    marginTop
                    imgLink={ imagePathGenerator(aboutSec['image']) }
                    text={aboutSec[`text_${this.props.lang}`]}
                    title={aboutSec[`title_${this.props.lang}`]}
                    btnText={'See More'}
                    btnLink={'/page/about'}
                />

                <HomeProducts
                    addCartItem={this.props.addCartItem}
                    lang={this.props.lang}
                    getStr={this.props.getStr}
                    products={this.props.products}
                />

                <TwoColLayout
                    reverseMode
                    marginTop
                    imgLink={ imagePathGenerator(wineExportSec['image']) }
                    text={wineExportSec[`text_${this.props.lang}`]}
                    title={wineExportSec[`title_${this.props.lang}`]}
                    listArr={wineExportSec['list']}
                />

                <TwoColLayout
                    imgLink={ imagePathGenerator(articlesSec['image']) }
                    text={articlesSec[`text_${this.props.lang}`]}
                    title={articlesSec[`title_${this.props.lang}`]}
                    listArr={articlesSec['list']}
                />

            </div>
        )
    }

}

const mapStateToProps = state => ({
    products: state.homePage.products,
    sections: state.homePage.sections,
    slides: state.homePage.slides,
});

const mapDispatchToProps = dispatch => ({
    getProducts: () => dispatch(getProducts()),
    getAllSections: () => dispatch(getAllSections()),
    getAllSlides: () => dispatch(getAllSlides()),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withLang,
    withStrs,
)(Home);