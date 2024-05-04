import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { userActions } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";
import { UserService } from "../../../../shared/data-access/user.service";
import { getUsersResponse } from "../../../../shared/interfaces/user";

export const getUsersEffect = createEffect(
    (
        actions$ = inject(Actions),
        userService = inject(UserService)
    ) => {
        return actions$.pipe(
            ofType(userActions.getUsers),
            switchMap(action => {
                return userService.getUsers(action.page).pipe(
                    map((users: getUsersResponse) => {
                        return userActions.getUsersSuccess({ users });
                    }),
                    catchError(error => {
                        return of(userActions.getUsersFailure());
                    })
                )
            })
        )
    },
    {functional: true}
);