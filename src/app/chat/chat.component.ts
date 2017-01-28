import {Component, OnInit} from '@angular/core';
declare let firebase: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('profile'));
  chatUser: any = JSON.parse(localStorage.getItem('chatUser'));
  msg: any = {};
  messages: any = [];

  constructor() {
    console.log(this.user, this.chatUser);
    this.loadMessages();
  }

  loadMessages() {
    firebase.database().ref().child('inbox').child(this.user.id).child(this.chatUser.id).off('child_added');
    firebase.database().ref().child('inbox').child(this.user.id).child(this.chatUser.id).on('child_added', (m) => {
      this.messages.push(m.val());
    })
  }

  sendImg(file) {
    console.log(file.files);


    if (file.files[0]) {

    }

    let metadata = {
      contentType: 'image/jpeg',
    };
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child('images/' + Date.now() + Math.random() + '.jpeg').put(file.files[0], metadata);
    uploadTask.on('state_changed', (snapshot) => {
    }, (error) => {
    }, () => {
      let downloadURL = uploadTask.snapshot.downloadURL;
      this.msg.img = downloadURL;
      this.sendMessage();
      alert('Sent photo')
    });


  }

  sendMessage() {
    this.msg.time = Date.now();
    firebase.database().ref().child('inbox').child(this.user.id).child(this.chatUser.id).push(this.msg);
    firebase.database().ref().child('inbox').child(this.chatUser.id).child(this.user.id).push(this.msg);
    this.msg.text = "";
  }

  ngOnInit() {
  }

}
