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

		actualPage = this.props.linksObject.prev
			? getPage(this.props.linksObject.prev) + 1
			: getPage(this.props.linksObject.next) - 1;

		prev = (
			<Button
				key="prev"
				btnType="GoTo"
				disabled={!this.props.linksObject.prev}
				clicked={() => this.props.changePage(this.props.linksObject.prev)}
			>
				&lt;
			</Button>
		);

		next = (
			<Button
				key="next"
				btnType="GoTo"
				disabled={!this.props.linksObject.next}
				clicked={() => this.props.changePage(this.props.linksObject.next)}
			>
				&gt;
			</Button>
		);

		last = (
			<Button
				key="last"
				btnType="GoTo"
				disabled={!this.props.linksObject.next}
				clicked={() => this.props.changePage(this.props.linksObject.last)}
			>
				&gt;&gt;
			</Button>
		);

		first = (
			<Button
				key="first"
				btnType="GoTo"
				disabled={actualPage === 1}
				clicked={() => this.props.changePage(this.props.linksObject.first)}
			>
				&lt;&lt;
			</Button>
		);

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
