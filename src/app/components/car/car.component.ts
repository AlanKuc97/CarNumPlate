import { Component, Renderer2, OnInit } from '@angular/core';
import {Directive, Input, ViewChild, ElementRef} from '@angular/core';
import { ModalService } from '../../_modal';
import { HttpClient } from '@angular/common/http';

interface Data {
    Name: string;
    Surname:string;
    Number:string;
}

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
	public removeNumber;
	public updateNumber;
	public data: Data[];
	@ViewChild('catalogue', {static: false}) public insertTarget:ElementRef;

	constructor(private modalService: ModalService, private renderer:Renderer2, private http: HttpClient) {}

	ngOnInit(): void {
		this.getJSON();
	}
	
	clickList(){
		//Clear catalogue
		const myEl = this.insertTarget.nativeElement;
		while(myEl.firstChild) {
  			this.renderer.removeChild(myEl, myEl.lastChild);
		}
		//Sort data array 
		this.data.sort((a,b) => a.Name.localeCompare(b.Name));
 		console.log(this.data);
		//Create div element with Name, Surname , Plate Number and 2 buttons
		for (let i = 0; i < this.data.length; i++) {
			const div = this.renderer.createElement('div');
			const divText = this.renderer.createText(this.data[i].Name +" "+ this.data[i].Surname +" "+ this.data[i].Number);
			const edit = this.renderer.createElement('button');
    		const editText = this.renderer.createText('Edit');
    		const remove = this.renderer.createElement('button');
    		const removeText = this.renderer.createText('Remove');
    		this.renderer.addClass(div,"catalogue__row");
    		this.renderer.addClass(edit,"catalogue__button_edit");
    		this.renderer.addClass(remove,"catalogue__button_remove");
    		this.renderer.appendChild(div, divText);
   			this.renderer.appendChild(edit, editText);
   			this.renderer.appendChild(div, edit);
   			this.renderer.appendChild(remove, removeText);
   			this.renderer.appendChild(div, edit);
   			this.renderer.appendChild(div, remove);
    		this.renderer.appendChild(this.insertTarget.nativeElement, div); 
    		this.renderer.listen(edit, 'click', () => this.clickUpdate(i));
    		this.renderer.listen(remove, 'click', () => this.clickRemove(i));
    	}
	}

	clickAdd(){
		this.modalService.open("add-modal");
	}

	submitAdd(){
		let name = (<HTMLInputElement> document.getElementById("addName")).value;
		let surname = (<HTMLInputElement> document.getElementById("addSurname")).value;
		let plate = (<HTMLInputElement> document.getElementById("addPlate")).value;
		if(this.checkPlateUniq(plate)){
			this.data.push({"Name":name, "Surname": surname, "Number": plate});
			this.writeChanges();
		}else{
			alert("Plate number is not unique!");
		}
		//Clear inputs
		(<HTMLInputElement> document.getElementById("addName")).value="";
		(<HTMLInputElement> document.getElementById("addSurname")).value="";
		(<HTMLInputElement> document.getElementById("addPlate")).value="";
		this.modalService.close("add-modal");
		this.clickList();
	}

	clickUpdate(indexNumber: number){
		this.updateNumber = indexNumber;
		this.modalService.open("update-modal");
	}

	submitUpdate(){
		if((<HTMLInputElement> document.getElementById("Name")).value !== ""){
			this.data[this.updateNumber].Name = (<HTMLInputElement> document.getElementById("Name")).value;
			(<HTMLInputElement> document.getElementById("Name")).value="";	
		}
		if((<HTMLInputElement> document.getElementById("Surname")).value !== ""){
			this.data[this.updateNumber].Surname = (<HTMLInputElement> document.getElementById("Surname")).value;
			(<HTMLInputElement> document.getElementById("Surname")).value="";
		}
		this.modalService.close("update-modal");
		this.writeChanges();
		this.clickList();	
	}

	clickRemove(indexNumber: number){
		this.removeNumber = indexNumber;
		this.modalService.open("remove-modal");
	}

	submitRemove(){
		delete this.data[this.removeNumber];
		this.modalService.close("remove-modal");
		this.data = this.cleanData(this.data);
		this.writeChanges();
		this.clickList();
	}

	checkPlateUniq(plate: string):boolean{
		for(let i = 0; i < this.data.length; i++){
			if(this.data[i].Number === plate){
				return false;
			}
		}
		return true;
	}

	cleanData(data: Data[]){	//Cleaning data from undefined and null
		let tmp:Data[] = [];
		for (let i = 0; i < data.length; i++) {
			if(data[i] === undefined || data[i] === null){
			 	continue;
			}
			tmp.push(data[i]);
    	}
    	return tmp;
	}

	writeChanges(){
  		this.http.post<Data[]>('http://localhost:3000/', this.data).subscribe(data => {
    		console.log(data);
		})
	}

	getJSON(){
		this.http.get<Data[]>('http://localhost:3000/numberPlates.json').subscribe(data => this.data=data); //Not a good style .. but it works (finally)
	}
}
