import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import * as actions from "../../../store/actions/index";

import classes from "./Pagination.module.css";
import Button from "../../../components/UI/Button/Button";
class Pagination extends Component {
	render() {
		let first = null;
		let prev = null;
		let next = null;
		let last = null;
		for (const linkName in this.props.linksObject) {
			if (linkName === "first") {
				first = (
					<Button
						key="first"
						btnType="GoTo"
						clicked={() =>
							this.props.changePage(this.props.linksObject[linkName])
						}
					>
						&lt;&lt;
					</Button>
				);
			} else if (linkName === "prev") {
				prev = (
					<Button
						key="prev"
						btnType="GoTo"
						clicked={() =>
							this.props.changePage(this.props.linksObject[linkName])
						}
					>
						&lt;
					</Button>
				);
			} else if (linkName === "next") {
				next = (
					<Button
						key="next"
						btnType="GoTo"
						clicked={() =>
							this.props.changePage(this.props.linksObject[linkName])
						}
					>
						&gt;
					</Button>
				);
			} else if (linkName === "last") {
				last = (
					<Button
						key="last"
						btnType="GoTo"
						clicked={() =>
							this.props.changePage(this.props.linksObject[linkName])
						}
					>
						&gt;&gt;
					</Button>
				);
			}
		}
		return (
			<div className={classes.Pagination}>
				{first} {prev} {next} {last}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		linksObject: state.characters.links,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changePage: (link) => dispatch(actions.changePage(link)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Pagination)
);

Pagination.propTypes = {
	changePage: PropTypes.func,
};
