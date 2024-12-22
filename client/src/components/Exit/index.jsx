import {useDispatch} from "react-redux";
import {clearUserData} from "../../redux/slices/userSlice.js";
import {useNavigate} from "react-router-dom";

const ExitIcon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleExitClick = () => {
        dispatch(clearUserData());
        navigate("/login");
        window.location.reload();
    };
    return (
        <>
            <style>
                {`
          .exit-con {
            cursor: pointer;
          }
          .exit-icon .icon-path {
            fill: #4caf50; /* Початковий колір */
            transition: fill 0.3s ease;
          }
          .exit-icon:hover .icon-path {
            fill: #386c3a; /* Темно-зелений при наведенні */
          }
        `}
            </style>

            <svg
                className="exit-icon"
                height="70px"
                width="90px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                onClick={handleExitClick}
            >
                <path
                    className="icon-path"                    
                    d="M477.261,419.64H34.738c-14.258,0-25.816-11.558-25.816-25.816v-168.28
	c0-14.258,11.558-25.816,25.816-25.816h442.523c14.258,0,25.816,11.558,25.816,25.816v168.28
	C503.077,408.082,491.519,419.64,477.261,419.64z"
                />
                <circle style={{fill: "#F7B239"}} cx="256.003" cy="114.998" r="22.64"/>
                <g>
                    <path
                        style={{fill: "#F2F2F2"}}
                        d="M301.3,258.454c-4.928,0-8.923,3.995-8.923,8.923v84.615c0,4.928,3.995,8.923,8.923,8.923
		s8.923-3.995,8.923-8.923v-84.615C310.223,262.449,306.228,258.454,301.3,258.454z"
                    />
                    <path
                        style={{fill: "#F2F2F2"}}
                        d="M256.921,259.98c-4.084-2.757-9.631-1.68-12.387,2.404l-21.156,31.348l-21.156-31.348
		c-2.758-4.087-8.303-5.162-12.387-2.404c-4.085,2.757-5.161,8.303-2.404,12.387l25.184,37.317l-25.184,37.317
		c-2.757,4.084-1.68,9.631,2.404,12.387c1.53,1.033,3.266,1.528,4.983,1.528c2.866,0,5.681-1.379,7.405-3.933l21.156-31.348
		l21.156,31.348c1.724,2.554,4.538,3.933,7.405,3.933c1.717,0,3.453-0.495,4.983-1.528c4.085-2.757,5.161-8.303,2.404-12.387
		l-25.184-37.317l25.184-37.317C262.084,268.283,261.007,262.737,256.921,259.98z"
                    />
                    <path
                        style={{fill: "#F2F2F2"}}
                        d="M159.174,276.3c4.928,0,8.923-3.995,8.923-8.923s-3.995-8.923-8.923-8.923h-50.041
		c-4.928,0-8.923,3.995-8.923,8.923v84.615c0,4.928,3.995,8.923,8.923,8.923h50.042c4.928,0,8.923-3.995,8.923-8.923
		s-3.995-8.923-8.923-8.923h-41.119v-23.552h16.098c4.928,0,8.923-3.995,8.923-8.923s-3.995-8.923-8.923-8.923h-16.098V276.3
		H159.174z"
                    />
                    <path
                        style={{fill: "#F2F2F2"}}
                        d="M402.866,258.454h-61.565c-4.928,0-8.923,3.995-8.923,8.923s3.995,8.923,8.923,8.923h21.86v75.692
		c0,4.928,3.995,8.923,8.923,8.923c4.928,0,8.923-3.995,8.923-8.923V276.3h21.86c4.928,0,8.923-3.995,8.923-8.923
		S407.794,258.454,402.866,258.454z"
                    />
                </g>
                <path
                    style={{fill: "#333333"}}
                    d="M477.261,190.805H367.064l-79.76-79.76c-1.951-15.542-15.241-27.609-31.304-27.609
	c-16.064,0-29.353,12.066-31.305,27.609l-79.76,79.76H34.738C15.584,190.805,0,206.389,0,225.544v168.28
	c0,19.156,15.584,34.738,34.738,34.738h442.523c19.156,0,34.738-15.584,34.738-34.738v-168.28
	C512,206.389,496.416,190.805,477.261,190.805z M256.001,101.283c7.562,0,13.715,6.152,13.715,13.715
	c0,7.563-6.152,13.715-13.715,13.715s-13.715-6.152-13.715-13.715C242.284,107.435,248.438,101.283,256.001,101.283z
	 M229.255,131.724c5.587,8.901,15.484,14.835,26.746,14.835c11.262,0,21.159-5.933,26.746-14.835l59.081,59.081H170.173
	L229.255,131.724z M494.154,393.824c0,9.315-7.578,16.893-16.893,16.893H34.738c-9.315,0-16.893-7.578-16.893-16.893v-168.28
	c0-9.315,7.578-16.893,16.893-16.893h442.523c9.315,0,16.893,7.578,16.893,16.893V393.824z"
                />
            </svg>

        </>

    );
};

export default ExitIcon;
