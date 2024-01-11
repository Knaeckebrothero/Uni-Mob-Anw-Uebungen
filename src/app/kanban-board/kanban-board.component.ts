import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent {
  todo = [
    'Get to work',
    'Pick up groceries'
  ];

  inProgress = [
    'Get up',
    'Brush teeth'
  ];

  done = [
    'Get up',
    'Brush teeth'
  ];

  categories = [
    { title: 'To Do', tasks: this.todo },
    { title: 'In Progress', tasks: this.inProgress },
    { title: 'Done', tasks: this.done }
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  getConnectedListIds(i: number): string[] {
    return this.categories
      .map((c, index) => index !== i ? 'column-' + index : null)
      .filter(id => id !== null) as string[];
  }    
}
