import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemData } from 'src/app/model/item-data';
import { ItemService } from 'src/app/services/item-service';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.css']
})
export class ItemMenuComponent implements OnInit {

  filter;
  allItems: ItemData[];
  filteredItems: Observable<ItemData[]>;
  searchBox = new FormControl();
  selectedItems: ItemData[] = [];

  constructor(private router: Router,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getAllItems(true).subscribe(items => {
      this.allItems = items;
      this.filteredItems = this.searchBox.valueChanges.pipe(
        startWith(null),
        map((item: string | null) => item ? this._filter(item) : this.allItems.slice()));
    });
  }

  private _filter(value: string): ItemData[] {
    const filterValue = value.toString().toLowerCase();

    return this.allItems.filter(item => item.itemName.toLowerCase().indexOf(filterValue) >= 0);
  }

  selectItem(itemName: String) {
    const index = this.allItems.findIndex(x => x.itemName === itemName);
    this.allItems[index].stocksLeft--;
    if(this.allItems[index].stocksLeft == 0){
      this.allItems.splice(index, 1);
    }
    this.filteredItems = this.searchBox.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => item ? this._filter(item) : this.allItems.slice()));
  }

}
