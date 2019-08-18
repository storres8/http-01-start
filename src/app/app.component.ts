import { Component, OnInit } from "@angular/core";
import { Post } from "./post.model";
import { PostsService } from "./posts.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  hasError = null;

  constructor(private PostsService: PostsService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    this.PostsService.createAndStorePosts(
      postData.title,
      postData.content
    ).subscribe(responseData => {
      console.log(responseData);
      this.onFetchPosts();
    });
  }

  onFetchPosts() {
    this.isFetching = true;
    this.PostsService.fetchPosts().subscribe(
      respData => {
        this.loadedPosts = respData;
        this.isFetching = false;
      },
      error => {
        this.hasError = error;
        console.log(error);
      }
    );
  }

  onClearPosts() {
    /*
      This was from my first attempt, also documented in the service.

      this.PostsService.clearPosts(this.loadedPosts)
      this.loadedPosts =[]
    */

    this.PostsService.clearPosts().subscribe(() => {
      this.onFetchPosts();
      console.log("all posts deleted");
    });
  }
}
