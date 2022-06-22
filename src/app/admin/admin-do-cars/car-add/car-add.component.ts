import { Component, OnInit, Input, Output, EventEmitter, OnChanges  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CarsService } from 'src/app/shared/car/cars.service';
import { Car } from 'src/app/shared/car/car';
import { PopupService } from 'src/app/shared/notification/popup.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})

export class CarAddComponent implements OnInit {

  @Output() closeDetailForm = new EventEmitter<any>();

  addCarForm = this.fb.group({
    cmodel: ['',{
      validators: [Validators.required],
    }],
    cbrand: ['',{
      validators: [Validators.required],
    }],
    ctype: ['',{
      validators: [Validators.required],
    }],
    transmission: ['',{
      validators: [Validators.required],
    }],
    seats: ['',{
      validators: [Validators.required],
    }],
  })

  constructor(
    private fb: FormBuilder, 
    private cservice: CarsService,
    private pop: PopupService,) { }

  ngOnInit(): void {
    
  }

  onAdd(value: any){
    this.closeDetailForm.emit(value);
  }

  onSubmit(){
    const payload: Car = {
      carID: '',
      model: this.f.cmodel.value,
      brand: this.f.cbrand.value,
      type: this.f.ctype.value,
      transmission: this.f.transmission.value,
      seats: this.f.seats.value,
      rentStatus: false
    };
      this.cservice.addCar(payload);
      this.addCarForm.reset();
      this.pop.carAdded();
  }

  get f(){
    return this.addCarForm.controls;
  }

}
