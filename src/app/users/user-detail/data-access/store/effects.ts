import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { UserService } from "../../../../shared/data-access/user.service";
import { userDetailActions } from "./actions";
import { User } from "../../../../shared/interfaces/user";

export const getUserEffect = createEffect(
    (
        actions$ = inject(Actions),
        userService = inject(UserService)
    ) => {
        return actions$.pipe(
            ofType(userDetailActions.getUserDetails),
            switchMap(action => {
                return userService.getUser(action.userId).pipe(
                    map((user: User) => {
                        return userDetailActions.getUserDetailsSuccess({ user });
                    }),
                    catchError(error => {
                        return of(userDetailActions.getUserDetailsFailure());
                    })
                )
            })
        )
    },
    {functional: true}
);