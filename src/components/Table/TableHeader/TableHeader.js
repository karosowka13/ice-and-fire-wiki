import React from "react";
import classes from "./TableHeader.module.css";

const tableHeader = (props) => (
	<div className={classes.Head}>
		<div className={classes.HeadRow}>
			{props.tableHeaders.map((name, index) => (
				<div
					key={index}
					className={classes.HeadRowItem}
					style={{ flexGrow: index }}
				>
					{name}
				</div>
			))}
		</div>
	</div>
);
export default tableHeader;
