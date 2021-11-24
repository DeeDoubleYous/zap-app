import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PangolinItemComponent } from './pangolin-item.component';

describe('PangolinItemComponent', () => {
  let component: PangolinItemComponent;
  let fixture: ComponentFixture<PangolinItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PangolinItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PangolinItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
