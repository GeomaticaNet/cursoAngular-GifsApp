import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
    selector: 'gifs-search-box',
    template: `
        <h5>Buscar:</h5>
        <input type="text"
            class="form-control"
            placeholder="Buscar gifs..."
            (keyup.enter)="searchTag()"
            #txtTagInput
        >
    `
})

export class SeachBoxComponent {

    @ViewChild('txtTagInput')
    public tagInput!: ElementRef<HTMLInputElement>;


    // Se inyecta el servicio en el constructor
    constructor( private GifsService: GifsService) { }


    //searchTag(newTag: string) {
    searchTag() {

        // almaceno el valor del buscador en la constante newTag:
        const newTag = this.tagInput.nativeElement.value;

        // envío el nuevo tag como argumento al método searchTag, el cual acumula los mismos en un array
        this.GifsService.searchTag(newTag);

        // Borro el input después de introducir el tag:
        this.tagInput.nativeElement.value = '';

    }

}
