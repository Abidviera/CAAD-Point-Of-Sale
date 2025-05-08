import { Component } from '@angular/core';
import {  ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @ViewChild('fullscreenElement') fullscreenElement!: ElementRef;
  selectedTab: number = 0;
  withoutCustandPro: boolean = false;
  isFullScreen: boolean = false;
  elem: any;

  onTabChange(index: number) {
    this.selectedTab = index;
  }

  toggleTheme() {
    this.withoutCustandPro = !this.withoutCustandPro;
  }


  async ngOnInit() {
    document.addEventListener('fullscreenchange', () => {
      this.isFullScreen = !!document.fullscreenElement;
    });
  
  }
  ngAfterViewInit(): void {
    this.elem = this.fullscreenElement.nativeElement;
    this.openFullscreen();
  }

  openFullscreen() {
    const elem = this.fullscreenElement.nativeElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().then(() => {
        this.isFullScreen = true;
      });
    } else {
      alert('Fullscreen is not supported in this browser.');
    }
  }

  closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        this.isFullScreen = false;
      });
    } else {
      alert('Fullscreen API is not supported in this browser.');
    }
  }
}
