import React from 'react';
import PropTypes from 'prop-types';
import s from './Helpers.module.css';
import {Col} from "react-bootstrap";

const generateInputTopProps = ({name, label, errors, touched}) => {
   return {
      name,
      label,
      errors,
      touched,
   }
}

const GENERAL_PROP_TYPES = {
   label: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   values: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired,
   handleChange: PropTypes.func.isRequired,
   handleBlur: PropTypes.func.isRequired,
   bootstrapSizeConfig: PropTypes.object,
}

const DEFAULT_PROPS = {
   bootstrapSizeConfig: {
      md: 6
   }
}

export const InputTop = ({name, label, errors, touched, noErrors}) => {

   const renderErrors = () => {
      if(!noErrors){
         if(touched[name] && errors[name]){
            return (
               <div className={s.error}>
                  {errors[name]}
               </div>
            )
         }
      }

      return null;
   }

   return (
      <>
         <label htmlFor={name} className={'mb-0'}>{label}</label>
         {renderErrors()}
      </>
   )
}

export const TextInput = (props) => {

   const inputProps = {
      id: props.name,
      name: props.name,
      type: "text",
      className: 'form-control mt-2',
      value: props.values[props.name],
      onChange: props.onChangeHandler || props.handleChange,
      onBlur: props.handleBlur,
   }

   return (
      <Col {...props.bootstrapSizeConfig} className={'mb-4'}>
         <InputTop {...generateInputTopProps(props)}/>

         {props.isTextarea
            ? <textarea {...inputProps} />
            : <input {...inputProps} />
         }
      </Col>
   );
};

TextInput.propTypes = {
   ...GENERAL_PROP_TYPES,
   isTextarea: PropTypes.bool,
}

TextInput.defaultProps = {
   ...DEFAULT_PROPS
}







export const SelectInput = (props) => {

   const selectProps = {
      id: props.name_en,
      name: props.name,
      className: 'form-control mt-2',
      value: props.values[props.name],
      onChange: props.onChangeHandler || props.handleChange,
      onBlur: props.handleBlur,
   }

   const outputOptionsJSX = () => {
      if(!props.options || props.options.length === 0){
         return null;
      }

      return props.options.map(
         el =>
            <option key={el.id} value={el.id}>{el.name_en}</option>
      )
   }

   return (
      <Col {...props.bootstrapSizeConfig} className={'mb-4'}>
         <InputTop {...generateInputTopProps(props)}/>
         <select {...selectProps}>
            {outputOptionsJSX()}
         </select>
      </Col>
   );
};

SelectInput.propTypes = {
   ...GENERAL_PROP_TYPES,
   options: PropTypes.array,
}

SelectInput.defaultProps = {
   ...DEFAULT_PROPS
}




