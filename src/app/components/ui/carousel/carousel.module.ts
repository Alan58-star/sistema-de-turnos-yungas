import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CarouselComponent } from "./carousel.component";


@NgModule({
    imports: [CommonModule, CarouselComponent],
    exports: [CarouselComponent]
})

export class CaruselModule {

}