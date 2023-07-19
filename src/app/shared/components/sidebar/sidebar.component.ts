import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
    selector: 'shared-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

    // private gifservice
    // Inyectamos el servicio:
    constructor(private gifsService: GifsService) {

    }

    // getter que devuelve el array de los tags creados:
    get tags(): string[] {
        return this.gifsService.tagsHistory;
    }

    searchTag(tag: string): void {

        this.gifsService.searchTag(tag);

    }

}
