import {Injectable} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import {
  HttpClient,
  HttpContext,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MyHttpService {
  constructor(private http: HttpClient) {}

  get<T>(
    url: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
        [header: string]: string | string[];
      };
      context?: HttpContext;
      observe?: "body";
      params?:
        | HttpParams
        | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
      reportProgress?: boolean;
      responseType?: "json";
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this.http.get<T>(url, options).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 301:
              window.location.href = error.headers.get("Location")!;
              break;
            default:
              break;
          }
        }
        return throwError(error);
      })
    );
  }

  post<T>(
    url: string,
    body: any | null,
    options?: {
      headers?:
        | HttpHeaders
        | {
        [header: string]: string | string[];
      };
      context?: HttpContext;
      observe?: "body";
      params?:
        | HttpParams
        | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
      reportProgress?: boolean;
      responseType?: "json";
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this.http.post<T>(url, body, options).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 301:
              window.location.href = error.headers.get("Location")!;
              break;
            default:
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
