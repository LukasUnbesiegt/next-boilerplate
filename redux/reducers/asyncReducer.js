import {
	ASYNC_ACTION_START,
	ASYNC_ACTION_FINISH,
	ASYNC_ACTION_ERROR
} from "../actions/types";

const initialState = {
	loading: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ASYNC_ACTION_START:
			return { ...state, loading: true };
			break;

		case ASYNC_ACTION_FINISH:
			return { ...state, loading: false };
			break;
		case ASYNC_ACTION_ERROR:
			return { ...state, loading: false };
			break;

		default:
			return state;
	}
};
