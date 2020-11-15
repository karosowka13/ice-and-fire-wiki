import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import classes from "./Filter.module.css";
import PropTypes, { array } from "prop-types";

import Input from "../../../components/UI/Input/Input";
class Filter extends Component {
	render() {
		const genderList = ["All", "Female", "Male"];
		const pageSize = ["", 5, 10, 15, 20, 25];
		return (
			<div className={classes.Filter}>
				<div className={classes.FilterSearch}>
					<Input
						elementType="input"
						changed={(event) =>
							this.props.inputSearchHandler(
								event,
								this.props.selected,
								this.props.pageSize
							)
						}
						placeholder="Find character by name"
						value={this.props.inputed}
						label="Search"
					/>
				</div>
				<div className={classes.FilterSelect}>
					<Input
						label="Gender"
						elementType="select"
						changed={(event) =>
							this.props.selectSearchHandler(
								event,
								this.props.inputed,
								this.props.pageSize
							)
						}
						value={this.props.selected}
						elementConfig={{ options: genderList }}
					></Input>
					<Input
						label="Display"
						elementType="select"
						changed={(event) =>
							this.props.selectPageSizeHandler(
								event,
								this.props.inputed,
								this.props.selected
							)
						}
						value={this.props.pageSize}
						elementConfig={{ options: pageSize }}
					></Input>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		inputed: state.characters.inputed,
		selected: state.characters.selected,
		pageSize: state.characters.pageSize,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		selectSearchHandler: (event, inputed, pageSize) =>
			dispatch(actions.selectSearchHandler(event, inputed, pageSize)),
		inputSearchHandler: (event, selected, pageSize) =>
			dispatch(actions.inputSearchHandler(event, selected, pageSize)),
		selectPageSizeHandler: (event, inputed, selected) =>
			dispatch(actions.selectPageSize(event, inputed, selected)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);

Filter.propTypes = {
	charactersList: array,
	inputed: PropTypes.string,
	selected: PropTypes.string,
};
