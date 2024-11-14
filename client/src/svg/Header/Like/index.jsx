import React from "react";
import PropTypes from "prop-types"; 

const LikeIcon = ({ liked, onClick }) => {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 1920 1920"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <path
        d="M1863.059 1016.47c0-124.574-101.308-225.882-225.883-225.882H1203.37c-19.651 0-37.044-9.374-47.66-25.863-10.391-16.15-11.86-35.577-3.84-53.196 54.776-121.073 94.87-247.115 119.378-374.513 15.925-83.576-5.873-169.072-60.085-234.578C1157.29 37.384 1078.005 0 993.751 0H846.588v56.47c0 254.457-155.068 473.224-285.063 612.029-72.734 77.477-176.98 122.09-285.967 122.09H56v734.117C56 1742.682 233.318 1920 451.294 1920h960c124.574 0 225.882-101.308 225.882-225.882 0-46.42-14.117-89.676-38.174-125.59 87.869-30.947 151.116-114.862 151.116-213.234 0-46.419-14.118-89.675-38.174-125.59 87.868-30.946 151.115-114.862 151.115-213.233"
        fill={liked ? "yellow" : "gray"} 
        fillRule="evenodd"
      />
    </svg>
  );
};

// Додаємо валідацію пропсів
LikeIcon.propTypes = {
  liked: PropTypes.bool.isRequired,  
  onClick: PropTypes.func.isRequired, 
};

export default LikeIcon;

  
  