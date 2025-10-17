import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, catchError, of } from 'rxjs';

@Component({
  selector: 'app-calculator',
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css'
})
export class CalculatorComponent {
  private lengthSubject = new BehaviorSubject<string>('');
  private widthSubject = new BehaviorSubject<string>('');

  length$ = this.lengthSubject.asObservable();
  width$ = this.widthSubject.asObservable();

  
  area$ = combineLatest([this.length$, this.width$]).pipe(
    map(([length, width]) => {
      const lengthNum = parseFloat(length);
      const widthNum = parseFloat(width);
      if (length.trim() === '' || width.trim() === '') {
        return null;
      }
      if (isNaN(lengthNum) || isNaN(widthNum)) {
        return null;
      }
      if (lengthNum <= 0 || widthNum <= 0) {
        return null;
      }
      return lengthNum * widthNum;
    })
  );

  error$ = combineLatest([this.length$, this.width$]).pipe(
    map(([length, width]) => {
      const lengthNum = parseFloat(length);
      const widthNum = parseFloat(width);
      if (length.trim() === '' || width.trim() === '') {
        return null;
      }
      if (isNaN(lengthNum) || isNaN(widthNum)) {
        return 'Input harus berupa angka. Pastikan tidak ada simbol atau huruf.';
      }
      if (lengthNum <= 0 || widthNum <= 0) {
        return 'Panjang dan lebar harus lebih besar dari 0.';
      }
      return null;
    })
  );

  onLengthChange(value: string) {
    this.lengthSubject.next(value);
  }

  onWidthChange(value: string) {
    this.widthSubject.next(value);
  }
}
