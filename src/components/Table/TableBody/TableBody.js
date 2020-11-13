import React from "react";
import classes from "./TableBody.module.css";

const tableBody = (props) => (
	<div className={classes.Body}>
		{props.data.map((element, index) => (
			<div key={index} className={classes.BodyRow}>
				{Object.values(element).map((value) => (
					<div key={value} className={classes.BodyRowItem}>
						{value}
					</div>
				))}
			</div>
		))}
	</div>
);
export default tableBody;
