import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../../../shared/interfaces/user";

export const userDetailActions = createActionGroup({
    source: 'user-detail',
    events: {
        'Get User Details': props<{userId: number}>(),
        'Get User Details Success': props<{user: User}>(),
        'Get User Details Failure': emptyProps(),
    }
});