import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Rental } from 'src/app/shared/rental/rental';
import { RentalsService } from 'src/app/shared/rental/rentals.service';
import { User } from 'src/app/shared/user/user';
import { CarsService } from 'src/app/shared/car/cars.service';
import {HistoryService} from 'src/app/shared/rent-history/history.service';
import { RentHistory } from 'src/app/shared/rent-history/history';

@Component({
  selector: 'app-view-rentals-list',
  templateUrl: './view-rentals-list.component.html',
  styleUrls: ['./view-rentals-list.component.css']
})
export class ViewRentalsListComponent implements OnInit {

  @Input('sendRentalList') rentalList!: Rental [];
  @Input('sendUserInfo') userInfo!: User;
  @Input('sendCarList') carList!: any;
  @Input('sendHistoryList') historyList!: RentHistory [];

  @Output() selectedRental = new EventEmitter<number>();

  displayList = [] as any;
  specificCar = [] as any;

  rental_heading = "Active Rentals";

  p: number = 1;
  count: number = 8;

  constructor(private rservice: RentalsService, private cservice: CarsService, private rhservice:  HistoryService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void{
    this.displayList = this.rservice.getUserRentalList(this.userInfo.userID, this.rentalList);
  }

  onChangeViewSelection(event: any){
    console.log('Received: '+event.target.value);
   
    //Change heading of page
    if(event.target.value == "active"){
      this.rental_heading = "Active Rentals";
      console.log('Heading: '+this.rental_heading);

      this.displayList = this.rservice.getUserRentalList(this.userInfo.userID, this.rentalList);
      console.log("History List: "+this.displayList);
  
  
    }else{
      this.rental_heading = "Rental History";
      console.log('Heading: '+this.rental_heading);

      this.displayList = this.rhservice.getUserHistoryList(this.userInfo.userID, this.historyList);
      console.log("History List: "+this.displayList);
  
  
    }

  }

  getHeadingTitle(): String{
    return this.rental_heading;
  }

  onDetail(rentalID: any){
    this.selectedRental.emit(rentalID);
  }

  isRentEmpty(): boolean{

    if(this.displayList.length <= 0){
      return true;
    }else{
      return false;
    }
    
  }

}
