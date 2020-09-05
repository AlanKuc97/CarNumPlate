import { Component, Renderer2, OnInit } from '@angular/core';
import {Directive, Input, ViewChild, ElementRef} from '@angular/core';
//import {Popup} from 'ng2-opd-popup';
import data from '../../../numberPlates.json';
import { ModalService } from '../../_modal';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
	@ViewChild('catalogue', {static: false}) public insertTarget:ElementRef;
	constructor(private modalService: ModalService, private renderer:Renderer2) {}
	ngOnInit(): void {

	}
	
	clickList(){
		//Clear catalogue
		const myEl = this.insertTarget.nativeElement;
		while(myEl.firstChild) {
  			this.renderer.removeChild(myEl, myEl.lastChild);
		}
		//

		//Create div element with Name, Surname , Plate Number and 2 buttons
		for (let i = 0; i < data.length; i++) {
			const div = this.renderer.createElement('div');
			const divText = this.renderer.createText(data[i].Name +" "+ data[i].Surname +" "+ data[i].Number);
			const edit = this.renderer.createElement('button');
    		const editText = this.renderer.createText('Edit');
    		const remove = this.renderer.createElement('button');
    		const removeText = this.renderer.createText('Remove');
    		this.renderer.addClass(div,"catalogue__row");
    		this.renderer.addClass(edit,"catalogue__button");
    		this.renderer.addClass(remove,"catalogue__button");
    		this.renderer.appendChild(div, divText);
   			this.renderer.appendChild(edit, editText);
   			this.renderer.appendChild(div, edit);
   			this.renderer.appendChild(remove, removeText);
   			this.renderer.appendChild(div, edit);
   			this.renderer.appendChild(div, remove);
    		this.renderer.appendChild(this.insertTarget.nativeElement, div); 
    		this.renderer.listen(edit, 'click', () => this.clickUpdate());
    		this.renderer.listen(remove, 'click', () => this.clickRemove());
    	}


    	
	}
	clickAdd(){
		console.log("Add clicked!");
		this.modalService.open("add-modal");
	}
	clickUpdate(){
		console.log("Update clicked!");
		this.modalService.open("update-modal");
	}
	clickRemove(){
		console.log("Remove clicked!");
		this.modalService.open("remove-modal");
	}
}
