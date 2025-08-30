import { Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { ArticlePageComponent } from './article-page/article-page.component';

export const routes: Routes = [
    { path: '', component: CardsComponent },
    { path: 'article/:id', component: ArticlePageComponent }
];
