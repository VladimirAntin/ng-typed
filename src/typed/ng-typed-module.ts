import { NgModule } from '@angular/core';
import { NgTypedDirective } from './ng-typed.directive';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [
        NgTypedDirective
    ],
    exports: [
        NgTypedDirective
    ]
})
export class NgTypedModule { }
