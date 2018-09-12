import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {

  price: any = {};

  constructor(private config: ConfigService) { }

  ngOnInit() {

    this.price = this.getPrice();
  }

  getPrice() {
    return this.config.getConfig().price;
  }

}
