import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ErrorModalComponent,
        BannerComponent
      ],
      imports: [
        HttpClientModule,
        CommonModule,
        RouterTestingModule
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
