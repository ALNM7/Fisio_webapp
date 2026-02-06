import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LucideAngularModule, Menu, X } from 'lucide-angular';

type NavItem = {
  name: string;
  path: string;
};

@Component({
  selector: 'app-nav-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
  standalone : true,
  animations: [
    trigger('mobileMenu', [
      state('closed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      state('open', style({ height: '*', opacity: 1, overflow: 'hidden' })),
      transition('closed => open', animate('200ms ease-out')),
      transition('open => closed', animate('150ms ease-in')),
    ]),
  ],
})
export class NavBarComponent {
  private readonly router = inject(Router);

  // íconos
  readonly Menu = Menu;
  readonly X = X;

  // estado
  readonly isOpen = signal(false);

  readonly navItems = signal<NavItem[]>([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Book Appointment', path: '/book-appointment' },
    { name: 'Contact', path: '/contact' },
  ]);

  // URL actual
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e.type === 1), // NavigationEnd
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  readonly url = computed(() => this.currentUrl());

  isActive(path: string): boolean {
    return this.url() === path;
  }

  toggleMenu(): void {
    this.isOpen.update(v => !v);
  }

  closeMenu(): void {
    this.isOpen.set(false);
  }
}
