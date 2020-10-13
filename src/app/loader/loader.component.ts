import { Component, OnInit } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // LOADER
    $('#preloader').on(500).fadeOut();
    $('.preloader').on(600).fadeOut('slow');
  }

}
