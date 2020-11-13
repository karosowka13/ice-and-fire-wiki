import React from "react";
import { Link } from "react-router-dom";
import wikiLogo from "../../assets/logo-iceandfire.png";
import classes from "./Logo.module.css";

const logo = (props) => (
	<div className={classes.Logo} style={{ height: props.height }}>
		<Link to="/">
			<img src={wikiLogo} alt="wiki_logo" />
		</Link>
	</div>
);

export default logo;
