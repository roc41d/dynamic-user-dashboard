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