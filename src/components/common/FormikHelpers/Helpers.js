import React from 'react';
import PropTypes from 'prop-types';
import s from './Helpers.module.css';

const inputTop = (name, label, errors, touched) => {
   return (
      <>
         <label htmlFor={name} className={'mb-0'}>{label}</label>
         {touched[name] && errors[name]
            ?  <div className={s.error}>
                  {errors[name]}
               </div>
            : null
         }
      </>
   )
}

export const TextInput = (props) => {
   console.log(props);
   return (
      <div>
         {inputTop(props.name, props.label, props.errors, props.touched)}
         <input
            name={props.name}
            type="text"
            className={'form-control'}
            value={props.value}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
         />
      </div>
   );
};

TextInput.propTypes = {
   label: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   values: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired,
   isTextarea: PropTypes.bool,
   bootstrapSizeConfig: PropTypes.object,
   handleChange: PropTypes.func.isRequired,
   handleBlur: PropTypes.func.isRequired,
}