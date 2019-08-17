import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
    /* 
    -Send Http request
    -In angular HTTP requests return Observables and so to make requests and receive responses we must subscribe to them.
    -You don't need to unsubscribe from the observable since the response back will complete the process & its an observable that is 
    provided by angular so it will manage the unsubscribing of the observable.
    */
    this.http
      .post(
        // adding the .json at the end is only a firebase requirement not a REST api requirement.
        "https://ng-course-c2f2f.firebaseio.com/posts.json",
        // this is the request body that we are passing onto/
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }
}
