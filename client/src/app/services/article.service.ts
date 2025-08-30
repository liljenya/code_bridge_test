import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResult } from '../models/paginated-result';
import { Article } from '../models/article';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  http: any;

  constructor(private client: HttpClient) { }

  getArticles() {
    const params = new HttpParams().set('format', 'json');
    return this.client.get<PaginatedResult<Article>>('https://api.spaceflightnewsapi.net/v4/articles', { params }).pipe(take(1));
  }

  getArticleById(id: number) {
    return this.client.get<Article>(`https://api.spaceflightnewsapi.net/v4/articles/${id}/`);
  }


}