import {
    Component,
    OnInit
} from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
    selector: 'app-cities',
    templateUrl: './cities.component.html',
    styleUrls: ['./cities.component.css'],
	providers:[EventService]
})
export class CitiesComponent implements OnInit {

    //bharat
    event: any = {eventname:'',actionsList:[]};
    availableEndPointsList: any = [];
	isDependencyChecked: boolean = false;
	
   

    constructor(private eventService: EventService) {}

    ngOnInit() {
        console.log("City Component Init");
        this.intializeEventData(); //bharat
        this.setAvailableEndPoints(); //bharat
    }

    //bharat

    intializeEventData() {
        this.event.actionsList = [];
        this.addAction();
    }

    onEventNameChange(event) {
        console.log(event);
    }
   
    setAvailableEndPoints() {
        this.availableEndPointsList = [];
        this.availableEndPointsList.push({
            key: 'https://fetchcall',
            value: 'https://fetchcall',
            type: 'GET',
            inputs: '{input:data}'
        });
        this.availableEndPointsList.push({
            key: 'https://GlobalFileUpload',
            value: 'https://GlobalFileUpload',
            type: 'POST',
            inputs: '{input:data}'
        });
        this.availableEndPointsList.push({
            key: 'https://fetchcall2',
            value: 'https://fetchcall2',
            type: 'POST',
            inputs: '{input:data}'
        });
    }
    onDepenciesSelection(depSelection, currentAction) {
        let allActions = this.event.actionsList;
        let mappedActionsList = [];
        if (depSelection) {
            allActions.forEach(action => {
                if (action != currentAction) {
                    mappedActionsList.push({
                        'name': action.actionName,
						'actionId':action.id,
                        'order': ''
                    });
                }
            });
            currentAction.mappedActionsList = mappedActionsList;
        } else {
            currentAction.mappedActionsList = [];
        }
    }
    removeAction(actionIndex) {
		if(this.event.actionsList.length > 1){
			this.event.actionsList.splice(actionIndex, 1);
		}
    }
    addAction() {
        let action = {
            'actionName': '',
			'id':this.event.actionsList.length,
            'endPoint': {},
            'mappedActionsList': [],
			'isDependencyChecked': false
        };
        this.event.actionsList.push(action)
    }
	
	saveEvent(){
		console.log(this.event);
		this.eventService.saveEvent(this.event).subscribe(data =>{
					console.log(data);
				}, 
                error => {
				
					console.log("ERROR: In authanticating"+error)
				});
	}
	
	addMappedAction(currentAction){
	    let currentMappedActionsList = currentAction.mappedActionsList;
		let allActionsList = this.event.actionsList;
		currentMappedActionsList.forEach(mappedAction => {
                 allActionsList.forEach(action => {
				 if(action != currentAction && currentMappedActionsList.actionId != action.id){
					 currentMappedActionsList.push({
							'name': action.actionName,
							'actionId':action.id,
							'order': ''
						});
					}
				});
                   
                
            });
		
		
	}
	removeMappedAction(action,mappedIndex){		
		let mappedActionsList = action.mappedActionsList;
		mappedActionsList.splice(mappedIndex,1);
		if(action.mappedActionsList.length == 0){
			action.isDependencyChecked = false;
		}
	}
	
	onActionNameChange(currentAction){
		let allActions = this.event.actionsList;
		allActions.forEach(action => {
					action.mappedActionsList.forEach(mappedAction => {
						if(mappedAction.actionId == currentAction.id){
								mappedAction.name = currentAction.actionName;
						}
					
					});
		});
	}



}