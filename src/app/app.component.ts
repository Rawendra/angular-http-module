import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Post } from "./post.model";
import { PostService } from "./posts.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = []; //type declaration for array
  isLoading = false;
  url = "https://angular-app-service-default-rtdb.firebaseio.com/posts.json";

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.fetchAllPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.isLoading = true;
    this.postService.createPost(postData).subscribe(() => {
      this.fetchAllPosts();
    });
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    this.isLoading = true;
    this.postService.clearPosts().subscribe(() => {
      this.loadedPosts = [];
      this.isLoading = false;
    });
  }

  private fetchAllPosts() {
    this.isLoading = true;
    this.postService.fetchPost().subscribe((response) => {
      this.loadedPosts = response;
      this.isLoading = false;
    });
  }
}
