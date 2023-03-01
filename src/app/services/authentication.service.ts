import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../user';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/controller/login`, { username: username, password: password })
            .pipe(map(name => {
                // login successful if there's a jwt token in the response
                if (name===username) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', name);
                }

                return name;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    create(user: User) {
        return this.http.post<any>(`${environment.apiUrl}/controller/create`, { username:user.username, password:user.password, emailID:user.emailID })
            .pipe(map(role => {
                // login successful if there's a jwt token in the response
                if (role==="Guest") {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', role);
                }

                return role;
            }));
    }
}