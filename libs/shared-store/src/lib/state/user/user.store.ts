import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { actionPayloadConstructor } from '@nx-ng-starter/shared-util';

import { AppUserStateModel, TUserPayload } from './user.interface';

const createAction = actionPayloadConstructor('User');
const setState = createAction<TUserPayload>('Set state');

@State<AppUserStateModel>({
  name: 'user',
  defaults: {
    email: '',
    admin: false,
    token: '',
  },
})
@Injectable({
  providedIn: 'root',
})
class UserState {
  @Selector()
  public static model(state: AppUserStateModel) {
    return state;
  }

  @Selector()
  public static email(state: AppUserStateModel) {
    return state.email;
  }

  @Selector()
  public static token(state: AppUserStateModel) {
    return state.token;
  }

  @Selector()
  public static admin(state: AppUserStateModel) {
    return state.admin;
  }

  @Action(setState)
  public setState(ctx: StateContext<AppUserStateModel>, { payload }: TUserPayload) {
    // Reuses values from previous state if payload is partial.
    const currentState: AppUserStateModel = ctx.getState();
    const email = payload.email ? payload.email : currentState.email;
    const admin = typeof payload.admin === 'boolean' ? payload.admin : currentState.admin;
    const token = payload.token ? payload.token : currentState.token;
    const newState: AppUserStateModel = new AppUserStateModel({ email, admin, token });
    return ctx.patchState(newState);
  }
}

const userActions = {
  setState,
};
export { UserState, userActions };
