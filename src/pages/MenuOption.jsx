import React from 'react';
import PropTypes from 'prop-types';
import '../styles/MenuOption.css';

const MenuOption = ({ icon, customIcon, label, onClick }) => {
  return (
    <div className="menu-option" onClick={onClick}>
      <span className="menu-arrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-caret-right-fill"
          viewBox="0 0 16 16"
        >
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
        </svg>
      </span>
      {customIcon ? (
        <div className="menu-icon">{customIcon}</div>
      ) : icon ? (
        <img src={icon} alt={label} className="menu-icon" />
      ) : null}
      <span className="menu-label">{label}</span>
    </div>
  );
};

MenuOption.propTypes = {
  icon: PropTypes.string,
  customIcon: PropTypes.node,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

MenuOption.defaultProps = {
  icon: null,
  customIcon: null,
};

export default MenuOption;