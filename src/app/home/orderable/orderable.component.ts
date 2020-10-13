import { Component, OnInit } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-orderable',
  templateUrl: './orderable.component.html',
  styleUrls: ['./orderable.component.css']
})
export class OrderableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Gallery Filter
    // const Container = $('.container');
    // Container.imagesLoaded(() => {
    //     const portfolio = $('.gallery-menu');
    //     portfolio.on('click', 'button', () => {
    //         $(this).addClass('active').siblings().removeClass('active');
    //         const filterValue = $(this).attr('data-filter');
    //         $grid.isotope({
    //             filter: filterValue
    //         });
    //     });
    //     const $grid = $('.gallery-list').isotope({
    //         itemSelector: '.gallery-grid'
    //     });

    // });
  }

}
