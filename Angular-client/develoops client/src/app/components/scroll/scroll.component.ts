import { Component } from '@angular/core';
import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';
@Component({
  selector: 'app-scroll',
  standalone: true,
  imports: [],
  templateUrl: './scroll.component.html',
  styleUrl: './scroll.component.css'
})
export class ScrollComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
     
    this.renderer.setProperty(this.el.nativeElement, 'scrollTop', 0);
  }
}
