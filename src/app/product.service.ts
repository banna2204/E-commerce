import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProduct():Observable<Product[]> {
    return this.httpClient.get<Product[]>('https://fakestoreapi.com/products')
  }

  getProductById(id: string):Observable<Product> {
    return this.httpClient.get<Product>(`https://fakestoreapi.com/products/${id}`)
  }

  private inputDataSource = new BehaviorSubject<string>('');

  inputData = this.inputDataSource.asObservable();

  onInputDataEmit(input: string) {
    this.inputDataSource.next(input)
  }
}
