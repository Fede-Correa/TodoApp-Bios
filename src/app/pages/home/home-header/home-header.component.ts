import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
})
export class HomeHeaderComponent  implements OnInit {

  constructor(private authUser: AuthService) { }

  ngOnInit() {}


  public get userName(): string {
    return this.authUser.user?.displayName || '';
  }
}
