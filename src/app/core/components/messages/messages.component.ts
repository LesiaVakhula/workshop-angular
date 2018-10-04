import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// @Ngrx
import { Store } from '@ngrx/store';
import { AppState } from './../../+store';
import * as RouterActions from './../../+store/router/router.actions';

import { MessagesService } from './../../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  constructor(
    public messagesService: MessagesService,
    // private router: Router
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  onClose() {
    // this.router.navigate([{ outlets: { popup: null } }]);
    this.store.dispatch(new RouterActions.Go({
      path: [{ outlets: { popup: null } }]
    }));
    this.messagesService.isDisplayed = false;
  }
}
