import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { register} from 'swiper/element';
register();

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit {
  i:number=0
  fotos = [
    { img: "/placeholder.jpg" },
    { img: "/placeholder2.jpg" },
    { img: "/placeholder3.jpg" },
    { img: "/placeholder4.jpg" },
    { img: "/placeholder5.jpg" },
  ];
  ngOnInit(): void {
    setInterval(() => {
      this.next();
  }, 5000);
  }
  next() {
    this.i = (this.i + 1) % this.fotos.length; // Incrementa el índice
}
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
