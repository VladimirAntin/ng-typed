# Angular 6 Ng Typed animation Directive

# Usage

- Install node_module `ng-typed`

```
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
<span ng-typed [speed]="40" [timeout]="1000" (complete)="onComplete()"></span>
