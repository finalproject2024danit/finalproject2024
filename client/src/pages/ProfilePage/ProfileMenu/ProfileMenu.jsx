import {NavLink} from "react-router-dom";

const ProfileMenu = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/profile/general_information">General information</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile/place_of_residence">Place of residence</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile/hobbies">Hobbies</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile/workplace">Workplace</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile/photo_library">Photo library</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default ProfileMenu