/* eslint-disable @typescript-eslint/no-var-requires */
import { action, observable, makeObservable } from 'mobx';
import RootStore from '../rootStore';

const Crypto = require('crypto-js');

type EmailResetT = {
  emailResetOk: boolean;
};

type DataT = {
  email: string;
};

type ResponseDataT = 'Success' | 'Code error' | "User doesn't exist";

type PasswordResetT = {
  emailNotFound: boolean;
  emailResetOk: boolean;
  email: string;
};

class AuthorizationSt {
  // `this` from rootstore passed to the constructor and we can
  // assign it to a variable accessible in this class called
  // `rootStore`. Therefore, we can access other store like
  // useStore for e.g (this.rootStore.profileStore)
  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable newPasswordReset: EmailResetT = {
    emailResetOk: false,
  };

  @action setNewPasswordReset = (name: string, value: boolean) => {
    this.newPasswordReset[name] = value;
  };

  @action saveNewPassword = (id: string, data: { password: string }) => {
    this.setNewPasswordReset('emailResetOk', false);
    this.rootStore
      .fetchData(`${this.rootStore.url}/password-reset/confirm/`, 'POST', {
        code: id,
        password: Crypto.SHA384(data.password.trim()).toString(),
      })
      .then((data: ResponseDataT) => {
        if (data !== undefined) {
          if (data === 'Success') {
            // "Success"
            this.setNewPasswordReset('emailResetOk', true);
          }
        }
      });
  };

  @observable passwordReset: PasswordResetT = {
    emailNotFound: false,
    emailResetOk: false,
    email: '',
  };

  @action setPasswordReset = (name: string, value: boolean) => {
    this.passwordReset[name] = value;
  };

  @action clickPasswordResetButton = (data: DataT) => {
    this.setPasswordReset('emailNotFound', false);
    this.setPasswordReset('emailResetOk', false);
    this.rootStore
      .fetchData(`${this.rootStore.url}/password-reset/`, 'POST', {
        email: data.email.toLowerCase(),
      })
      .then((data) => {
        if (data !== undefined) {
          if (data.a === true) {
            this.setPasswordReset('emailResetOk', true);
          } else if (data.a === false) {
            this.setPasswordReset('emailNotFound', true);
          }
        }
      });
  };
}

export default AuthorizationSt;
