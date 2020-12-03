import { Component, OnInit } from '@angular/core';
import { ConstraintIN } from '../shared/interfaces/constraint';
import { ConstraintService } from '../shared/services/constraint.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  _currentDate: Date;

  constructor(private constraintService: ConstraintService) { }

  ngOnInit(): void {
    this._currentDate = this.currentDate();
  }

  currentDate(): Date {
    return new Date();
  }

  firstDateIsPastDayComparedToSecond(firstDate: any): void {
    const secondDate = new Date();
    console.log(firstDate);
    console.log(secondDate);

    // second date is in future (ex: 2min - 1min = 1 thus > 0)
    if (secondDate.setHours(0, 0, 0, 0) - firstDate.setHours(0, 0, 0, 0) > 0) {
      console.log('OK1');

      this.constraintService.constraint(1).subscribe(
        (constraint) => {
          const updatedConstraint: ConstraintIN = {
            orderTimeLimit: constraint.orderTimeLimit as string,
            maximumOrderPerDay: 500,
            rateVAT: constraint.rateVAT
          };
          this.constraintService.update(constraint.id, updatedConstraint).subscribe();
        });
    }

    console.log('OK2');
  }

}
