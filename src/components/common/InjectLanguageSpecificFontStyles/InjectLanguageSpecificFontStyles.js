import React from 'react';
import PropTypes from 'prop-types';
import { Style } from 'react-style-tag';
import { connect } from 'react-redux';

const InjectLanguageSpecificFontStyles = ({ lang }) => {
  const languageBasedFontStylesConfig = {
    ge: { normalFontName: 'georgianReg', boldFontName: 'georgianBold' },
    en: { normalFontName: 'englishReg', boldFontName: 'englishBold' }
  };

  return (
    <Style>
      {`
              body{
                font-family: '${languageBasedFontStylesConfig[lang].normalFontName}'
              }
              h1,h2,h3,h4,h5,h6{
                font-family: '${languageBasedFontStylesConfig[lang].boldFontName}'
              }
          `}
    </Style>
  );
};

const mapStateToProps = (state) => ({
  lang: state.app.lang
});

export default connect(mapStateToProps)(InjectLanguageSpecificFontStyles);

InjectLanguageSpecificFontStyles.propTypes = {
  lang: PropTypes.string
};
