import * as tslib_1 from "tslib";
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import { login, logout, getUserInfo } from '@/api/users';
import { getToken, setToken, removeToken } from '@/utils/cookies';
import store from '@/store';
let User = class User extends VuexModule {
    constructor() {
        super(...arguments);
        this.token = getToken() || '';
        this.username = '';
        this.phone = '';
        this.fullname = '';
        this.company = '';
        this.avatar = '';
        this.login_time = '';
    }
    SET_TOKEN(token) {
        this.token = token;
    }
    SET_NAME(username) {
        this.username = username;
    }
    SET_AVATAR(avatar) {
        this.avatar = avatar;
    }
    SET_COMPANY(company) {
        this.company = company;
    }
    SET_login_time(login_time) {
        this.login_time = login_time;
    }
    async Login(userInfo) {
        let { username, password } = userInfo;
        username = username.trim();
        const { data } = await login();
        setToken(data.token);
        this.SET_TOKEN(data.token);
    }
    ResetToken() {
        removeToken();
        this.SET_TOKEN('');
    }
    async GetUserInfo() {
        if (this.token === '') {
            throw Error('GetUserInfo: token is undefined!');
        }
        const { data } = await getUserInfo();
        if (!data) {
            throw Error('Verification failed, please Login again.');
        }
        const { username, company, avatar, login_time } = data;
        this.SET_COMPANY(company);
        this.SET_NAME(username);
        this.SET_AVATAR(avatar);
        this.SET_login_time(login_time);
    }
    async LogOut() {
        await logout();

    }
};
tslib_1.__decorate([
    Mutation
], User.prototype, "SET_TOKEN", null);
tslib_1.__decorate([
    Mutation
], User.prototype, "SET_NAME", null);
tslib_1.__decorate([
    Mutation
], User.prototype, "SET_AVATAR", null);
tslib_1.__decorate([
    Mutation
], User.prototype, "SET_COMPANY", null);
tslib_1.__decorate([
    Mutation
], User.prototype, "SET_login_time", null);
tslib_1.__decorate([
    Action
], User.prototype, "Login", null);
tslib_1.__decorate([
    Action
], User.prototype, "ResetToken", null);
tslib_1.__decorate([
    Action
], User.prototype, "GetUserInfo", null);
tslib_1.__decorate([
    Action
], User.prototype, "LogOut", null);
User = tslib_1.__decorate([
    Module({ dynamic: true, store, name: 'user' })
], User);
export const UserModule = getModule(User);
//# sourceMappingURL=user.js.map
