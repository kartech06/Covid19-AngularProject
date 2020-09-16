import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbcardComponent } from './dbcard.component';

describe('DbcardComponent', () => {
  let component: DbcardComponent;
  let fixture: ComponentFixture<DbcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
