import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PlanningService} from "../../../services/planning.service";
import {SpecialPlanRequest} from "../../../types";

@Component({
  selector: 'app-special-plan-dialog',
  templateUrl: './special-plan-dialog.component.html',
  styleUrls: ['./special-plan-dialog.component.scss']
})
export class SpecialPlanDialogComponent {

  form: FormGroup;
  description: FormControl;
  employeesPerDay: FormControl;
  ordersPerDay: FormControl;
  returnsPerDay: FormControl;
  complaintsResolvedPerDay: FormControl;
  date: FormControl;
  today: Date;
  error: string;
  shouldShowError: boolean;

  constructor(public dialogRef: MatDialogRef<SpecialPlanDialogComponent>,
              private planningService: PlanningService) {
    this.setupFormControls();
    this.form = new FormGroup({
      "date": this.date,
      "description": this.description,
      "employeesPerDay": this.employeesPerDay,
      "ordersPerDay": this.ordersPerDay,
      "returnsPerDay": this.returnsPerDay,
      "complaintsResolvedPerDay": this.complaintsResolvedPerDay
    });
    this.today = new Date();
  }

  setupFormControls() {
    this.date = new FormControl('', [
      Validators.required
    ]);
    this.description = new FormControl('', [
      Validators.required
    ]);
    this.employeesPerDay = new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]);
    this.ordersPerDay = new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]);
    this.returnsPerDay = new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]);
    this.complaintsResolvedPerDay = new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]);
  }

  cancel() {
    this.dialogRef.close(null);
  }

  submit() {
    const specialPlanRequest: SpecialPlanRequest = {
      description: this.form.get('description').value,
      day: this.form.get('date').value,
      // day: this.data.date.toString().includes('T') ?
      //   this.data.date.toISOString().substring(0, this.data.date.toISOString().indexOf('T')) : this.data.date.toString(),
      employeesPerDay: this.form.get('employeesPerDay').value,
      ordersPerDay: this.form.get('ordersPerDay').value,
      returnsPerDay: this.form.get('returnsPerDay').value,
      complaintsResolvedPerDay: this.form.get('complaintsResolvedPerDay').value
    };

    this.planningService.addSpecialPlan(specialPlanRequest).subscribe(() => {
      },
      err => {
        this.shouldShowError = true;
        this.error = err.error;
      }, () => {
        this.cancel();
      });
  }

}
