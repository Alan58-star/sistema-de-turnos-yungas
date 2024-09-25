import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';
import { register, SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
register();

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent /*implements OnInit*/ {
  fotos = [
    { img: "/placeholder.jpg" },
    { img: "/placeholder2.jpg" },
    { img: "/placeholder3.jpg" },
    { img: "/placeholder4.jpg" },
    { img: "/placeholder5.jpg" },
  ];
  
  /*
  swiperElement = signal<SwiperContainer | null>(null);
  
  ngOnInit(): void {
    const swiperConstructor = document.querySelector('swiper-container');
    const swiperOptions: SwiperOptions = {
      slidesPerView: 1,
      loop: true
    };
    Object.assign(swiperConstructor!, swiperOptions);
    this.swiperElement.set(swiperConstructor as SwiperContainer);
    this.swiperElement()?.initialize();
  }*/

}
