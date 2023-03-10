import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// import { GenreComponent } from '../genre/genre.component';
// import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];
  allMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * @returns {array} all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp; 
      console.log(this.movies);
      
      return this.movies;
    });
  }

  /**
   * Filter movies by favorites
   * @returns {array} favorite movies
   */
  displayFavorites(): any[] {
    this.getFavoriteMovies();
    // console.log(this.movies);
    
    // this.allMovies = this.movies.slice();
    // console.log(this.allMovies);
    
    this.movies = this.movies.filter((obj) =>
      this.favorites.includes(obj._id)
    );
    return this.movies;
  }

  /**
   * Open the dialog when the synopsis button is clicked
   * @params {string} title - movie name
   * @params {string} description = plot description
   * @params {string} cRating = critic rating
   * @params {string} aRating = audience rating
   */
  openSynopsisDialog(
    Title: string,
    description: string,

  ): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        
        Description: description,
        Title: Title,
      },
      width: '400px',
    });
  }

  /**
   * @returns {array} favorite movies IDs
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      return this.favorites;
    });
  }

  /**
   * Tests if a movie id is included in the favorites array
   * @params {string} movieID
   * @returns {boolean}
   */
  isFavoriteMovie(movieId: string): boolean {
    return this.favorites.includes(movieId);
  }

  /**
   * Adds a movie id to the favorites array
   * @params {string} movieID
   */
  addFavoriteMovie(movieId: string): void {
    this.fetchApiData.addFavorite(movieId).subscribe((result) => {
      this.snackBar.open('You have added this movie to your favorites!', 'OK', {
        duration: 3000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Deletes a movie id to the favorites array
   * @params {string} movieID
   */
  deleteFavoriteMovie(movieId: string): void {
    this.fetchApiData.deleteFavorite(movieId).subscribe((result) => {
      this.snackBar.open(
        'You have deleted this movie from your favorites!',
        'OK',
        {
          duration: 3000,
        }
      );
      this.ngOnInit();
    });
  }

  /**
   * Logout and send user back to welcome page
   */
   logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']).then(() => {
      this.snackBar.open('You have successfully logged out', 'OK', {
        duration: 3500,
      });
    });
  }
}