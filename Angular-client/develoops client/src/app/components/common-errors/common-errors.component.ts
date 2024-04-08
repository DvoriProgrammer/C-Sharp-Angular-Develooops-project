import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollComponent } from '../scroll/scroll.component';
@Component({
  selector: 'app-common-errors',
  standalone: true,
  imports: [CommonModule,FormsModule,ScrollComponent],
  templateUrl: './common-errors.component.html',
  styleUrl: './common-errors.component.css'
})
export class CommonErrorsComponent {

}
