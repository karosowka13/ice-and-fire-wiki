import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as actions from "../../../store/actions/index";

import classes from "./Filter.module.css";

import Input from "../../../components/UI/Input/Input";
const Filter = () => {
	const genderList = ["All", "Female", "Male"];
	const pageSizeOptions = [5, 10, 15, 20, 25];
	const dispatch = useDispatch();
	const { inputed, selected, pageSize } = useSelector(
		(state) => ({
			inputed: state.characters.inputed,
			selected: state.characters.selected,
			pageSize: state.characters.pageSize,
		}),
		shallowEqual
	);

	return (
		<div className={classes.Filter}>
			<div className={classes.FilterSearch}>
				<Input
					elementType="input"
					changed={(event) =>
						dispatch(actions.inputSearchHandler(event, selected, pageSize))
					}
					placeholder="Find character by name"
					value={inputed}
					label="Search"
				/>
			</div>
			<div className={classes.FilterSelect}>
				<Input
					label="Gender"
					elementType="select"
					changed={(event) =>
						dispatch(actions.selectSearchHandler(event, inputed, pageSize))
					}
					value={selected}
					elementConfig={{ options: genderList }}
				></Input>
				<Input
					label="Display"
					elementType="select"
					value={pageSize}
					changed={(event) =>
						dispatch(actions.selectPageSize(event, inputed, selected))
					}
					elementConfig={{ options: pageSizeOptions }}
				></Input>
			</div>
		</div>
	);
};

export default Filter;
