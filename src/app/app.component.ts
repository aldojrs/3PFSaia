import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LoadingService } from '../core/services/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    @ViewChild(MatSidenav) sidenav!: MatSidenav;

    isLoading = false;

    constructor(private loadingService: LoadingService) {
        this.loadingService.isLoading$.subscribe({
            next: (loading) => {
                setTimeout(() => {
                    this.isLoading = loading;
                });
            },
        });
    }

    toggleMenu() {
        this.sidenav.toggle();
    }
}

