import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import * as actions from "../../../store/actions/index";
import { getPage } from "../../../shared/utility";
import classes from "./Pagination.module.css";
import Button from "../../../components/UI/Button/Button";
class Pagination extends Component {
	render() {
		let first = null;
		let prev = null;
		let next = null;
		let last = null;
		let actualPage = 1;
		for (const linkName in this.props.linksObject) {
			if (linkName === "prev") {
				actualPage = getPage(this.props.linksObject[linkName]) + 1;
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
				actualPage = getPage(this.props.linksObject[linkName]) - 1;
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
			} else if (linkName === "first" && actualPage !== 1) {
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
			}
		}
		return (
			<div className={classes.Pagination}>
				{first} {prev} {actualPage}
				{next} {last}
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
