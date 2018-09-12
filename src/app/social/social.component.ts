import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  socialsite: any = {};

  constructor(private config: ConfigService) { }

  ngOnInit() {
    this.socialsite = this.getSocial();
  }

  getSocial() {
    return this.config.getConfig().socialsite;
  }

}
