import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { ArticleService } from '../services/article.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  articles: Article[] = [];
  filteredArticles: Article[] = [];
  searchQuery: string = '';

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(articles => {
      this.articles = articles.results;
      this.filteredArticles = [...this.articles];
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase().trim();

    if (!query) {
      this.filteredArticles = [...this.articles];
      return;
    }

    this.articleService.getArticlesByQuery(query).subscribe(articles => {
      this.filteredArticles = articles.results;
    });
  }

  highlightText(text: string): string {
    if (!this.searchQuery) return text;

    const query = this.searchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, `<span class="highlight">$1</span>`);
  }
}
