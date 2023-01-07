import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api endpoint that will provide data for the client app
const apiEndpoint = 'https://imbd-movies.herokuapp.com/';

//injectable decorator tells angular this service component would be available everywhere i.e root
@Injectable({
  providedIn: 'root',
})

//class component creation
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}
  // Making the api call for the user registration endpoint
  /**
   * @service POST to an API endpoint to register a user
   * @param {any} userDetails arguments can be of any data type
   * @returns a user object in json format
   * @function userRegistration
   */
  public userRegistration(userDetails: any): Observable<any> {
    // console.log(userDetails);
    return this.http
      .post(apiEndpoint + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // User login
  /**
   * @service POST to an API endpoint to login a user
   * @param {any} userDetails
   * @returns a user object in json format
   * @function userLogin
   */

  public userLogin(userDetails: any): Observable<any> {
    // console.log(userDetails);
    return this.http
      .post(apiEndpoint + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Making the API call to return all movies
  /**
   * @service GET to an API endpoint to return all movies
   * @param
   * @returns an array of all movies in json format
   * @function getAllMovies
   */
   getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiEndpoint + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }


// Get one movie
  /**
   * @service GET to an API endpoint to return all movies
   * @param {string} title
   * @returns the movie by title as an object in json format
   * @function getOneMovie
   */
   getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiEndpoint + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get specific user
  /**
   * @service GET to an API endpoint to return a specific user
   * @param
   * @returns user as a JSON object
   * @function getUser
   */
   getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiEndpoint + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get favorite movies list
  /**
   * @service GET to an API endpoint to return users's favorite movies
   * @param
   * @returns favorite movies in an array
   * @function getFavorites
   */
  getFavorites(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiEndpoint + 'users/' + username + '/movies/', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Add a favorite movie for a user
  /**
   * @service POST to an API endpoint to add a favorite movie to user's list
   * @param {string} movieId
   * @returns returns all user data as a JSON object
   * @function getUser
   */
  addFavorite(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .post(
        apiEndpoint + 'users/' + username + '/movies/' + movieId,
        { favoriteMovie: movieId },
        {
          headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Edit user into
  /**
   * @service PUT to an API endpoint to update user's information
   * @param {any} updatedInfo
   * @returns returns all user data as a JSON object
   * @function editUserInfo
   */
  editUserInfo(updatedInfo: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .put(apiEndpoint + 'users/' + username, updatedInfo, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Delete user
  /**
   * @service DELETE to an API endpoint to delete all of user's information
   * @param
   * @returns
   * @function deleteUser
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiEndpoint + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Delete a movie from user favorites
  /**
   * @service DELETE to an API endpoint to delete a favorite movie
   * @param {string} movieID
   * @returns returns all user data as a JSON object
   * @function deleteFavorite
   */
  deleteFavorite(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiEndpoint + 'users/' + username + '/movies/' + movieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Handle errors
  /**
   * @param {HttpErrorResponse} error
   * @returns error message
   * @function handleError
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error(`Username or password error. Please try again.`)
    );
  }

  // Non-typed response extraction function
  /**
   * extracts response data from HTTP response
   * @param {any} res
   * @returns response body or an empty object
   * @function extractResponseData
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
