export const userReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return { ...action.payload };

		case "LOGOUT":
			return null;
		default:
			return state;
	}
};

export const restaurantsReducer = (state, action) => {
	switch (action.type) {
		case "SET_RESTAURANTS":
			return action.payload.resaurants;

		case "SET_SEARCH_QUERY":
			return { ...state, searchQuery: action.payload.query };
		default:
			return state;
	}
};

export const cartReducer = (state, action) => {
	const updatedState = { ...state };
	switch (action.type) {
		case "ADD_TO_CART":
			updatedState[action.payload.restaurant_id].push(action.payload.item);
			return updatedState;

		case "REMOVE_FROM_CART":
			updatedState[action.payload.restaurant_id] = updatedState[
				action.payload.restaurant_id
			].filter((item) => item.itemId !== action.payload);
			return updatedState;

		case "INCREMENT_QUANTITY":
			updatedState[action.payload.restaurant_id] = updatedState[
				action.payload.restaurant_id
			].map((item) => {
				console.log(item.itemId, action.payload.itemId);

				return item.itemId === action.payload.itemId
					? { ...item, quantity: item.quantity + 1 }
					: item;
			});
			return updatedState;

		case "DECREMENT_QUANTITY":
			updatedState[action.payload.restaurant_id] = updatedState[
				action.payload.restaurant_id
			].map((item) =>
				item.itemId === action.payload.itemId
					? { ...item, quantity: item.quantity - 1 }
					: item
			);
			updatedState[action.payload.restaurant_id] = updatedState[
				action.payload.restaurant_id
			].filter((item) => item.quantity != 0);
			return updatedState;

		case "UPDATE_ITEM_QUANTITY":
			updatedState[action.payload.restaurant_id] = updatedState[
				action.payload.restaurant_id
			].map((item) =>
				item.itemId === action.payload.itemId
					? { ...item, quantity: action.payload.quantity }
					: item
			);
			return updatedState;

		case "SET_CART":
			updatedState[action.payload.restaurant_id] = action.payload.items;
			return updatedState;

		default:
			return state;
	}
};

export const initialState = {
	user: null,
	restaurants: {
		searchQuery: null,
		restaurants: [],
	},
	cart: {
		// restaurant_id : [cart_item]
	},
};

export const reducers = {
	user: userReducer,
	restaurants: restaurantsReducer,
	cart: cartReducer,
};
