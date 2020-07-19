import React, {Component} from "react";
import s from './About.module.css';
import {Container} from "react-bootstrap";

import {text as placeholderText} from './aboutPlaceholderData';
import withLang from "../../hoc/withLang";

class About extends Component {
   render(){
      return (<div className={s.wrp}>
         <Container>
            <h1>Our Story</h1>
            <p className={'mt-4 mb-4'}>{placeholderText}</p>
         </Container>
      </div>)
   }
}

export default withLang(About);