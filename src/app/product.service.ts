import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   constructor(private httpClient : HttpClient){}

   getProduct(){
    return this.httpClient.get('https://fakestoreapi.com/products')
   }

   private inputDataSource = new BehaviorSubject<string>('');

   inputData = this.inputDataSource.asObservable();

   onInputDataEmit(input:string){
    this.inputDataSource.next(input)
   }
}
