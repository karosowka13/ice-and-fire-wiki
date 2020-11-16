import React from "react";
import { Link } from "react-router-dom";
import wikiLogo from "../../assets/logoguard.png";
import classes from "./Logo.module.css";

const logo = (props) => (
	<div className={classes.Logo} style={{ height: props.height }}>
		<Link to="/">
			<img src={wikiLogo} alt="wiki_logo" /> {props.children}
		</Link>
	</div>
);

export default logo;
