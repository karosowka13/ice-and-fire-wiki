import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/" exact>
			Marvelopedia
		</NavigationItem>

		<NavigationItem link="/favorite" disabled={!props.isAuthenticated}>
			Favourites
		</NavigationItem>

		{!props.isAuthenticated ? (
			<NavigationItem link="/auth">Sign in</NavigationItem>
		) : (
			<NavigationItem link="/logout">Logout</NavigationItem>
		)}
	</ul>
);

export default navigationItems;
