import { Component, OnInit } from '@angular/core';
import { ConstraintOUT } from '../../shared/interfaces/constraint';
import { ConstraintService } from '../../shared/services/constraint.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  maxOrderPerDay: number;
  constructor(private constraintService: ConstraintService) { }

  ngOnInit(): void {
    this.showMaxOrderPerDay();
  }

  showMaxOrderPerDay(): void {
    this.constraintService.constraint(1).subscribe(
      (constraint) => {
        this.maxOrderPerDay = constraint.maximumOrderPerDay;
      });
  }

}
