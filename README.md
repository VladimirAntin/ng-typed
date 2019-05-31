# Angular 6 Ng Typed animation Directive

## Installation

`ng-typed` is available via [npm](https://www.npmjs.com/package/ng-typed)

Using npm:
```bash
$ npm install ng-typed --save
```

- Import NgTypedModule to your AppModule

``` js
import { NgModule } from '@angular/core'
import { BrowserModule  } from '@angular/platform-browser'

import { AppComponent } from './app.component';
import { NgTypedModule } from 'ng-typed'

@NgModule({
    imports: [
        BrowserModule,
        NgTypedModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

- Use it in your template

``` html
<span [ng-typed]="{speed: 40, timeout: 1000}"></span>

```

## Demo

- [Working Demo](https://vladimirantin.github.io/projects/ng-typed)

## @Input("ng-typed")

- speed
- timeout
- hideCursorOnComplete
- hideCursorOnStart
- text
- cursor

## @Output("complete")


## Creator

#### [Vladimir Antin](mailto:antin502@gmail.com)
- [@GitHub](https://github.com/vladimirantin)
