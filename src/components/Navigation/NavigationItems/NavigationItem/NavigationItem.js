import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";

const navigationItem = (props) => {
	let navLinkClass = null;
	if (props.disabled) {
		navLinkClass = [classes.NavigationItem, classes.Disabled].join(" ");
	} else navLinkClass = classes.NavigationItem;
	return (
		<li className={navLinkClass}>
			<NavLink
				to={props.link}
				exact={props.exact}
				activeClassName={classes.active}
			>
				{props.children}
			</NavLink>
		</li>
	);
};

export default navigationItem;
