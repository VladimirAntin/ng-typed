import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Typed} from './typed';

@Directive({
  selector: '[ng-typed]'
})
export class NgTypedDirective implements OnInit, OnChanges, AfterViewInit {
  typed: Typed;
  @Input('ng-typed') ngTyped = {
    speed: 0,
    timeout: 0,
    hideCursorOnComplete: false,
    hideCursorOnStart: false,
    text: ''
  }
  @Output('complete') complete: EventEmitter<null> = new EventEmitter();
  typingLock = false;
  contentObservable: Observable<string>;
  contentSubscription: Subscription;

  constructor (private elRef: ElementRef) {}

  ngOnInit () {
    if (!this.ngTyped.text || this.ngTyped.text === '') {
      this.ngTyped.text = this.elRef.nativeElement.innerHTML;
    }
    if (!this.checkContent()) {
      return;
    }
    this.createTyped();
  }

  ngAfterViewInit () {
    if (this.typed) {
      return;
    }

    if (!this.checkContent()) {
      this.contentObservable = new Observable((ob) => {
        if (this.checkContent()) {
          ob.next(this.ngTyped.text);
          ob.complete();
        }
      });

      this.contentSubscription = this.contentObservable.subscribe((content) => {
        this.createTyped();
        this.contentSubscription.unsubscribe();
      });

      return;
    }

    this.createTyped();
  }

  ngOnChanges (changes: SimpleChanges) {
    if ('text' in changes && this.typed) {
      if (this.typingLock) {
        return;
      }
      this.typed.textContent = this.ngTyped.text;
      this.typed.begin();
      this.typingLock = true;
    }
  }


  private checkContent() {
    return this.ngTyped.text;
  }

  createTyped () {
    this.typed = new Typed(this.elRef.nativeElement, {
        speed: this.ngTyped.speed,
        timeout: this.ngTyped.timeout,
        hideCursorOnComplete: this.ngTyped.hideCursorOnComplete,
        hideCursorOnStart: this.ngTyped.hideCursorOnStart,
        onComplete: () => {
          this.complete.emit(null);
          this.typingLock = false;
        }
      },
      this.ngTyped.text
    );

    this.typed.begin();
    this.typingLock = true;
  }
}
