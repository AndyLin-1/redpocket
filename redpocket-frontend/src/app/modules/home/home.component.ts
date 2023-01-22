import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreateRequestInterface} from "../../core/models/create-request.interface";
import {RedpocketService} from "../../core/services/redpocket.service";
import {ActivatedRoute, Router} from "@angular/router";
import RedPocketInterface from "../../core/models/redpocket";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  redPocketForm: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder, private redpocketService: RedpocketService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void{
    this.redPocketForm = this.fb.group({
      title: ["", [Validators.required]],
      method: ["", Validators.required],
      type: ["", Validators.required],
      poolTotal: ["", Validators.required],
      participants: ["", Validators.required],
    });
  }

  onSubmit(): void {
    let controls = this.redPocketForm.controls;
    let request: CreateRequestInterface = {
      title: controls['title'].value,
      method: controls['method'].value,
      type: controls['type'].value,
      poolTotal: controls['poolTotal'].value,
      participants: controls['participants'].value,
    };
    this.redpocketService.createRedPocket(request).subscribe({
      next: (data: RedPocketInterface) => {
        this.router.navigateByUrl("/view/" + data.id + "/" + data.code);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //Invalid $ Number
  poolTotalInvalidNumber(): boolean{
    let control = this.redPocketForm.controls['poolTotal'];
    let flag = control.invalid && control.value.toString();
    return flag;
  }

  //Returns if $ Amount entered is infeasible to split
  poolTotalInvalidAmount(): boolean{
    let control = this.redPocketForm.controls['poolTotal'];
    let control2 = this.redPocketForm.controls['participants'];
    let flag = control.valid && control2.valid && control.value < this.getValidAmount();
    return flag;
  }

  //Get Valid Amount For Confirmation
  getValidAmount(): number{
    return this.redPocketForm.controls["participants"].value * 0.01;
  }

}
