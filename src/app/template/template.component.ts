import { Component, OnInit } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Scroll to top
    if ($('#scroll-to-top').length) {
      const scrollTrigger = 100; // px
      const backToTop = function() {
          const scrollTop = $(window).scrollTop();
          if (scrollTop > scrollTrigger) {
            $('#scroll-to-top').addClass('show');
          } else {
            $('#scroll-to-top').removeClass('show');
          }
        };
      backToTop();
      $(window).on('scroll', function() {
        backToTop();
      });
      $('#scroll-to-top').on('click', function(e) {
        e.preventDefault();
        $('html,body').animate(
          {
            scrollTop: 0,
          },
          700
        );
      });
    }
  }
}
