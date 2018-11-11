import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Typed} from './typed';

@Directive({
  selector: '[ng-typed]'
})
export class NgTypedDirective implements OnInit, OnChanges, AfterViewInit {
  typed: Typed;
  @Input('speed') speed: number | undefined;
  @Input('timeout') timeout: number | undefined;
  @Input('hideCursorOnComplete') hideCursorOnComplete = false;
  @Input('text') text: any = '';
  @Output('complete') complete: EventEmitter<null> = new EventEmitter();
  typingLock = false;
  contentObservable: Observable<string>;
  contentSubscription: Subscription;

  constructor (private elRef: ElementRef) {}

  ngOnInit () {
    if (this.text === '') {
      this.text = this.elRef.nativeElement.innerHTML;
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
          ob.next(this.text);
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
      this.typed.textContent = this.text;
      this.typed.begin();
      this.typingLock = true;
    }
  }


  private checkContent() {
    return this.text;
  }

  private createTyped () {
    this.typed = new Typed(this.elRef.nativeElement, {
        speed: this.speed,
        timeout: this.timeout,
        hideCursorOnComplete: this.hideCursorOnComplete,
        onComplete: () => {
          this.complete.emit(null);
          this.typingLock = false;
        }
      },
      this.text
    );

    this.typed.begin();
    this.typingLock = true;
  }
}
