// src/services/UserService.ts
import { HttpClient } from '../../../utils/http/HttpClient';

export interface User {
    id: number;
    email: string;
    username: string;
    name: {
        firstname: string;
        lastname: string;
    };
    address: {
        city: string;
        street: string;
        number: number;
        zipcode: string;
        geolocation: {
            lat: string;
            long: string;
        };
    };
    phone: string;
}

type CreateUserRequest = Omit<User, 'id'>;
type UpdateUserRequest = User;

export class UserService {
    private httpClient: HttpClient;

    constructor(signal?: AbortSignal) {
        this.httpClient = new HttpClient({
            baseURL: 'https://fakestoreapi.com/users',
            timeout: 10000,
            signal,
        });
    }

    public async getAllUsers(): Promise<User[]> {
        return await this.httpClient.get<User[]>('');
    }

    public async getUserById(id: number): Promise<User> {
        return await this.httpClient.get<User>(`/${id}`);
    }

    public async createUser(user: CreateUserRequest): Promise<User> {
        return await this.httpClient.post<User, CreateUserRequest>('', user);
    }

    public async updateUser(user: UpdateUserRequest): Promise<User> {
        return await this.httpClient.put<User, UpdateUserRequest>(`/${user.id}`, user);
    }

    public async deleteUserById(id: number): Promise<User> {
        return await this.httpClient.delete<User>(`/${id}`);
    }
}
