import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';
import { User } from './user';
import { Product } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private productService: ProductService,
  ) { }

  isLogged: boolean = false;
  user?: User;
  users: User[]=[];
  products: Product[]=[];
  URL: boolean = false;

  ngOnInit() {
    this.productService.getProduct().subscribe((data) => {
      this.products = data;
    });
  }

  ngDoCheck() {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
    this.isLogged = this.users.some((user: User) => user.isLoggedIn === true);
    this.user = this.users?.find((user: User) => user?.isLoggedIn === true);
    this.URL = this.router.url.includes('product-detail');
  }

  logout() {
    let user = this.users.find((user: User) => user.email == this.user?.email);
    if (user) {
      user.isLoggedIn = false;
    }
    localStorage.setItem('users', JSON.stringify(this.users));
    this.router.navigate(['/']);
  }

  OnInput(event: Event) {
    let userInput = (event.target as HTMLInputElement).value.trim();
    this.productService.onInputDataEmit(userInput);
  }
}
