import { Component, OnInit } from '@angular/core';
import RedPocketInterface from "../../core/models/redpocket";
import {RedpocketService} from "../../core/services/redpocket.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  redpocket: RedPocketInterface = {
    id: "",
    createdAt: "",
    method: "",
    title: "",
    type: "",
    code: "",
    poolTotal: 0,
    winners: [],
    amounts: [],
  };

  inputForm: FormGroup = {} as FormGroup;
  view: number = 1;
  validInput: boolean = false;
  url: string = "";

  constructor(private redpocketService: RedpocketService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.url  = window.location.toString();
    this.route.params.subscribe((params) => {
        this.initializeRedPocket(params["id"], params["code"]);
        this.changeView(params["id"], params["code"]);
    });
    this.initForm();
  }

  //Initialize RedPocket View
  initializeRedPocket(id: string, code: string){
      this.redpocketService.get(id, code).subscribe({
        next: (data: RedPocketInterface) => {
          this.redpocket = data;
        },
        error: (error) => {
          console.log(error);
        },
      });

  }

  //Initialize the Forms
  private initForm(): void{
    this.inputForm = this.fb.group({
      input: ["", [Validators.required]],
    });
  }

  //Adds A Input into database
  onAdd(){
    this.redpocketService.openRedPocket(this.redpocket.id , this.inputForm.controls["input"].value).subscribe({
      next: (data: RedPocketInterface) => {
        this.redpocket = data;
      }
    });
  }

  //Change Method to Actually Readable Text
  getMethodMessage(): string{
    if(this.redpocket.method === "email") return "E-transfer Email";
    return "Venmo/Cashapp";
  }

  getUserLink(link: string): string{
    let a = link.lastIndexOf("/");
    link = link.substring(0, a);
    return link;
  }

  //Change View If Code Is entered Correctly
  changeView(id: string, code: string){
    this.redpocketService.auth(id, code).subscribe({
      next: (data: boolean) => {
        if(data) {
          this.view = 2;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //Validate Email Inputs
  validateInput(){
    if(this.redpocket.method === "email"){
      const re = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
      this.validInput = re.test(this.inputForm.controls["input"].value);
    }
    else{
      this.validInput = true;
    }
  }


}
