/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as import0 from '@angular/core';
import * as import1 from '../../../../../src/app/module/improvplus-routing.module';
import * as import2 from '@angular/router';
import * as import3 from '../component/unauthorized.component.ngfactory';
import * as import4 from '../component/dashboard.component.ngfactory';
import * as import5 from '../component/materials-library.component.ngfactory';
import * as import6 from '../component/game-database.component.ngfactory';
import * as import7 from '../component/game-details.component.ngfactory';
import * as import8 from '../component/user.component.ngfactory';
import * as import9 from '../component/admin.component.ngfactory';
import * as import10 from '../component/team-list.component.ngfactory';
import * as import11 from '../component/team-details.component.ngfactory';
import * as import12 from '../component/contact.component.ngfactory';
import * as import13 from '../component/about.component.ngfactory';
import * as import14 from '../component/help.component.ngfactory';
import * as import15 from '../component/legal.component.ngfactory';
import * as import16 from '../component/not-found.component.ngfactory';
import * as import17 from '../../../../../src/app/component/unauthorized.component';
import * as import18 from '../../../../../src/app/service/auth-guard.service';
import * as import19 from '../../../../../src/app/component/dashboard.component';
import * as import20 from '../../../../../src/app/component/materials-library.component';
import * as import21 from '../../../../../src/app/component/game-database.component';
import * as import22 from '../../../../../src/app/component/game-details.component';
import * as import23 from '../../../../../src/app/component/user.component';
import * as import24 from '../../../../../src/app/component/admin.component';
import * as import25 from '../../../../../src/app/component/team-list.component';
import * as import26 from '../../../../../src/app/component/team-details.component';
import * as import27 from '../../../../../src/app/component/contact.component';
import * as import28 from '../../../../../src/app/component/about.component';
import * as import29 from '../../../../../src/app/component/help.component';
import * as import30 from '../../../../../src/app/component/legal.component';
import * as import31 from '../../../../../src/app/component/not-found.component';
class ImprovPlusRoutingModuleInjector extends import0.ɵNgModuleInjector<import1.ImprovPlusRoutingModule> {
  _RouterModule_0:import2.RouterModule;
  _ImprovPlusRoutingModule_1:import1.ImprovPlusRoutingModule;
  _ROUTES_2:any[];
  constructor(parent:import0.Injector) {
    super(parent,[
      import3.UnauthorizedComponentNgFactory,
      import4.DashboardComponentNgFactory,
      import5.MaterialsLibraryComponentNgFactory,
      import6.GameDatabaseComponentNgFactory,
      import7.GameDetailsComponentNgFactory,
      import8.UserComponentNgFactory,
      import9.AdminComponentNgFactory,
      import10.TeamListComponentNgFactory,
      import11.TeamDetailsComponentNgFactory,
      import12.ContactComponentNgFactory,
      import13.AboutComponentNgFactory,
      import14.HelpComponentNgFactory,
      import15.LegalComponentNgFactory,
      import16.NotFoundComponentNgFactory
    ]
    ,([] as any[]));
  }
  createInternal():import1.ImprovPlusRoutingModule {
    this._RouterModule_0 = new import2.RouterModule(this.parent.get(import2.ɵa,(null as any)),this.parent.get(import2.Router,(null as any)));
    this._ImprovPlusRoutingModule_1 = new import1.ImprovPlusRoutingModule();
      this._ROUTES_2 = [[
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
              component: import17.UnauthorizedComponent
            }
            ,
            {
              path: '',
              canActivateChild: [import18.AuthGuard],
              children: [
                {
                  path: 'dashboard',
                  component: import19.DashboardComponent,
                  data: {action: 'dashboard_page_view'}
                }
                ,
                {
                  path: 'materials',
                  component: import20.MaterialsLibraryComponent,
                  data: {action: 'material_page_view'}
                }
                ,
                {
                  path: 'materials/:packageSlug',
                  component: import20.MaterialsLibraryComponent,
                  data: {action: 'material_page_view'}
                }
                ,
                {
                  path: 'games',
                  component: import21.GameDatabaseComponent,
                  data: {action: 'game_view'}
                }
                ,
                {
                  path: 'game/:id',
                  component: import22.GameDetailsComponent,
                  data: {action: 'game_view'}
                }
                ,
                {
                  path: 'user',
                  component: import23.UserComponent,
                  data: {action: 'account_edit'}
                }
                ,
                {
                  path: 'admin',
                  component: import24.AdminComponent,
                  data: {admin: true}
                }
                ,
                {
                  path: 'teams',
                  component: import25.TeamListComponent,
                  data: {action: 'team_page_view'}
                }
                ,
                {
                  path: 'team/:id',
                  component: import26.TeamDetailsComponent,
                  data: {action: 'team_page_view'}
                }
                ,
                {
                  path: 'contact/:type',
                  component: import27.ContactComponent,
                  data: {action: 'contact_page_view'}
                }
                ,
                {
                  path: 'contact',
                  component: import27.ContactComponent,
                  data: {action: 'contact_page_view'}
                }

              ]

            }
            ,
            {
              path: 'about',
              component: import28.AboutComponent
            }
            ,
            {
              path: 'help',
              component: import29.HelpComponent
            }
            ,
            {
              path: 'legal',
              component: import30.LegalComponent
            }
            ,
            {
              path: '**',
              component: import31.NotFoundComponent
            }

          ]

        }
        ,
        {
          path: '**',
          component: import31.NotFoundComponent
        }

      ]
    ];
    return this._ImprovPlusRoutingModule_1;
  }
  getInternal(token:any,notFoundResult:any):any {
    if ((token === import2.RouterModule)) { return this._RouterModule_0; }
    if ((token === import1.ImprovPlusRoutingModule)) { return this._ImprovPlusRoutingModule_1; }
    if ((token === import2.ROUTES)) { return this._ROUTES_2; }
    return notFoundResult;
  }
  destroyInternal():void {
  }
}
export const ImprovPlusRoutingModuleNgFactory:import0.NgModuleFactory<import1.ImprovPlusRoutingModule> = new import0.NgModuleFactory<any>(ImprovPlusRoutingModuleInjector,import1.ImprovPlusRoutingModule);
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiRTovbGliL0dpdC9pbXByb3ZwbHVzL2FwcC9zcmMvYXBwL21vZHVsZS9pbXByb3ZwbHVzLXJvdXRpbmcubW9kdWxlLm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0U6L2xpYi9HaXQvaW1wcm92cGx1cy9hcHAvc3JjL2FwcC9tb2R1bGUvaW1wcm92cGx1cy1yb3V0aW5nLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIgIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=