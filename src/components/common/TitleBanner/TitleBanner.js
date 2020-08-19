import React from "react";
import s from './TitleBanner.module.css';

const TitleBanner = props => {
   return (
      <div className={`${s.wrp} ${props.className}`} style={{backgroundImage: `url(${props.imageURL})`}}>
         <div className={s.innerWrp}>
            <h1 className={s.text}>{props.text}</h1>
         </div>
      </div>
   )
}

export default TitleBanner;