import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';


@Injectable()
export class HeroService {
    private heroesUrl = 'api/heroes';
    private headers = new Headers({'Content-Type': 'application/json'});
    
    constructor(private http: Http) { }
    
    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl).toPromise().then(respone => respone.json().data as Hero[]).catch(this.handleError);
    }

    private handleError(error: any): Promise<any>{
        console.error('An error occured',error);
        return Promise.reject(error.message || error);
    }

    getHero(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url).toPromise().then(respone => respone.json().data as Hero).catch(this.handleError);
    }

    update(hero : Hero) : Promise<Hero>{
        const url = `{this.heroesUrl}/${hero.id}`;
        return this.http.put(url, JSON.stringify(hero),{headers: this.headers}).toPromise().then(()=> hero).catch(this.handleError);
    }

}

