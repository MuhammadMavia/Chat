import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
declare let firebase: any;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('profile'));
  users: any = [];

  constructor(public router: Router) {
    this.loadUsers();
  }


  loadUsers() {
    firebase.database().ref('users').on('child_added', (user) => {
      let u = user.val();
      if(user.key != this.user.id){
        this.users.unshift(u);
      }
    });
  }

  goToChat(user) {
    localStorage.setItem('chatUser', JSON.stringify(user));
    this.router.navigate(['/chat'])
  }

  ngOnInit() {
  }

}
