import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  standalone:true,
  styleUrl: './navbar.css',
})
export class Navbar {

}
