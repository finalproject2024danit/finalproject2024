import PropTypes from 'prop-types';

const NotificationIcon = ({ width = "30px", height = "30px", fill = "#000000" }) => {
  return (
    <svg
      fill={fill}
      width={width}
      height={height}
      viewBox="0 0 24 24"      
    >
      <path d="M10,20h4a2,2,0,0,1-4,0Zm8-4V10a6,6,0,0,0-5-5.91V3a1,1,0,0,0-2,0V4.09A6,6,0,0,0,6,10v6L4,18H20Z" />
    </svg>
  );
};

NotificationIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
};

export default NotificationIcon;

