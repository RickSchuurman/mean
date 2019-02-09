import {Component, OnInit, OnDestroy} from '@angular/core';
import {PageEvent} from '@angular/material';
import {Subscription} from 'rxjs';

import {Post} from '../post.model';
import {PostsService} from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;

  totalPosts = 10;
  postPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public postsService: PostsService) {
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  onChangedPaged(pageData: PageEvent) {
    console.log(pageData);
  }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
