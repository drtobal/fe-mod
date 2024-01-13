import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { GameStorageService } from '../../services/game-storage/game-storage.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { WelcomeComponent } from '../welcome/welcome.component';
import { GameComponent } from '../game/game.component';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, WelcomeComponent, GameComponent],
  providers: [GameStorageService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent implements OnInit {
  /** check if the code is running in server side or browser */
  isBrowser: boolean = false;

  userName: string | null = null;

  /** component constructor */
  constructor(
    private gameStorageService: GameStorageService,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: string,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.userName = this.gameStorageService.getUserName();
  }

  onUserName(name: string): void {
    this.userName = name;
    this.gameStorageService.saveUserName(this.userName);
    this.changeDetectorRef.detectChanges();
  }
}
