// import React, { Component } from "react";
// import { connect } from "react-redux";
// import * as actions from "../../../store/actions/index";
// import classes from "./Filter.module.css";
// import PropTypes, { array } from "prop-types";

// import Input from "../../../components/UI/Input/Input";
// class Filter extends Component {
// 	render() {
// 		let comicsList = [];
// 		this.props.charactersList.forEach((character) =>
// 			comicsList.push(...character.comics)
// 		);
// 		const shorComicsList = comicsList.map(
// 			(comics) => (comics = comics.split(" (", 1)[0])
// 		);
// 		const uniqueComicsList = [...new Set(shorComicsList)];
// 		uniqueComicsList.sort();
// 		return (
// 			<div className={classes.Filter}>
// 				<div className={classes.FilterSearch}>
// 					<Input
// 						elementType="input"
// 						changed={(event) =>
// 							this.props.inputChangedHandler(event, this.props.charactersList)
// 						}
// 						placeholder="Find character"
// 						value={this.props.inputed}
// 						label="Search all"
// 					/>
// 				</div>
// 				<div className={classes.filterComics}>
// 					<Input
// 						label="Appears in"
// 						elementType="select"
// 						changed={(event) =>
// 							this.props.selectChangeHandler(event, this.props.charactersList)
// 						}
// 						value={this.props.selected}
// 						elementConfig={{ options: uniqueComicsList }}
// 					></Input>
// 				</div>
// 			</div>
// 		);
// 	}
// }

// const mapStateToProps = (state) => {
// 	return {
// 		charactersList: state.characters.characters,
// 		inputed: state.characters.inputed,
// 		selected: state.characters.selected,
// 	};
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		selectChangeHandler: (event) =>
// 			dispatch(actions.selectChangeHandler(event)),
// 		inputChangedHandler: (event) => dispatch(actions.inputChangeHandler(event)),
// 	};
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Filter);

// Filter.propTypes = {
// 	charactersList: array,
// 	inputed: PropTypes.string,
// 	selected: PropTypes.string,
// };
