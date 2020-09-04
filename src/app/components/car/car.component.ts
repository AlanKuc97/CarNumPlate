import { Component, OnInit } from '@angular/core';
import {Directive, Input, ViewChild, ElementRef} from '@angular/core';
import data from '../../../numberPlates.json';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
	@ViewChild('catalogue') catalogue:ElementRef;
	constructor() { 		
  	}
	ngOnInit(): void {
 		console.log(data[0].Name);
	}
	
	clickList(){
		console.log("List clicked!");
		this.catalogue.nativeElement.innerHTML = "";
		for (let i = 0; i < data.length; i++) {
  			this.catalogue.nativeElement.insertAdjacentHTML('afterbegin',
  			 '<div><p>' + data[i].Name +" "+ data[i].Surname +" "+ data[i].Number +'</p></div><br/>');
		}
		
	}
	clickAdd(){
		console.log("Add clicked!");
	}
	clickUpdate(){
		console.log("Update clicked!");
	}
	clickRemove(){
		console.log("Remove clicked!");
	}
}
