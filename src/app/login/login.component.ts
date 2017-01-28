import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
declare let firebase: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};

  constructor(public router: Router) {
  }

  doLogin() {
    firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(
      (data) => {
        localStorage.setItem('userID', data.uid);
        firebase.database().ref('users/' + data.uid).once('value', (userData) => {
          let user = userData.val();
          if (user) {
            localStorage.setItem('profile', JSON.stringify(user));
            this.router.navigate(['/userList']);
          }
        });
      }, (err) => {
        alert(err.message);
      });
  }

  ngOnInit() {
  }

}
