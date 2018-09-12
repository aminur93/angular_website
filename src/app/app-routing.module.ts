import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContentComponent } from './content/content.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ClientsComponent } from './clients/clients.component';
import { PriceComponent } from './price/price.component';
import { HeaderComponent } from './header/header.component';
import {BlogComponent} from './blog/blog.component';
import {ArticleComponent} from './article/article.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {RoutegaurdService} from './routegaurd.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleCreateComponent } from './article-create/article-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HeaderComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'contactus', component: ContactusComponent},
  { path: 'About', component: IntroComponent },
  { path: 'Gallery', component: GalleryComponent },
  { path: 'Service', component: ContentComponent },
  { path: 'Testimonial', component: TestimonialComponent },
  { path: 'Clients', component: ClientsComponent },
  { path: 'Price', component: PriceComponent },
  { path: 'Blog', component: BlogComponent, canActivate: [RoutegaurdService] },
  { path: 'Article/:id', component: ArticleComponent},
  { path: 'Article-edit/:id', component: ArticleEditComponent, canActivate: [RoutegaurdService]},
  { path: 'Article-create', component: ArticleCreateComponent, canActivate: [RoutegaurdService]},
  { path: '404', component: NotfoundComponent},
  { path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
