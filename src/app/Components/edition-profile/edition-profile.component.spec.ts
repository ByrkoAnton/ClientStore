import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionProfileComponent } from './edition-profile.component';

describe('EditionProfileComponent', () => {
  let component: EditionProfileComponent;
  let fixture: ComponentFixture<EditionProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
