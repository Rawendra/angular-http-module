import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";
import { postUrl } from "./constant.util";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(post: Post) {
    return this.http.post<{ name: string }>(postUrl, post) 
  }
  clearPosts() {
    const obs = this.http.delete(postUrl);
    return obs;
  }
  
  fetchPost() {
    const observable = this.http
      .get<{ [key: string]: Post }>(postUrl) //type declaration for return type of method
      .pipe(
        map((response: { [key: string]: Post }) => {
          if(!response){
            return []
          }
          const result = Object.entries(response).reduce((acc, crr) => {
            acc.push({ id: crr[0], ...crr[1] });
            return acc;
          }, []);

          return result;
        })
      );

    return observable;
  }
}
