
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    name?: Nullable<string>;
    email?: Nullable<string>;
    lastName?: Nullable<string>;
    password?: Nullable<string>;
}

export class UpdateUserInput {
    name?: Nullable<string>;
    email?: Nullable<string>;
    lastName?: Nullable<string>;
    password?: Nullable<string>;
}

export class LoginResponse {
    message?: Nullable<string>;
    token?: Nullable<string>;
}

export class LogoutResponse {
    message?: Nullable<string>;
}

export abstract class IQuery {
    abstract login(email?: Nullable<string>, password?: Nullable<string>): LoginResponse | Promise<LoginResponse>;

    abstract logout(email?: Nullable<string>): LogoutResponse | Promise<LogoutResponse>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract usersLogin(): Nullable<User>[] | Promise<Nullable<User>[]>;
}

export class User {
    _id: string;
    name?: Nullable<string>;
    email?: Nullable<string>;
    lastName?: Nullable<string>;
    password?: Nullable<string>;
    isLogin?: Nullable<boolean>;
}

export class PaginationResponse {
    users?: Nullable<Nullable<User>[]>;
    totalPage?: Nullable<number>;
    currentPage?: Nullable<number>;
}

export abstract class IMutation {
    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract paginationUsers(page?: Nullable<number>, limit?: Nullable<number>): PaginationResponse | Promise<PaginationResponse>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
