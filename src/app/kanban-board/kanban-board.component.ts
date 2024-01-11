import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent {
  
  // First we define the tasks that will be displayed in each column (i guess we skip editting for now)
  // These are our iteams
  todo = ['todo test 1', 'todo test 2'];
  inProgress = ['inProgress test 1','test 2'];
  done = ['test69','i dont know what to write anymore', 'i guess test 3 will do'];

  // And the categories that will be displayed in the board (the columns)
  categories = [
    { title: 'To Do', tasks: this.todo },
    { title: 'In Progress', tasks: this.inProgress },
    { title: 'Done', tasks: this.done }
  ];

  // Then we define a function that will be called when an item is dropped
  // It takes the event as a parameter and uses the CdkDragDrop interface to get the previous and current index of the item
  drop(event: CdkDragDrop<string[]>) {
    // If the item is dropped in the same column, we move it within the column using moveItemInArray
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    
    // If the item is dropped into a different column, we use transferArrayItem to move it to the selected column
    } else {
      // The function takes a bunch of parameters to accuratley move the item from one array to another
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  // This function returns the id of the column that the item is currently in
  // We use this to link the columns together so that items can also be moved horizontally between the columns
  getConnectedListIds(i: number): string[] {
    return this.categories
      .map((c, index) => index !== i ? 'column-' + index : null)
      .filter(id => id !== null) as string[];
  }
  
  // Add create new task and edit task functions here...
}
