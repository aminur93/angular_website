import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';
import {isUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const users = [
      { id: 11, firstName: 'aminur', lastName: 'rashid', email: 'aminurrashid126@gmail.com', password: '123456' },
      { id: 12, firstName: 'rashid', lastName: 'khan', email: 'rashidkhan420123@gmail.com', password: '123456' },
    ];

    const posts = [
      {id: 1, title: 'My First Title', author: 'pavel', image: 'gallery-image-1.jpg',
        publishdate: '2018-09-19T07:22Z', excert: 'This procedure has only been gathered by a reliable space suit'},
      {id: 2, title: 'My Second Title', author: 'Smon', image: 'gallery-image-2.jpg',
        publishdate: '2018-09-19T07:22Z', excert: 'This procedure has only been gathered by a reliable space suit'},
      {id: 3, title: 'My Third Title', author: 'Mamun', image: 'gallery-image-3.jpg',
        publishdate: '2018-09-19T07:22Z', excert: 'This procedure has only been gathered by a reliable space suit'},
      {id: 4, title: 'My Fourth Title', author: 'Sagor', image: 'gallery-image-4.jpg',
        publishdate: '2018-09-19T07:22Z', excert: 'This procedure has only been gathered by a reliable space suit'},
      {id: 5, title: 'My Fifth Title', author: 'Robin', image: 'gallery-image-5.jpg',
        publishdate: '2018-09-19T07:22Z', excert: 'This procedure has only been gathered by a reliable space suit'},
      {id: 6, title: 'My Sixth Title', author: 'Jhon', image: 'gallery-image-6.jpg',
        publishdate: '2018-09-19T07:22Z', excert: 'This procedure has only been gathered by a reliable space suit'},
      {id: 7, title: 'My Seven Title', author: 'Anim', image: 'gallery-image-5.jpg',
        publishdate: '2018-09-19T07:22Z', excert: 'This procedure has only been gathered by a reliable space suit'},
      {id: 8, title: 'My Eight Title', author: 'Khan', image: 'gallery-image-4.jpg',
        publishdate: '2018-09-19T07:22Z', excert: 'This procedure has only been gathered by a reliable space suit'},
      {id: 9, title: 'My Nine Title', author: 'Ratul', image: 'gallery-image-3.jpg',
        publishdate: '2018-09-19T07:22Z', excert: 'This procedure has only been gathered by a reliable space suit'},
      {id: 10, title: 'My Ten Title', author: 'Rasel', image: 'gallery-image-1.jpg',
        publishdate: '2018-09-19T07:22Z', excert: 'This procedure has only been gathered by a reliable space suit'},
      {id: 11, title: 'My Eleven Title', author: 'Anan', image: 'gallery-image-2.jpg',
        publishdate: '2018-09-19T07:22Z', excert: 'This procedure has only been gathered by a reliable space suit'},
      {id: 12, title: 'My Twelve Title', author: 'Farukh', image: 'gallery-image-4.jpg',
        publishdate: '2018-09-19T07:22Z', excert: 'This procedure has only been gathered by a reliable space suit'},
      {id: 13, title: 'My Thirteen Title', author: 'Rashed', image: 'gallery-image-6.jpg',
        publishdate: '2018-09-19T07:22Z', excert: 'This procedure has only been gathered by a reliable space suit'},
      {id: 14, title: 'My Fourtheen Title', author: 'Lira', image: 'gallery-image-2.jpg',
        publishdate: '2018-09-19T07:22Z', excert: 'This procedure has only been gathered by a reliable space suit'},
      ];
    return {users, posts};
  }

  getToken(user) {
    return 'This is a token';
  }

  get(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'posts') {
      return this.getArticles(reqInfo);
    }
    return undefined;
  }

  getArticles(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
      const collection = reqInfo.collection;
      const id = reqInfo.id;
      const data = id === undefined ? collection : reqInfo.utils.findById(collection, id);
      const options: ResponseOptions = data ?
        {
          body: dataEncapsulation ? { data } : data,
          status: 200
        } :
        {
          body: { error: `Post not found` },
          status: 404
        };

      options.statusText = options.status === 200 ? 'ok' : 'Not Found' ;
      options.headers = reqInfo.headers;
      options.url = reqInfo.url;
      return options;


    });
  }

  post(reqInfo: RequestInfo) {

    if (reqInfo.id === 'login') {
      console.log('from login');
      return reqInfo.utils.createResponse$(() => {
        const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
        const users = reqInfo.collection.find(user => {
          return reqInfo.req['body'].email === user.email && reqInfo.req['body'].password === user.password ;
        });

        let responseBody = {};

        if (users) {
          responseBody = {
            id: users.id,
            firstName: users.firstName,
            lastName: users.lastName,
            email: users.email,
            token: this.getToken(users)
          };
        }

        const options: ResponseOptions = responseBody ?
          {
            body: dataEncapsulation ? { responseBody } : responseBody,
            status: 200
          } :
          {
            body: { error: `'User' with email='${reqInfo.req['body'].email}' not found` },
            status: 404
          };

        options.statusText = options.status === 200 ? 'ok' : 'Not Found' ;
        options.headers = reqInfo.headers;
        options.url = reqInfo.url;
        return options;


      });


    } else if (reqInfo.id === 'signup') {
      reqInfo.id = null;
      console.log('Form Signup');
    }
  }
}
