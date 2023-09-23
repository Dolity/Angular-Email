import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as SockJS from 'sockjs-client';
import { IChatMessage } from 'src/app/interfact/i-chat-response';
import { ChatService } from 'src/app/services/chat.service';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private stompClient: any;

  private CHANEL = "/topic/chat";
  private ENDPOINT = "http://localhost:8080/socket";

  messages: IChatMessage[] = [];

  isConnected = false;

  chatFormGroup = new FormGroup({
    message: new FormControl('', Validators.required)
  });

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.conectWebsocket();
  }

  private conectWebsocket() {
    let ws = new SockJS(this.ENDPOINT);
    this.stompClient = Stomp.over(ws);

    let that = this;

    this.stompClient.connect({}, () => {
      that.isConnected = true;
      that.subscribeToGlobalChat();
    });
  }

  private subscribeToGlobalChat() {
    let that = this;
    this.stompClient.subscribe(this.CHANEL, (message: any) => {

      let newMessage = JSON.parse(message.body);
      console.log(newMessage);

      that.messages.push(newMessage);
    });
  }

  onSubmit() {
    let message = this.chatFormGroup.controls.message.value;

    if (!this.isConnected) {
      alert('Please connect to websocket');
      return;
    }

    if (message !== null) {
      this.chatService.postMessage(message).subscribe(response => {

      }, (error) => {
        console.log(error);
      });
    }
  }

}
