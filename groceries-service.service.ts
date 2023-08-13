import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
import { Observable, Subject, throwError} from 'rxjs';

///Added the type attribute to Item because of its complications with 'never' and 'any' declarations
type Item = { name: string, quantity: number };

@Injectable({
    providedIn: 'root',
})
export class GroceriesServiceService {

  dataChanged$: Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private baseURL = "http://localhost:8080";
  items!: Object;

  constructor(private http: HttpClient) { 
    console.log('Hello GroceriesServiceProvider Provider');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getItems(): Observable<any> {
    return this.http.get<any>(this.baseURL + '/api/groceries').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: any) {
    let body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  removeItem(id: string | number): Observable<boolean> {
    return this.http.delete(this.baseURL + "/api/groceries/" + id, this.httpOptions)
      .pipe(
        map((res) => {
          this.items = res;
          this.dataChangeSubject.next(true);
          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('Error deleting item:', error);
          return throwError('Error deleting item');
        })
      );
  }

  addItem(item: any) {
    this.http.post(this.baseURL + '/api/groceries', item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  editItem(item: any, index: any) {
    console.log('Editing item = ', item);
    this.http.put(this.baseURL + '/api/groceries/' + item._id, item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
     });
  }
}

