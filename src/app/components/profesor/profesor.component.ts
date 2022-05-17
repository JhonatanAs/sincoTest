import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataRouteService } from 'src/app/services/data-route.service';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  constructor(
    private route:Router,
    private dataRouteService: DataRouteService
  ) { }

  ngOnInit(): void {
    this.dataRouteService.updateCurrentRoute(this.route.url);
  }

}
