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
import {getProducts} from "../../store/reducers/homePageReducer";
import {connect} from "react-redux";
///.


class Home extends Component {

    componentDidMount() {
        this.props.getProducts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(this.props.products);
    }

    render(){



        return (
            <div>
                <HomeSlider />

                <TwoColLayout
                    reverseMode
                    marginTop
                    imgLink={StoryImage}
                    title={'Wine Export'}
                    text={''}
                    btnText={'See More'}
                />

                <HomeProducts addCartItem={this.props.addCartItem} lang={this.props.lang} products={this.props.products} />

                <TwoColLayout
                    reverseMode
                    marginTop
                    imgLink={ExportImage}
                    text={''}
                    title={'Wine Export'}
                    listArr={this.exportListArr}
                />

                <TwoColLayout
                    imgLink={ArticleImage}
                    text={''}
                    title={'Articles'}
                    listArr={this.articlesListArr}
                />

            </div>
        )
    }

    exportListArr = [
        {
            id: 1,
            name: 'USA',
            link: '#',
        },
        {
            id: 2,
            name: 'Germany',
            link: '#',
        },
        {
            id: 3,
            name: 'Italy',
            link: '#',
        },
        {
            id: 4,
            name: 'USA',
            link: '#',
        },
        {
            id: 5,
            name: 'Germany',
            link: '#',
        },
        {
            id: 6,
            name: 'Italy',
            link: '#',
        },
        {
            id: 7,
            name: 'Italy',
            link: '#',
        },
    ];

    articlesListArr = [
        {
            id: 1,
            name: 'Vinitaly',
            link: '#',
        },
        {
            id: 2,
            name: 'Vogue',
            link: '#',
        },
        {
            id: 3,
            name: 'NY Times',
            link: '#',
        },
        {
            id: 4,
            name: 'Forbes',
            link: '#',
        },
        {
            id: 5,
            name: 'LA Times',
            link: '#',
        },
        {
            id: 6,
            name: 'TheGuardian',
            link: '#',
        },
    ]
}

const mapStateToProps = state => ({
    products: state.homePage.products,
    lang: state.app.lang,
});

const mapDispatchToProps = dispatch => ({
    getProducts: () => dispatch(getProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withLang(Home));