import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  fotos = [
    { img: "/placeholder.jpg" },
    { img: "/placeholder2.jpg" },
    { img: "/placeholder3.jpg" },
    { img: "/placeholder4.jpg" },
    { img: "/placeholder5.jpg" },
  ];

  carouselConfig = {
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed:900,
    pauseOnHover: true,
    dots: true,
    adaptiveHeight: true,
    responsive: {
      breakpoint: 480,
      settings: {
        arrows:false
      }
    }
  }
}
