import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private http: HttpClient) {}

  createAndStorePosts(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    /* 
    -Send Http request
    -In angular HTTP requests return Observables and so to make requests and receive responses we must subscribe to them.
    -You don't need to unsubscribe from the observable since the response back will complete the process & its an observable that is 
    provided by angular so it will manage the unsubscribing of the observable.
    */
    return this.http.post<{ name: string }>(
      // adding the .json at the end is only a firebase requirement not a REST api requirement.
      "https://ng-course-c2f2f.firebaseio.com/posts.json",
      // this is the request body that we are passing onto/
      postData
    );
  }

  fetchPosts() {
    // by placing the return here at the top, were are returning the entire observable we get from making this HTTP request.
    // Which we can then subscribe to into the component that needs it onces this service has been injected.
    return (
      this.http
        .get<{ [key: string]: Post }>(
          "https://ng-course-c2f2f.firebaseio.com/posts.json"
        )
        /*
      - We are using rxjs operators which are methods that you can use on Observables (and Subjects) that allow you to 
        change the original observable in some manner and return a new observable. 
      - Thus in our case we are changing our incoming respData from an object to an array of objects with a specific key. We use 
        the map operator to loop through all the objects in our data base, transform them into the format we want, push 
        into a newly created array, and then return that array. 
      - rxjs Observable Operators allow us to to modify the data, and return new data, all will still returning an observable.
      */
        .pipe(
          map(respData => {
            const postsArray: Post[] = [];
            for (const key in respData) {
              if (respData.hasOwnProperty(key)) {
                postsArray.push({ id: key, ...respData[key] });
              }
            }
            return postsArray;
          })
        )
    );
  }

  clearPosts() {
    // This was my original attempt at deleting where I didn't know we could just mass delete with one link.
    // Must import the array of posts into this function for this methods to work.
    // const keys: string[] = [];
    // for (let post of posts) {
    //   keys.push(post.id);
    // }
    // for (let key of keys) {
    //   this.http
    //     .delete<string>(
    //       `https://ng-course-c2f2f.firebaseio.com/posts/${key}.json`
    //     )
    //     .subscribe();
    // }

    return this.http.delete(
      "https://ng-course-c2f2f.firebaseio.com/posts.json"
    );
  }
}
