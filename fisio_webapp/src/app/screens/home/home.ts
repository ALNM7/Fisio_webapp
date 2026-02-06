import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { NavBarComponent } from '../../partials/nav-bar/nav-bar';
import { RevealOnScrollDirective } from '../../partials/reveal-on-scroll';
import {
  LucideAngularModule,
  type LucideIconData,
  Activity,
  Heart,
  Zap,
  Award,
  Clock,
  Users,
  Shield,
} from 'lucide-angular';

type Card = { icon: LucideIconData; title: string; description: string };

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NavBarComponent, LucideAngularModule, RevealOnScrollDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(14px)' }),
        animate('380ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),

    // Se dispara cuando el contenedor pasa de out -> in (reveal por scroll)
    trigger('staggerList', [
      transition('out => in', [
        query(
          '[data-stagger-item]',
          [
            style({ opacity: 0, transform: 'translateY(12px)' }),
            stagger(90, [
              animate('320ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class Home {
  // Icons
  readonly Activity = Activity;
  readonly Heart = Heart;
  readonly Zap = Zap;

  readonly Award = Award;
  readonly Clock = Clock;
  readonly Users = Users;
  readonly Shield = Shield;

  readonly services = signal<Card[]>([
    {
      icon: this.Activity,
      title: 'Sports Rehabilitation',
      description: 'Expert care for athletic injuries and performance optimization',
    },
    {
      icon: this.Heart,
      title: 'Injury Recovery',
      description: 'Comprehensive treatment plans for faster healing',
    },
    {
      icon: this.Zap,
      title: 'Post-Surgery Therapy',
      description: 'Specialized care for post-operative rehabilitation',
    },
  ]);

  readonly trustElements = signal<Card[]>([
    {
      icon: this.Award,
      title: 'Certified Professionals',
      description: 'Licensed and experienced physiotherapists',
    },
    {
      icon: this.Clock,
      title: '15+ Years Experience',
      description: 'Serving the community since 2011',
    },
    {
      icon: this.Users,
      title: '5000+ Patients',
      description: 'Trusted by thousands of satisfied clients',
    },
    {
      icon: this.Shield,
      title: 'Patient-Focused Care',
      description: 'Personalized treatment plans for every individual',
    },
  ]);
}
