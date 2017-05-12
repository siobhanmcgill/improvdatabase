/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as import0 from '@angular/core';
import * as import1 from '../../../../../src/app/module/improvplus.module';
import * as import2 from '@angular/forms';
import * as import3 from '@angular/common';
import * as import4 from '@angular/router';
import * as import5 from '../../../../../src/module/shared.module';
import * as import6 from '../../../../../src/app/module/improvplus-routing.module';
import * as import7 from '../../../../../src/service/app.service';
import * as import8 from '../../../../../src/service/user.service';
import * as import9 from '../../../../../src/service/cart.service';
import * as import10 from '../../../../../src/app/service/game-database.service';
import * as import11 from '../../../../../src/app/service/library.service';
import * as import12 from '../../../../../src/app/service/auth-guard.service';
import * as import13 from '../../../../../src/app/service/team.service';
import * as import14 from '../component/unauthorized.component.ngfactory';
import * as import15 from '../component/dashboard.component.ngfactory';
import * as import16 from '../component/materials-library.component.ngfactory';
import * as import17 from '../component/game-database.component.ngfactory';
import * as import18 from '../component/game-details.component.ngfactory';
import * as import19 from '../component/user.component.ngfactory';
import * as import20 from '../component/admin.component.ngfactory';
import * as import21 from '../component/team-list.component.ngfactory';
import * as import22 from '../component/team-details.component.ngfactory';
import * as import23 from '../component/contact.component.ngfactory';
import * as import24 from '../component/about.component.ngfactory';
import * as import25 from '../component/help.component.ngfactory';
import * as import26 from '../component/legal.component.ngfactory';
import * as import27 from '../component/not-found.component.ngfactory';
import * as import28 from '../../../../../src/data/app-http';
import * as import29 from '../../../../../src/app/component/unauthorized.component';
import * as import30 from '../../../../../src/app/component/dashboard.component';
import * as import31 from '../../../../../src/app/component/materials-library.component';
import * as import32 from '../../../../../src/app/component/game-database.component';
import * as import33 from '../../../../../src/app/component/game-details.component';
import * as import34 from '../../../../../src/app/component/user.component';
import * as import35 from '../../../../../src/app/component/admin.component';
import * as import36 from '../../../../../src/app/component/team-list.component';
import * as import37 from '../../../../../src/app/component/team-details.component';
import * as import38 from '../../../../../src/app/component/contact.component';
import * as import39 from '../../../../../src/app/component/about.component';
import * as import40 from '../../../../../src/app/component/help.component';
import * as import41 from '../../../../../src/app/component/legal.component';
import * as import42 from '../../../../../src/app/component/not-found.component';
class ImprovPlusModuleInjector extends import0.ɵNgModuleInjector<import1.ImprovPlusModule> {
  _ɵba_0:import2.ɵba;
  _FormsModule_1:import2.FormsModule;
  _ReactiveFormsModule_2:import2.ReactiveFormsModule;
  _CommonModule_3:import3.CommonModule;
  _RouterModule_4:import4.RouterModule;
  _SharedModule_5:import5.SharedModule;
  _ImprovPlusRoutingModule_6:import6.ImprovPlusRoutingModule;
  _ImprovPlusModule_7:import1.ImprovPlusModule;
  __ɵi_8:import2.ɵi;
  __FormBuilder_9:import2.FormBuilder;
  __NgLocalization_10:import3.NgLocaleLocalization;
  __AppService_11:import7.AppService;
  __UserService_12:import8.UserService;
  __CartService_13:import9.CartService;
  _ROUTES_14:any[];
  __GameDatabaseService_15:import10.GameDatabaseService;
  __LibraryService_16:import11.LibraryService;
  __AuthGuard_17:import12.AuthGuard;
  __TeamService_18:import13.TeamService;
  constructor(parent:import0.Injector) {
    super(parent,[
      import14.UnauthorizedComponentNgFactory,
      import15.DashboardComponentNgFactory,
      import16.MaterialsLibraryComponentNgFactory,
      import17.GameDatabaseComponentNgFactory,
      import18.GameDetailsComponentNgFactory,
      import19.UserComponentNgFactory,
      import20.AdminComponentNgFactory,
      import21.TeamListComponentNgFactory,
      import22.TeamDetailsComponentNgFactory,
      import23.ContactComponentNgFactory,
      import24.AboutComponentNgFactory,
      import25.HelpComponentNgFactory,
      import26.LegalComponentNgFactory,
      import27.NotFoundComponentNgFactory
    ]
    ,([] as any[]));
  }
  get _ɵi_8():import2.ɵi {
    if ((this.__ɵi_8 == null)) { (this.__ɵi_8 = new import2.ɵi()); }
    return this.__ɵi_8;
  }
  get _FormBuilder_9():import2.FormBuilder {
    if ((this.__FormBuilder_9 == null)) { (this.__FormBuilder_9 = new import2.FormBuilder()); }
    return this.__FormBuilder_9;
  }
  get _NgLocalization_10():import3.NgLocaleLocalization {
    if ((this.__NgLocalization_10 == null)) { (this.__NgLocalization_10 = new import3.NgLocaleLocalization(this.parent.get(import0.LOCALE_ID))); }
    return this.__NgLocalization_10;
  }
  get _AppService_11():import7.AppService {
    if ((this.__AppService_11 == null)) { (this.__AppService_11 = new import7.AppService(this.parent.get(import28.AppHttp))); }
    return this.__AppService_11;
  }
  get _UserService_12():import8.UserService {
    if ((this.__UserService_12 == null)) { (this.__UserService_12 = new import8.UserService(this.parent.get(import28.AppHttp))); }
    return this.__UserService_12;
  }
  get _CartService_13():import9.CartService {
    if ((this.__CartService_13 == null)) { (this.__CartService_13 = new import9.CartService(this.parent.get(import28.AppHttp),this._UserService_12)); }
    return this.__CartService_13;
  }
  get _GameDatabaseService_15():import10.GameDatabaseService {
    if ((this.__GameDatabaseService_15 == null)) { (this.__GameDatabaseService_15 = new import10.GameDatabaseService(this.parent.get(import28.AppHttp),this._UserService_12)); }
    return this.__GameDatabaseService_15;
  }
  get _LibraryService_16():import11.LibraryService {
    if ((this.__LibraryService_16 == null)) { (this.__LibraryService_16 = new import11.LibraryService(this.parent.get(import28.AppHttp),this._UserService_12)); }
    return this.__LibraryService_16;
  }
  get _AuthGuard_17():import12.AuthGuard {
    if ((this.__AuthGuard_17 == null)) { (this.__AuthGuard_17 = new import12.AuthGuard(this.parent.get(import4.Router),this._AppService_11,this._UserService_12)); }
    return this.__AuthGuard_17;
  }
  get _TeamService_18():import13.TeamService {
    if ((this.__TeamService_18 == null)) { (this.__TeamService_18 = new import13.TeamService(this.parent.get(import28.AppHttp),this._UserService_12)); }
    return this.__TeamService_18;
  }
  createInternal():import1.ImprovPlusModule {
    this._ɵba_0 = new import2.ɵba();
    this._FormsModule_1 = new import2.FormsModule();
    this._ReactiveFormsModule_2 = new import2.ReactiveFormsModule();
    this._CommonModule_3 = new import3.CommonModule();
    this._RouterModule_4 = new import4.RouterModule(this.parent.get(import4.ɵa,(null as any)),this.parent.get(import4.Router,(null as any)));
    this._SharedModule_5 = new import5.SharedModule();
    this._ImprovPlusRoutingModule_6 = new import6.ImprovPlusRoutingModule();
    this._ImprovPlusModule_7 = new import1.ImprovPlusModule();
      this._ROUTES_14 = [[
        {
          path: 'app',
          children: [
            {
              path: '',
              redirectTo: '/app/dashboard',
              pathMatch: 'full'
            }
            ,
            {
              path: 'unauthorized',
              component: import29.UnauthorizedComponent
            }
            ,
            {
              path: '',
              canActivateChild: [import12.AuthGuard],
              children: [
                {
                  path: 'dashboard',
                  component: import30.DashboardComponent,
                  data: {action: 'dashboard_page_view'}
                }
                ,
                {
                  path: 'materials',
                  component: import31.MaterialsLibraryComponent,
                  data: {action: 'material_page_view'}
                }
                ,
                {
                  path: 'materials/:packageSlug',
                  component: import31.MaterialsLibraryComponent,
                  data: {action: 'material_page_view'}
                }
                ,
                {
                  path: 'games',
                  component: import32.GameDatabaseComponent,
                  data: {action: 'game_view'}
                }
                ,
                {
                  path: 'game/:id',
                  component: import33.GameDetailsComponent,
                  data: {action: 'game_view'}
                }
                ,
                {
                  path: 'user',
                  component: import34.UserComponent,
                  data: {action: 'account_edit'}
                }
                ,
                {
                  path: 'admin',
                  component: import35.AdminComponent,
                  data: {admin: true}
                }
                ,
                {
                  path: 'teams',
                  component: import36.TeamListComponent,
                  data: {action: 'team_page_view'}
                }
                ,
                {
                  path: 'team/:id',
                  component: import37.TeamDetailsComponent,
                  data: {action: 'team_page_view'}
                }
                ,
                {
                  path: 'contact/:type',
                  component: import38.ContactComponent,
                  data: {action: 'contact_page_view'}
                }
                ,
                {
                  path: 'contact',
                  component: import38.ContactComponent,
                  data: {action: 'contact_page_view'}
                }

              ]

            }
            ,
            {
              path: 'about',
              component: import39.AboutComponent
            }
            ,
            {
              path: 'help',
              component: import40.HelpComponent
            }
            ,
            {
              path: 'legal',
              component: import41.LegalComponent
            }
            ,
            {
              path: '**',
              component: import42.NotFoundComponent
            }

          ]

        }
        ,
        {
          path: '**',
          component: import42.NotFoundComponent
        }

      ]
    ];
    return this._ImprovPlusModule_7;
  }
  getInternal(token:any,notFoundResult:any):any {
    if ((token === import2.ɵba)) { return this._ɵba_0; }
    if ((token === import2.FormsModule)) { return this._FormsModule_1; }
    if ((token === import2.ReactiveFormsModule)) { return this._ReactiveFormsModule_2; }
    if ((token === import3.CommonModule)) { return this._CommonModule_3; }
    if ((token === import4.RouterModule)) { return this._RouterModule_4; }
    if ((token === import5.SharedModule)) { return this._SharedModule_5; }
    if ((token === import6.ImprovPlusRoutingModule)) { return this._ImprovPlusRoutingModule_6; }
    if ((token === import1.ImprovPlusModule)) { return this._ImprovPlusModule_7; }
    if ((token === import2.ɵi)) { return this._ɵi_8; }
    if ((token === import2.FormBuilder)) { return this._FormBuilder_9; }
    if ((token === import3.NgLocalization)) { return this._NgLocalization_10; }
    if ((token === import7.AppService)) { return this._AppService_11; }
    if ((token === import8.UserService)) { return this._UserService_12; }
    if ((token === import9.CartService)) { return this._CartService_13; }
    if ((token === import4.ROUTES)) { return this._ROUTES_14; }
    if ((token === import10.GameDatabaseService)) { return this._GameDatabaseService_15; }
    if ((token === import11.LibraryService)) { return this._LibraryService_16; }
    if ((token === import12.AuthGuard)) { return this._AuthGuard_17; }
    if ((token === import13.TeamService)) { return this._TeamService_18; }
    return notFoundResult;
  }
  destroyInternal():void {
  }
}
export const ImprovPlusModuleNgFactory:import0.NgModuleFactory<import1.ImprovPlusModule> = new import0.NgModuleFactory<any>(ImprovPlusModuleInjector,import1.ImprovPlusModule);
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiRTovbGliL0dpdC9pbXByb3ZwbHVzL2FwcC9zcmMvYXBwL21vZHVsZS9pbXByb3ZwbHVzLm1vZHVsZS5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9FOi9saWIvR2l0L2ltcHJvdnBsdXMvYXBwL3NyYy9hcHAvbW9kdWxlL2ltcHJvdnBsdXMubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIiAiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9