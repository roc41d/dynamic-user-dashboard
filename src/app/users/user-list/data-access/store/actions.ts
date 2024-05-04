import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { getUsersResponse } from "../../../../shared/interfaces/user";

export const userActions = createActionGroup({
    source: 'user-list',
    events: {
        'Get Users': props<{page: number}>(),
        'Get Users Success': props<{users: getUsersResponse}>(),
        'Get Users Failure': emptyProps(),
    }
});