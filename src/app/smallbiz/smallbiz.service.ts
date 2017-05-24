smallbizimport { Injectable } from '@angular/core';
import { Smallbiz } from './smallbiz';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SmallbizService {
    private smallbizUrl = '/api/smallbiz';

    constructor (private http: Http) {}

    // get("/api/smallbiz")
    getSmallbiz(): Promise<Smallbiz[]> {
      return this.http.get(this.smallbizUrl)
                 .toPromise()
                 .then(response => response.json() as Smallbiz[])
                 .catch(this.handleError);
    }

    // post("/api/smallbiz")
    createSmallbiz(newSmallbiz: Smallbiz): Promise<Smallbiz> {
      return this.http.post(this.smallbizUrl, newSmallbiz)
                 .toPromise()
                 .then(response => response.json() as Smallbiz)
                 .catch(this.handleError);
    }

    // get("/api/smallbiz/:id") endpoint not used by Angular app

    // delete("/api/smallbiz/:id")
    deleteSmallbiz(delSmallbizId: String): Promise<String> {
      return this.http.delete(this.smallbizUrl + '/' + delSmallbizId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/smallbiz/:id")
    updateSmallbiz(putSmallbiz: Smallbiz): Promise<Smallbiz> {
      var putUrl = this.smallbizUrl + '/' + putSmallbiz._id;
      return this.http.put(putUrl, putSmallbiz)
                 .toPromise()
                 .then(response => response.json() as Smallbiz)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}}
