import React, {Component} from "react";
import HomeSlider from "./HomeSlider/HomeSlider";
import TwoColLayout from "./TwoColLayout/TwoColLayout";
import HomeProducts from "./HomeProducts/HomeProducts";

//image urls
import StoryImage from '../../assets/images/marani.jpg';
import ExportImage from '../../assets/images/export.jpg';
import ArticleImage from '../../assets/images/article.jpg';
///.


class Home extends Component {
    render(){

        const exportListArr = [
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
        ]

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

                <HomeProducts />

                <TwoColLayout
                    reverseMode
                    marginTop
                    imgLink={ExportImage}
                    text={''}
                    title={'Wine Export'}
                    listArr={exportListArr}
                />

                <TwoColLayout
                    imgLink={ArticleImage}
                    text={''}
                    title={'Articles'}
                />

            </div>
        )
    }
}

export default Home;