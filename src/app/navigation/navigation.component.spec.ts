import { HttpErrorResponse } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, Subject, throwError } from 'rxjs';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { Toast } from '../interfaces/toast';
import { LocalisationModule } from '../localisation/localisation-module';
import { LogsService } from '../logs/logs.service';
import { AuthenticationService } from '../services/authentication-service';
import { LoginService } from '../services/login.service';
import { ToastService } from '../services/toast.service';
import { ToastComponent } from 'src/app/toast/toast.component';

import { NavigationComponent } from './navigation.component';
import { LoginTypes } from '../enums/login-types';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let mockLogService: LogsService;
  let logsService: LogsService;
  let mockLoginService: LoginService;
  let loginService: LoginService;
  let loginSubject: Subject<boolean>;
  let anonymousSubject: Subject<boolean>;
  let mockAuthService: AuthenticationService;
  let authService: AuthenticationService;

  beforeEach(async () => {
    mockLogService = mock(LogsService);
    when(mockLogService.downloadAllLogs()).thenReturn(of(new Blob()));
    when(mockLogService.downloadCurrentLog()).thenReturn(of(new Blob()));
    when(mockLogService.viewCurrentLog()).thenReturn(of(new Blob()));
    logsService = instance(mockLogService);

    mockLoginService = mock(LoginService);
    loginSubject = new Subject<boolean>();
    when(mockLoginService.getLoginShowing()).thenReturn(loginSubject.asObservable());
    anonymousSubject = new Subject<boolean>();
    when(mockLoginService.getAnonymousLogin()).thenReturn(anonymousSubject.asObservable());
    loginService = instance(mockLoginService);

    mockAuthService = mock(AuthenticationService);
    authService = instance(mockAuthService);

    await TestBed.configureTestingModule({
      declarations: [
        NavigationComponent,
        ToastComponent
      ],
      providers: [
        { provide: LogsService, useValue: logsService },
        { provide: LoginService, useValue: loginService },
        { provide: AuthenticationService, useValue: authService }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports:
      [
        RouterModule.forRoot([]),
        NgbToastModule,
        LocalisationModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('view log button calls viewCurrentLog', () => {
    const button = fixture.debugElement.query(By.css('#view-log'));
    const spy = spyOn(component, 'viewCurrentLog');
    button.triggerEventHandler('click', null);
    expect(spy.calls.count()).toBe(1);
  });

  it('download all logs button calls downloadAllLogs', () => {
    const button = fixture.debugElement.query(By.css('#download-all-logs'));
    const spy = spyOn(component, 'downloadAllLogs');
    button.triggerEventHandler('click', null);
    expect(spy.calls.count()).toBe(1);
  });

  it('downloadAllLogs called logService downloadAllLogs', () => {
    component.downloadAllLogs();

    verify(mockLogService.downloadAllLogs()).once();
    expect().nothing();
  });

  it('viewCurrentLog called logService viewCurrentLog', () => {
    component.viewCurrentLog();

    verify(mockLogService.viewCurrentLog()).once();
    expect().nothing();
  });

  it('downloadCurrentLog called logService downloadCurrentLog', () => {
    component.downloadCurrentLog();

    verify(mockLogService.downloadCurrentLog()).once();
    expect().nothing();
  });

  it('downloadCurrentLog button calls downloadCurrentLog', () => {
    const spy = spyOn(component, 'downloadCurrentLog');
    const downloadCurrentLogButton = fixture.debugElement.query(By.css('#download-current-log'));
    downloadCurrentLogButton.triggerEventHandler('click', null);
    expect(spy.calls.count()).toBe(1);
  });

  it('toast component present', () => {
    const toastComponent = fixture.debugElement.query(By.css('app-toast'));
    expect(toastComponent).toBeTruthy();
  });

  it('logout button hidden when login showing', () => {
    let logout = fixture.debugElement.query(By.css('#logout'));
    expect(logout).toBeTruthy();

    loginSubject.next(true);
    fixture.detectChanges();
    logout = fixture.debugElement.query(By.css('#logout'));

    expect(logout).toBeFalsy();

    loginSubject.next(false);
    fixture.detectChanges();
    logout = fixture.debugElement.query(By.css('#logout'));

    expect(logout).toBeTruthy();
  });

  it('nav bar hidden when login showing', () => {
    let nav = fixture.debugElement.query(By.css('nav'));
    expect(nav).toBeTruthy();

    loginSubject.next(true);
    fixture.detectChanges();
    nav = fixture.debugElement.query(By.css('nav'));

    expect(nav).toBeNull();

    loginSubject.next(false);
    fixture.detectChanges();
    nav = fixture.debugElement.query(By.css('nav'));

    expect(nav).toBeTruthy();
  });

  it('logout button calls logout', () => {
    const spy = spyOn(component, 'logout');
    const logoutButton = fixture.debugElement.query(By.css('#logout'));

    logoutButton.triggerEventHandler('click', undefined);

    expect(spy.calls.count()).toBe(1);
  });

  it('logout calls authService logout', () => {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    verify(mockAuthService.logout()).never();

    component.logout();

    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    verify(mockAuthService.logout()).once();
    expect().nothing();
  });

  it('logout button is hidden when login is anonymous', () => {
    let logoutButton = fixture.debugElement.query(By.css('#logout'));
    expect(logoutButton).toBeTruthy();

    anonymousSubject.next(true);
    fixture.detectChanges();

    logoutButton = fixture.debugElement.query(By.css('#logout'));
    expect(logoutButton).toBeFalsy();
  });
});

describe('NavigationComponent Log Errors', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let mockLogService: LogsService;
  let logsService: LogsService;
  let mockToastService: ToastService;
  let toastService: ToastService;
  let blob: Observable<Blob>;

  beforeEach(async () => {
    mockToastService = mock(ToastService);
    toastService = instance(mockToastService);
    mockLogService = mock(LogsService);
    blob = throwError(new HttpErrorResponse({}));
    when(mockLogService.downloadAllLogs()).thenReturn(blob);
    when(mockLogService.downloadCurrentLog()).thenReturn(blob);
    when(mockLogService.viewCurrentLog()).thenReturn(blob);
    logsService = instance(mockLogService);

    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      providers: [
        { provide: LogsService, useValue: logsService },
        { provide: ToastService, useValue: toastService }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [RouterModule.forRoot([]), LocalisationModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('downloadAllLogs calls toastService show', () => {
    const expectedToast: Toast = {
      text: 'Failed to download all logs',
      options: {
        delay: 5000,
        className: 'bg-danger text-light'
      },
      header: 'Error'
    };
    component.downloadAllLogs();

    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    verify(mockToastService.show(deepEqual(expectedToast))).once();
    expect().nothing();
  });

  it('viewCurrentLog calls toastService show', () => {
    const expectedToast: Toast = {
      text: 'Failed to open the current log.',
      options: {
        delay: 5000,
        className: 'bg-danger text-light'
      },
      header: 'Error'
    };
    component.viewCurrentLog();

    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    verify(mockToastService.show(deepEqual(expectedToast))).once();
    expect().nothing();
  });

  it('downloadCurrentLog calls toastService show', () => {
    const expectedToast: Toast = {
      text: 'Failed to download the current log.',
      options: {
        delay: 5000,
        className: 'bg-danger text-light'
      },
      header: 'Error'
    };
    component.downloadCurrentLog();

    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    verify(mockToastService.show(deepEqual(expectedToast))).once();
    expect().nothing();
  });
});

describe('NavigationComponent Logout Button on Anonymous Initialization', () => {
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [RouterModule.forRoot([]), LocalisationModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('loginType', LoginTypes.anonymous);
    fixture = TestBed.createComponent(NavigationComponent);
    fixture.detectChanges();
  });

  it('logout button hidden initially if login local storage login is anonymous', () => {
    const logoutButton = fixture.debugElement.query(By.css('#logout'));
    expect(logoutButton).toBeFalsy();
  });
});

describe('NavigationComponent Logout Button on Credentials Initialization', () => {
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [RouterModule.forRoot([]), LocalisationModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('loginType', LoginTypes.credentials);
    fixture = TestBed.createComponent(NavigationComponent);
    fixture.detectChanges();
  });

  it('logout button hidden initially if login local storage login is anonymous', () => {
    const logoutButton = fixture.debugElement.query(By.css('#logout'));
    expect(logoutButton).toBeTruthy();
  });
});
