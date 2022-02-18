import { Component } from '@angular/core';
import { AzureKeyCredential, WebPubSubServiceClient } from '@azure/web-pubsub';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'azurewebpubsub';
  cred = new AzureKeyCredential('4W+BtG66BheERI6NGTT2vJV/UGkt/kWbnQIjNnEcXE8=');
  endpoint = 'https://rajwebpubsubdemo.webpubsub.azure.com';

  constructor() { }

  async ngOnInit(): Promise<void> {
    this.subscribeNotification();
  }

  async subscribeNotification() {
    const serviceClient = new WebPubSubServiceClient(this.endpoint, this.cred, 'raj');
   // new WebPubSubServiceClient()
   // const serviceClient = new WebPubSubServiceClient(this.endpoint, this.cred, 'Hub');
    let token = await serviceClient.getClientAccessToken();
    let ws = new WebSocket(token.url);
    ws.onmessage = function (e) {
      var server_message = e.data;
      console.log(server_message);
    }
  };
}
