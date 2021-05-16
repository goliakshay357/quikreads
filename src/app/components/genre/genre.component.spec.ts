import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreComponent } from './genre.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';


describe('GenreComponent', () => {
  let component: GenreComponent;
  let fixture: ComponentFixture<GenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreComponent ],
      imports: [RouterTestingModule, HttpClientModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
