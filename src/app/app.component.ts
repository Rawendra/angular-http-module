import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { keyframes } from "@angular/animations";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  url = "https://angular-app-service-default-rtdb.firebaseio.com/posts.json";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAllPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    this.http.post(this.url, postData).subscribe((response) => {
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
      .get(this.url)
      .pipe(
        map((response) => {
 

          const result = Object.entries(response).reduce((acc, crr) => {
            acc.push({ id: crr[0], ...crr[1] });
            return acc
          }, []);

          return result;
        })
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
