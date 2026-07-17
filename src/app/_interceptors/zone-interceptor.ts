import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoneInterceptor implements HttpInterceptor {
  constructor(private zone: NgZone) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return new Observable<HttpEvent<any>>(observer => {
      next.handle(req).subscribe({
        next: (event) => {
          this.zone.run(() => observer.next(event));
        },
        error: (err) => {
          this.zone.run(() => observer.error(err));
        },
        complete: () => {
          this.zone.run(() => observer.complete());
        }
      });
    });
  }
}
