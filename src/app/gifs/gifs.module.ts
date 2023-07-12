import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardListComponent } from './components/card-list/card-list.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { SeachBoxComponent } from './components/search-box/search-box.component';



@NgModule({
    declarations: [
        HomePageComponent,
        SeachBoxComponent,
        CardListComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        HomePageComponent,
    ]
})
export class GifsModule { }
