export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface getUsersResponse {
    page: number;
    per_page: number;
    total_pages: number;
    total: number;
    data: User[];
}

export interface getUserResponse {
    data: User;
}

export interface UserState {
    users: User[];
    total: number;
    loading: boolean;
    error: string | null;
}

export interface UserDetailState {
    user: User;
    loading: boolean;
    error: string | null;
}