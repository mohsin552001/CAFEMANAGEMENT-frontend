import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagaCatagoryComponent } from './managa-catagory.component';

describe('ManagaCatagoryComponent', () => {
  let component: ManagaCatagoryComponent;
  let fixture: ComponentFixture<ManagaCatagoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagaCatagoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagaCatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
