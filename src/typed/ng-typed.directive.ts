import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { Typed, NgTypedOptions} from './typed';

@Directive({
  selector: '[ng-typed]'
})
export class NgTypedDirective implements OnInit, OnChanges, AfterViewInit {
  typed: Typed;
  @Input('ng-typed') ngTyped: NgTypedOptions = {
    speed: 0,
    timeout: 0,
    hideCursorOnComplete: false,
    hideCursor: false,
    text: '',
    cursor: '|'
  };
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
        hideCursor: this.ngTyped.hideCursor,
        onComplete: () => {
          this.complete.emit(null);
          this.typingLock = false;
        },
        text: this.ngTyped.text,
        cursor: this.ngTyped.cursor
      }
    );

    this.typed.begin();
    this.typingLock = true;
  }
}
