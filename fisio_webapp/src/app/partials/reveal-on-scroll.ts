import { Directive, ElementRef, inject, input, OnDestroy, signal } from '@angular/core';

@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true,
  exportAs: 'reveal',
})
export class RevealOnScrollDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);

  // Ajusta cuándo “entra” (para activar un poco antes)
  readonly rootMargin = input<string>('0px 0px -10% 0px');
  readonly threshold = input<number>(0.15);
  readonly once = input<boolean>(true);

  readonly isVisible = signal(false);

  private io?: IntersectionObserver;

  constructor() {
    this.io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          this.isVisible.set(true);
          if (this.once()) this.io?.disconnect();
        } else if (!this.once()) {
          this.isVisible.set(false);
        }
      },
      { root: null, rootMargin: this.rootMargin(), threshold: this.threshold() },
    );

    this.io.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}
