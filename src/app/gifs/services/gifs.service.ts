import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' }) // se importa en el root por defecto para no poner en el modulo a cada rato el import...
export class GifsService {


    public gifsList: Gif[] = [];


    // variable de arreglo de string para almacenar lo que el usuario ponga en las busquedas
    private _tagsHistory: string[] = [];
    private apiKey: string = 'y97YN6UH4oV8RjPUyAf78yzh0CUALn4z';
    private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

    constructor(private http: HttpClient) {

        this.loadLocalStorage();
        console.log('Gifs service ready');

    }

    get tagsHistory() {
        // getter que almacena los tags creados en una copia del array.
        return [...this._tagsHistory];
    }

    private organizeHistory(tag: string) {

        tag = tag.toLowerCase();

        // Si tagsHistory incluye el nuevo tag entonces...
        if (this._tagsHistory.includes(tag)) {
            // crea una copia del array dejando pasar los tags diferentes al tag pasado:
            this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
        }

        // inserto el nuevo tag al inicio del array
        this._tagsHistory.unshift(tag);
        this._tagsHistory = this.tagsHistory.splice(0, 10);
        this.saveLocalStorage();

    }

    private saveLocalStorage(): void {
        localStorage.setItem('history', JSON.stringify(this._tagsHistory));
    }

    private loadLocalStorage(): void {
        if (!localStorage.getItem('history')) return;

        this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

        if (this._tagsHistory.length === 0) return;
        this.searchTag(this._tagsHistory[0]);

    }

    // publico
    searchTag(tag: string): void {

        // valido si no ponen nada y apretan enter que no agregue nada:
        if (tag.length === 0) return;
        this.organizeHistory(tag);

        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', '10')
            .set('q', tag)


        // Observable: objeto en el cual a lo largo del tiempo, puede estar emitiendo diferentes valores.
        this.http.get<SearchResponse>(`${this.serviceUrl}/search?`, { params })
            .subscribe(resp => {

                this.gifsList = resp.data;
                //console.log({ gifs: this.gifsList });

            })



        // 'https://api.giphy.com/v1/gifs/search?api_key=y97YN6UH4oV8RjPUyAf78yzh0CUALn4z&q=dark souls&limit=10'

    }

}
