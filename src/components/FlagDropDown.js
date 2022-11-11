import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CountryList from './CountryList';
import RootModal from './RootModal';

class FlagDropDown extends Component {
  getItemId = (id) => `intl-tel-item-${this.props.uniqueId}-${id}`

  render() {
    const flagClassObj = {
      'iti-flag': true,
    };
    const arrowClass = classNames({
      'iti-arrow': true,
      up: this.props.showDropdown,
    });
    let genSelectedDialCode = () => '';

    if (this.props.separateDialCode) {
      genSelectedDialCode = () =>
        <div className="selected-dial-code">{this.props.dialCode}</div>;
    }

    let genArrow = () => '';

    if (this.props.allowDropdown) {
      genArrow = () =>
        <div className={ arrowClass } />;
    }

    if (this.props.countryCode) {
      flagClassObj[this.props.countryCode] = true;
    }

    const flagClass = classNames(flagClassObj);

    let genCountryList = () => '';

    const countryListId = `intl-tel-countries-list-${this.props.uniqueId}`;

    if (this.props.dropdownContainer) {
      if (this.props.showDropdown) {
        genCountryList = () =>
          <RootModal>
            <CountryList
              ref={ (countryList) => { this.countryList = countryList; } }
              dropdownContainer={ this.props.dropdownContainer }
              isMobile={ this.props.isMobile }
              showDropdown={ this.props.showDropdown }
              setFlag={ this.props.setFlag }
              countries={ this.props.countries }
              inputTop={ this.props.inputTop }
              inputOuterHeight={ this.props.inputOuterHeight }
              preferredCountries={ this.props.preferredCountries }
              highlightedCountry={ this.props.highlightedCountry }
              changeHighlightCountry={ this.props.changeHighlightCountry }
              selectedCountryCode={ this.props.countryCode }
              countryListId={ countryListId }
              getItemId={ this.getItemId }
            />
          </RootModal>;
      }
    } else {
      genCountryList = () =>
        <CountryList
          ref={ (countryList) => { this.countryList = countryList; } }
          dropdownContainer={ this.props.dropdownContainer }
          isMobile={ this.props.isMobile }
          showDropdown={ this.props.showDropdown }
          setFlag={ this.props.setFlag }
          countries={ this.props.countries }
          inputTop={ this.props.inputTop }
          inputOuterHeight={ this.props.inputOuterHeight }
          preferredCountries={ this.props.preferredCountries }
          highlightedCountry={ this.props.highlightedCountry }
          changeHighlightCountry={ this.props.changeHighlightCountry }
          selectedCountryCode={ this.props.countryCode }
          countryListId={ countryListId }
          getItemId={ this.getItemId }
        />;
    }

    return (
      <div
        ref={ this.props.refCallback }
        className="flag-container"
      >
        <div
          { ...this.props.flagDropdownProps }
          className="selected-flag"
          tabIndex={ this.props.allowDropdown ? '0' : '' }
          onClick={ this.props.clickSelectedFlag }
          onKeyDown={ this.props.handleSelectedFlagKeydown }
          title={ this.props.titleTip }
          role="combobox"
          aria-controls={ countryListId }
          aria-activedescendant={ this.getItemId(this.props.highlightedCountry) }
          aria-expanded={ this.props.showDropdown }
          aria-haspopup="listbox" // eslint-disable-line
        >
          <div className={ flagClass } />
          { genSelectedDialCode() }
          { genArrow() }
        </div>
        { genCountryList() }
      </div>
    );
  }
}

FlagDropDown.propTypes = {
  allowDropdown: PropTypes.bool,
  dropdownContainer: PropTypes.string,
  separateDialCode: PropTypes.bool,
  dialCode: PropTypes.string,
  countryCode: PropTypes.string,
  showDropdown: PropTypes.bool,
  clickSelectedFlag: PropTypes.func,
  handleSelectedFlagKeydown: PropTypes.func,
  isMobile: PropTypes.bool,
  setFlag: PropTypes.func,
  countries: PropTypes.arrayOf(PropTypes.object),
  inputTop: PropTypes.number,
  inputOuterHeight: PropTypes.number,
  preferredCountries: PropTypes.arrayOf(PropTypes.object),
  highlightedCountry: PropTypes.number,
  changeHighlightCountry: PropTypes.func,
  titleTip: PropTypes.string,
  refCallback: PropTypes.func.isRequired,
  uniqueId: PropTypes.string.isRequired,
  flagDropdownProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default FlagDropDown;
