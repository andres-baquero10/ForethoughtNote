import React from 'react';
import userImage from '../../assets/user-img.png';

import './User.scss';

interface UserProps {}

const User: React.FC<UserProps> = () => {
	return (
		<div className="User-container">
			<img alt="User" src={userImage} className="User-image" />
			<p className="User-name">Don Pérignon</p>
		</div>
	);
};

export default User;
