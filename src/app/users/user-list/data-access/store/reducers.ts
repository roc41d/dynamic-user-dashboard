import { routerNavigationAction } from "@ngrx/router-store";
import { createFeature, createReducer, on } from "@ngrx/store";
import { userActions } from "./actions";
import { UserState } from "../../../../shared/interfaces/user";

const initialState: UserState = {
    users: [],
    total: 0,
    loading: false,
    error: null
};

const userFeature = createFeature({
  name: 'user-list',
  reducer: createReducer(
    initialState,
    on(userActions.getUsers, (state) => ({ ...state, loading: true })),
    on(userActions.getUsersSuccess, (state, action) => ({
      ...state,
      loading: false,
      users: action.users.data,
      total: action.users.total,
    })),
    on(userActions.getUsersFailure, (state) => ({ ...state, loading: false })),
    on(routerNavigationAction, () => initialState),

    on(userActions.updateUserSearchText, (state, action) => ({
      ...state,
      users: state.users.filter(
        (user) =>
          user.id.toString().includes(action.searchText) ||
          user.email.includes(action.searchText) ||
          user.first_name.includes(action.searchText) ||
          user.last_name.includes(action.searchText)
      ),
      searchText: action.searchText,
    }))
  ),
});

export const {
    name: userListFeatureKey,
    reducer: userListReducer,
    selectLoading,
    selectUsers: getUsers,
    selectTotal,
    selectError
} = userFeature;