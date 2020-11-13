import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/" exact>
			Characters
		</NavigationItem>

		<NavigationItem link="/books">Books</NavigationItem>
	</ul>
);

export default navigationItems;
