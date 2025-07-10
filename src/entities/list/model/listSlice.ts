import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListItem } from './types';

type ListState = {
	items: ListItem[];
};

const initialState: ListState = {
	items: [],
};

const listSlice = createSlice({
	name: 'list',
	initialState,
	reducers: {
		setStoreLists(state, action: PayloadAction<ListItem[]>) {
			state.items = action.payload;
		},
		addStoreList(state, action: PayloadAction<ListItem>) {
			state.items.push(action.payload);
		},
		deleteStoreList(state, action: PayloadAction<string>) {
			state.items = state.items.filter(list => list.id !== action.payload);
		},
		updateStoreList(
			state,
			action: PayloadAction<{ id: string; title: string }>
		) {
			const item = state.items.find(list => list.id === action.payload.id);
			if (item) item.title = action.payload.title;
		},
	},
});

export const { setStoreLists, addStoreList, deleteStoreList, updateStoreList } =
	listSlice.actions;
export default listSlice.reducer;
