import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./post.model";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts:Post[] = [];//type declaration for array
  url = "https://angular-app-service-default-rtdb.firebaseio.com/posts.json";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAllPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    //type declaration for return type of method
    this.http.post<{name:string}>(this.url, postData).subscribe((response) => {
      console.log(response);
    });
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }
  private fetchAllPosts() {
    this.http
      .get<{[key:string]:Post}>(this.url)//type declaration for return type of method
      .pipe(
        map((response: { [key: string]: Post }) => {
          const result = Object.entries(response).reduce((acc, crr) => {
            acc.push({ id: crr[0], ...crr[1] });
            return acc;
          }, []);

          return result;
        })
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
