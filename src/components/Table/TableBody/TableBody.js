import React from "react";
import { Link } from "react-router-dom";
import classes from "./TableBody.module.css";

const tableBody = (props) => (
	<div className={classes.Body}>
		{props.data.map((element, index) => (
			<div key={index} className={classes.BodyRow}>
				{Object.keys(element).map((key, index) => {
					let cell = null;
					if (key === "books") {
						cell = element[key].map((nrBook, index) => (
							<Link
								key={`${element[key] + index}`}
								to={`/book/${element[key]}`}
								className={classes.BookNr}
							>
								{nrBook}
							</Link>
						));
					} else cell = element[key];
					return (
						<div
							key={element[key] + index.toString()}
							className={classes.BodyRowItem}
						>
							{cell}
						</div>
					);
				})}
			</div>
		))}
	</div>
);
export default tableBody;
