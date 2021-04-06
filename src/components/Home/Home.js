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
import Loader from "../common/Loader/Loader";
///.


class Home extends Component {

    state = {
        showLoader: true,
    }

    componentDidMount() {
        this.props.getProducts();
        this.props.getAllSections();
        this.props.getAllSlides();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.showLoader) {
            if (this.props.sections && this.props.slides) {
                setTimeout(() => {
                    this.setState({
                        showLoader: false,
                    });
                }, 500);
            }
        }
    }

    render(){

        if(this.state.showLoader){
            return <Loader />;
        }

        const aboutSec = this.props.sections['about'];
        const wineExportSec = this.props.sections['wine_export'];
        const articlesSec = this.props.sections['articles'];
        const winerySec = this.props.sections['winery'];

        return (
            <div>
                <HomeSlider
                    slides={this.props.slides}
                    lang={this.props.lang}
                    getStr={this.props.getStr}
                />

                <TwoColLayout
                    id={'about'}
                    reverseMode
                    paddingTop
                    imgLink={ imagePathGenerator(aboutSec['image'], 'sections') }
                    text={aboutSec[`text_${this.props.lang}`]}
                    title={aboutSec[`title_${this.props.lang}`]}
                    btnText={this.props.getStr('see_more')}
                    btnLink={this.props.linkWithLang('/page/about')}
                    lang={this.props.lang}
                />

                <TwoColLayout
                    id={'winery'}
                    paddingTop
                    imgLink={ imagePathGenerator(winerySec['image'], 'sections') }
                    text={winerySec[`text_${this.props.lang}`]}
                    title={winerySec[`title_${this.props.lang}`]}
                    lang={this.props.lang}
                />

                <HomeProducts
                    addCartItem={this.props.addCartItem}
                    lang={this.props.lang}
                    getStr={this.props.getStr}
                    products={this.props.products}
                />

                <TwoColLayout
                    id={'export'}
                    reverseMode
                    paddingTop
                    imgLink={ imagePathGenerator(wineExportSec['image'], 'sections') }
                    text={wineExportSec[`text_${this.props.lang}`]}
                    title={wineExportSec[`title_${this.props.lang}`]}
                    listArr={wineExportSec['list']}
                    lang={this.props.lang}
                />

                <TwoColLayout
                    id={'articles'}
                    paddingTop
                    imgLink={ imagePathGenerator(articlesSec['image'], 'sections') }
                    text={articlesSec[`text_${this.props.lang}`]}
                    title={articlesSec[`title_${this.props.lang}`]}
                    listArr={articlesSec['list']}
                    lang={this.props.lang}
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
    withStrs,
)(Home);