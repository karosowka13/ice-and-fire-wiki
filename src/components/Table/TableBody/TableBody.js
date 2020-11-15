import React from "react";
import { Link } from "react-router-dom";
import classes from "./TableBody.module.css";

const tableBody = (props) => (
	<div className={classes.Body}>
		{props.data.map((element, index) => (
			<div key={index} className={classes.BodyRow}>
				{Object.keys(element).map((key, i) => {
					let cell = null;
					if (key === "books") {
						cell = element[key].map((nrBook, i) => (
							<Link
								key={`${element[key] + i}`}
								to={`/book/${nrBook}`}
								className={classes.BookNr}
							>
								{nrBook}
							</Link>
						));
					} else if (key === "name") {
						cell = (
							<Link className={classes.BookTitle} to={`/book/${index + 1}`}>
								{element[key]}
							</Link>
						);
					} else cell = element[key];

					return (
						<div
							key={element[key] + index.toString() + key}
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
