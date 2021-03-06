import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/auth/auth.service';
import { UserService } from '../shared/services/user.service';

import { User /*UserOUT*/ } from '../shared/interfaces/user';
import { ImageOUT } from '../shared/interfaces/image';

declare let $: any;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {

  user: User /*UserOUT*/;
  profilePicture: ImageOUT;
  authenticated: boolean;

  constructor(public authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.userInfos();
    // // Smooth scrolling using jQuery easing
    // $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    //   if (
    //     location.pathname.replace(/^\//, '') ===
    //       this.pathname.replace(/^\//, '') &&
    //     location.hostname === this.hostname
    //   ) {
    //     let target = $(this.hash);
    //     target = target.length
    //       ? target
    //       : $('[name=' + this.hash.slice(1) + ']');
    //     if (target.length) {
    //       $('html, body').animate(
    //         {
    //           scrollTop: target.offset().top - 54,
    //         },
    //         1000,
    //         'easeInOutExpo'
    //       );
    //       return false;
    //     }
    //   }
    // });

    // // Closes responsive menu when a scroll trigger link is clicked
    // $('.js-scroll-trigger').click(function() {
    //   $('.navbar-collapse').collapse('hide');
    // });

    // // Activate scrollspy to add active class to navbar items on scroll
    // $('body').scrollspy({
    //   target: '#mainNav',
    //   offset: 56,
    // });

    // // Collapse Navbar
    // const navbarCollapse = function() {
    //   if ($('#mainNav').offset().top > 100) {
    //     $('#mainNav').addClass('navbar-shrink');
    //   } else {
    //     $('#mainNav').removeClass('navbar-shrink');
    //   }
    // };
    // // Collapse now if page is not at top
    // navbarCollapse();
    // // Collapse the navbar when page is scrolled
    // $(window).scroll(navbarCollapse);

    // // Hide navbar when modals trigger
    // $('.portfolio-modal').on('show.bs.modal', function(e) {
    //   $('.navbar').addClass('d-none');
    // });
    // $('.portfolio-modal').on('hidden.bs.modal', function(e) {
    //   $('.navbar').removeClass('d-none');
    // });
  }

  userInfos(): void {
    if (localStorage.getItem('userChangedValues')) {
      this.user = JSON. parse(localStorage.getItem('userChangedValues'));
    }
    else {
      this.user = this.authService.userLogged();
    }

    if (this.user) {
      this.userService.userImage(this.user.id).subscribe(
        (data) => {
          this.profilePicture = data;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
