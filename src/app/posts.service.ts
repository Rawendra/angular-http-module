import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";
import { postUrl } from "./constant.util";
@Injectable({ providedIn: "root" })
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(post: Post) {
    this.http.post<{ name: string }>(postUrl, post).subscribe((response) => {
      console.log(response);
    });
  }
  fetchPost() {}
}
