/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as import0 from '@angular/core';
import * as import1 from '@angular/common';
import * as import2 from '../view/toolbar.view.ngfactory';
import * as import3 from '../../../../../src/app/view/toolbar.view';
import * as import4 from '../../../../../src/component/app.component';
import * as import5 from '@angular/router';
import * as import6 from '../../../../../src/service/user.service';
import * as import7 from '../../../../../src/app/component/team-list.component';
import * as import8 from '../../../../../src/app/service/team.service';
const styles_TeamListComponent:any[] = ([] as any[]);
export const RenderType_TeamListComponent:import0.RendererType2 = import0.ɵcrt({
  encapsulation: 2,
  styles: styles_TeamListComponent,
  data: {}
}
);
function View_TeamListComponent_2(l:any):import0.ɵViewDefinition {
  return import0.ɵvid(0,[
      (l()(),import0.ɵeld(0,(null as any),(null as any),7,'div',[[
        'class',
        'columns fill data-row'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n                        '])),
    (l()(),import0.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['Materials Owned'])),
    (l()(),import0.ɵted((null as any),['\n                        '])),
    (l()(),import0.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),[
      '',
      ''
    ]
    )),
    (l()(),import0.ɵted((null as any),['\n                    ']))
  ]
  ,(null as any),(ck,v) => {
    const currVal_0:any = (<any>v.parent).context.$implicit.materials.length;
    ck(v,6,0,currVal_0);
  });
}
function View_TeamListComponent_1(l:any):import0.ɵViewDefinition {
  return import0.ɵvid(0,[
      (l()(),import0.ɵeld(0,(null as any),(null as any),39,'div',[[
        'class',
        'card clickable'
      ]
      ],(null as any),[[
        (null as any),
        'click'
      ]
    ],(v,en,$event) => {
      var ad:boolean = true;
      var co:any = v.component;
      if (('click' === en)) {
        const pd_0:any = ((<any>co.selectTeam(v.context.$implicit)) !== false);
        ad = (pd_0 && ad);
      }
      return ad;
    },(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n\n                '])),
      (l()(),import0.ɵeld(0,(null as any),(null as any),12,'div',[[
        'class',
        'top'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n                    '])),
    (l()(),import0.ɵeld(0,(null as any),(null as any),0,'i',[
      [
        'class',
        'fa fa-unlock'
      ]
      ,
      [
        'title',
        'You are an admin of this team.'
      ]

    ]
    ,(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n                    '])),
      (l()(),import0.ɵeld(0,(null as any),(null as any),7,'div',[[
        'class',
        'content'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n                        '])),
    (l()(),import0.ɵeld(0,(null as any),(null as any),1,'h3',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),[
      '',
      ''
    ]
    )),
    (l()(),import0.ɵted((null as any),['\n                        '])),
    (l()(),import0.ɵeld(0,(null as any),(null as any),1,'h4',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),[
      'Registered ',
      ''
    ]
    )),
    (l()(),import0.ɵted((null as any),['\n                    '])),
    (l()(),import0.ɵted((null as any),['\n                '])),
    (l()(),import0.ɵted((null as any),['\n                '])),
      (l()(),import0.ɵeld(0,(null as any),(null as any),22,'div',[[
        'class',
        'body'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n                    '])),
      (l()(),import0.ɵeld(0,(null as any),(null as any),7,'div',[[
        'class',
        'columns fill data-row'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n                        '])),
    (l()(),import0.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['Members'])),
    (l()(),import0.ɵted((null as any),['\n                        '])),
    (l()(),import0.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),[
      '',
      ''
    ]
    )),
    (l()(),import0.ɵted((null as any),['\n                    '])),
    (l()(),import0.ɵted((null as any),['\n                    '])),
      (l()(),import0.ɵeld(0,(null as any),(null as any),7,'div',[[
        'class',
        'columns fill data-row'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n                        '])),
    (l()(),import0.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['Available Subscriptions'])),
    (l()(),import0.ɵted((null as any),['\n                        '])),
    (l()(),import0.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),[
      '',
      ''
    ]
    )),
    (l()(),import0.ɵted((null as any),['\n                    '])),
    (l()(),import0.ɵted((null as any),['\n                    '])),
    (l()(),import0.ɵand(8388608,(null as any),(null as any),1,(null as any),View_TeamListComponent_2)),
    import0.ɵdid(8192,(null as any),0,import1.NgIf,[
      import0.ViewContainerRef,
      import0.TemplateRef
    ]
      ,{ngIf: [
        0,
        'ngIf'
      ]
    },(null as any)),
    (l()(),import0.ɵted((null as any),['\n                '])),
    (l()(),import0.ɵted((null as any),['\n            ']))
  ]
  ,(ck,v) => {
    const currVal_4:any = (v.context.$implicit.materials && v.context.$implicit.materials.length);
    ck(v,37,0,currVal_4);
  },(ck,v) => {
    var co:any = v.component;
    const currVal_0:any = v.context.$implicit.name;
    ck(v,9,0,currVal_0);
    const currVal_1:any = co.getDate(v.context.$implicit.dateAdded);
    ck(v,12,0,currVal_1);
    const currVal_2:any = (v.context.$implicit.admins.length + v.context.$implicit.members.length);
    ck(v,24,0,currVal_2);
    const currVal_3:any = (v.context.$implicit.subscription.subscriptions - v.context.$implicit.subscription.children.length);
    ck(v,33,0,currVal_3);
  });
}
function View_TeamListComponent_4(l:any):import0.ɵViewDefinition {
  return import0.ɵvid(0,[
      (l()(),import0.ɵeld(0,(null as any),(null as any),7,'div',[[
        'class',
        'columns fill data-row'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n                        '])),
    (l()(),import0.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['Materials Owned'])),
    (l()(),import0.ɵted((null as any),['\n                        '])),
    (l()(),import0.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),[
      '',
      ''
    ]
    )),
    (l()(),import0.ɵted((null as any),['\n                    ']))
  ]
  ,(null as any),(ck,v) => {
    const currVal_0:any = (<any>v.parent).context.$implicit.materials.length;
    ck(v,6,0,currVal_0);
  });
}
function View_TeamListComponent_3(l:any):import0.ɵViewDefinition {
  return import0.ɵvid(0,[
      (l()(),import0.ɵeld(0,(null as any),(null as any),36,'div',[[
        'class',
        'card clickable'
      ]
      ],(null as any),[[
        (null as any),
        'click'
      ]
    ],(v,en,$event) => {
      var ad:boolean = true;
      var co:any = v.component;
      if (('click' === en)) {
        const pd_0:any = ((<any>co.selectTeam(v.context.$implicit)) !== false);
        ad = (pd_0 && ad);
      }
      return ad;
    },(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n\n                '])),
      (l()(),import0.ɵeld(0,(null as any),(null as any),9,'div',[[
        'class',
        'top'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n                    '])),
    (l()(),import0.ɵeld(0,(null as any),(null as any),0,'i',[
      [
        'class',
        'fa fa-lock'
      ]
      ,
      [
        'title',
        'You are not an admin of this team.'
      ]

    ]
    ,(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n                    '])),
      (l()(),import0.ɵeld(0,(null as any),(null as any),4,'div',[[
        'class',
        'content'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n                        '])),
    (l()(),import0.ɵeld(0,(null as any),(null as any),1,'h3',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),[
      '',
      ''
    ]
    )),
    (l()(),import0.ɵted((null as any),['\n                    '])),
    (l()(),import0.ɵted((null as any),['\n                '])),
    (l()(),import0.ɵted((null as any),['\n                '])),
      (l()(),import0.ɵeld(0,(null as any),(null as any),22,'div',[[
        'class',
        'body'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n                    '])),
      (l()(),import0.ɵeld(0,(null as any),(null as any),7,'div',[[
        'class',
        'columns fill data-row'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n                        '])),
    (l()(),import0.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['Created'])),
    (l()(),import0.ɵted((null as any),['\n                        '])),
    (l()(),import0.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),[
      '',
      ''
    ]
    )),
    (l()(),import0.ɵted((null as any),['\n                    '])),
    (l()(),import0.ɵted((null as any),['\n                    '])),
      (l()(),import0.ɵeld(0,(null as any),(null as any),7,'div',[[
        'class',
        'columns fill data-row'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n                        '])),
    (l()(),import0.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['Members'])),
    (l()(),import0.ɵted((null as any),['\n                        '])),
    (l()(),import0.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),[
      '',
      ''
    ]
    )),
    (l()(),import0.ɵted((null as any),['\n                    '])),
    (l()(),import0.ɵted((null as any),['\n                    '])),
    (l()(),import0.ɵand(8388608,(null as any),(null as any),1,(null as any),View_TeamListComponent_4)),
    import0.ɵdid(8192,(null as any),0,import1.NgIf,[
      import0.ViewContainerRef,
      import0.TemplateRef
    ]
      ,{ngIf: [
        0,
        'ngIf'
      ]
    },(null as any)),
    (l()(),import0.ɵted((null as any),['\n                '])),
    (l()(),import0.ɵted((null as any),['\n            ']))
  ]
  ,(ck,v) => {
    const currVal_3:any = (v.context.$implicit.materials && v.context.$implicit.materials.length);
    ck(v,34,0,currVal_3);
  },(ck,v) => {
    var co:any = v.component;
    const currVal_0:any = v.context.$implicit.name;
    ck(v,9,0,currVal_0);
    const currVal_1:any = co.getDate(v.context.$implicit.dateAdded);
    ck(v,21,0,currVal_1);
    const currVal_2:any = ((v.context.$implicit.admins.length || 0) + (v.context.$implicit.members.length + 0));
    ck(v,30,0,currVal_2);
  });
}
export function View_TeamListComponent_0(l:any):import0.ɵViewDefinition {
  return import0.ɵvid(0,[
      (l()(),import0.ɵeld(0,(null as any),(null as any),1,'div',[[
        'class',
        'toolbar'
      ]
      ],[[
        2,
        'on',
        (null as any)
      ]
    ],(null as any),(null as any),import2.View_ToolbarView_0,import2.RenderType_ToolbarView)),
    import0.ɵdid(57344,(null as any),0,import3.ToolbarView,[
      import4.AppComponent,
      import5.Router,
      import6.UserService
    ]
    ,{
      title: [
        0,
        'title'
      ]
      ,
      tools: [
        1,
        'tools'
      ]

    }
    ,(null as any)),
    (l()(),import0.ɵted((null as any),['\n\n'])),
      (l()(),import0.ɵeld(0,(null as any),(null as any),23,'div',[[
        'class',
        'page'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n\n    '])),
      (l()(),import0.ɵeld(0,(null as any),(null as any),20,'div',[[
        'class',
        'paper has-brackets'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n\n        '])),
      (l()(),import0.ɵeld(0,(null as any),(null as any),7,'div',[[
        'class',
        'content card-list'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n\n            '])),
    (l()(),import0.ɵand(8388608,(null as any),(null as any),1,(null as any),View_TeamListComponent_1)),
    import0.ɵdid(401408,(null as any),0,import1.NgForOf,[
      import0.ViewContainerRef,
      import0.TemplateRef,
      import0.IterableDiffers
    ]
      ,{ngForOf: [
        0,
        'ngForOf'
      ]
    },(null as any)),
    (l()(),import0.ɵted((null as any),['\n\n            '])),
    (l()(),import0.ɵand(8388608,(null as any),(null as any),1,(null as any),View_TeamListComponent_3)),
    import0.ɵdid(401408,(null as any),0,import1.NgForOf,[
      import0.ViewContainerRef,
      import0.TemplateRef,
      import0.IterableDiffers
    ]
      ,{ngForOf: [
        0,
        'ngForOf'
      ]
    },(null as any)),
    (l()(),import0.ɵted((null as any),['\n\n        '])),
    (l()(),import0.ɵted((null as any),['\n\n        '])),
      (l()(),import0.ɵeld(0,(null as any),(null as any),5,'div',[[
        'class',
        'left-bracket'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵeld(0,(null as any),(null as any),4,'h1',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
      (l()(),import0.ɵeld(0,(null as any),(null as any),1,'span',[[
        'class',
        'light'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['improv'])),
    (l()(),import0.ɵeld(0,(null as any),(null as any),1,'strong',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['plus'])),
    (l()(),import0.ɵted((null as any),['\n        '])),
      (l()(),import0.ɵeld(0,(null as any),(null as any),1,'div',[[
        'class',
        'right-bracket'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵeld(0,(null as any),(null as any),0,'h1',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import0.ɵted((null as any),['\n    '])),
    (l()(),import0.ɵted((null as any),['\n\n']))
  ]
  ,(ck,v) => {
    var co:import7.TeamListComponent = v.component;
    const currVal_1:any = co.title;
    const currVal_2:any = co._tools;
    ck(v,1,0,currVal_1,currVal_2);
    const currVal_3:any = co.adminOfTeams;
    ck(v,10,0,currVal_3);
    const currVal_4:any = co.memberOfTeams;
    ck(v,13,0,currVal_4);
  },(ck,v) => {
    var co:import7.TeamListComponent = v.component;
    const currVal_0:any = co._app.toolbarVisible;
    ck(v,0,0,currVal_0);
  });
}
function View_TeamListComponent_Host_0(l:any):import0.ɵViewDefinition {
  return import0.ɵvid(0,[
    (l()(),import0.ɵeld(0,(null as any),(null as any),1,'team-list',([] as any[]),(null as any),(null as any),(null as any),View_TeamListComponent_0,RenderType_TeamListComponent)),
    import0.ɵdid(57344,(null as any),0,import7.TeamListComponent,[
      import4.AppComponent,
      import5.Router,
      import8.TeamService
    ]
    ,(null as any),(null as any))
  ]
  ,(ck,v) => {
    ck(v,1,0);
  },(null as any));
}
export const TeamListComponentNgFactory:import0.ComponentFactory<import7.TeamListComponent> = import0.ɵccf('team-list',import7.TeamListComponent,View_TeamListComponent_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiRTovbGliL0dpdC9pbXByb3ZwbHVzL2FwcC9zcmMvYXBwL2NvbXBvbmVudC90ZWFtLWxpc3QuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0U6L2xpYi9HaXQvaW1wcm92cGx1cy9hcHAvc3JjL2FwcC9jb21wb25lbnQvdGVhbS1saXN0LmNvbXBvbmVudC50cyIsIm5nOi8vL0U6L2xpYi9HaXQvaW1wcm92cGx1cy9hcHAvc3JjL2FwcC90ZW1wbGF0ZS90ZWFtLWxpc3QuY29tcG9uZW50Lmh0bWwiLCJuZzovLy9FOi9saWIvR2l0L2ltcHJvdnBsdXMvYXBwL3NyYy9hcHAvY29tcG9uZW50L3RlYW0tbGlzdC5jb21wb25lbnQudHMuVGVhbUxpc3RDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8ZGl2IGNsYXNzPVwidG9vbGJhclwiXHJcbiAgICBbY2xhc3Mub25dPVwiX2FwcC50b29sYmFyVmlzaWJsZVwiXHJcbiAgICBbdG9vbHNdPVwiX3Rvb2xzXCJcclxuICAgIFt0aXRsZV09XCJ0aXRsZVwiXHJcbiAgICA+PC9kaXY+XHJcblxyXG48ZGl2IGNsYXNzPVwicGFnZVwiPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJwYXBlciBoYXMtYnJhY2tldHNcIj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnQgY2FyZC1saXN0XCI+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZCBjbGlja2FibGVcIlxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFRlYW0odGVhbSlcIlxyXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHRlYW0gb2YgYWRtaW5PZlRlYW1zXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdW5sb2NrXCIgdGl0bGU9XCJZb3UgYXJlIGFuIGFkbWluIG9mIHRoaXMgdGVhbS5cIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPnt7dGVhbS5uYW1lfX08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQ+UmVnaXN0ZXJlZCB7e2dldERhdGUodGVhbS5kYXRlQWRkZWQpfX08L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zIGZpbGwgZGF0YS1yb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+TWVtYmVyczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3t0ZWFtLmFkbWlucy5sZW5ndGggKyB0ZWFtLm1lbWJlcnMubGVuZ3RofX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgZmlsbCBkYXRhLXJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5BdmFpbGFibGUgU3Vic2NyaXB0aW9uczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3t0ZWFtLnN1YnNjcmlwdGlvbi5zdWJzY3JpcHRpb25zIC0gdGVhbS5zdWJzY3JpcHRpb24uY2hpbGRyZW4ubGVuZ3RofX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgZmlsbCBkYXRhLXJvd1wiICpuZ0lmPVwidGVhbS5tYXRlcmlhbHMgJiYgdGVhbS5tYXRlcmlhbHMubGVuZ3RoXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPk1hdGVyaWFscyBPd25lZDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3t0ZWFtLm1hdGVyaWFscy5sZW5ndGh9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkIGNsaWNrYWJsZVwiXHJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0VGVhbSh0ZWFtKVwiXHJcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgdGVhbSBvZiBtZW1iZXJPZlRlYW1zXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtbG9ja1wiIHRpdGxlPVwiWW91IGFyZSBub3QgYW4gYWRtaW4gb2YgdGhpcyB0ZWFtLlwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDM+e3t0ZWFtLm5hbWV9fTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgZmlsbCBkYXRhLXJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5DcmVhdGVkPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e2dldERhdGUodGVhbS5kYXRlQWRkZWQpfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgZmlsbCBkYXRhLXJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5NZW1iZXJzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyh0ZWFtLmFkbWlucy5sZW5ndGggfHwgMCkgKyAodGVhbS5tZW1iZXJzLmxlbmd0aCArIDApfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgZmlsbCBkYXRhLXJvd1wiICpuZ0lmPVwidGVhbS5tYXRlcmlhbHMgJiYgdGVhbS5tYXRlcmlhbHMubGVuZ3RoXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPk1hdGVyaWFscyBPd25lZDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3t0ZWFtLm1hdGVyaWFscy5sZW5ndGh9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0LWJyYWNrZXRcIj48aDE+PHNwYW4gY2xhc3M9XCJsaWdodFwiPmltcHJvdjwvc3Bhbj48c3Ryb25nPnBsdXM8L3N0cm9uZz48L2gxPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodC1icmFja2V0XCI+PGgxPjwvaDE+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbjwvZGl2PiIsIjx0ZWFtLWxpc3Q+PC90ZWFtLWxpc3Q+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUNnQ29CO1FBQUE7UUFBQTtNQUFBO0lBQUE7SUFBbUY7SUFDL0U7SUFBTTtJQUFzQjtJQUM1QjtJQUFNO01BQUE7TUFBQTtJQUFBO0lBQUE7SUFBZ0M7OztJQUFoQztJQUFBOzs7OztNQXRCbEI7UUFBQTtRQUFBO01BQUE7TUFBQTtRQUFBO1FBQUE7TUFBQTtJQUFBO01BQUE7TUFBQTtNQUNJO1FBQUE7UUFBQTtNQUFBO01BREo7SUFBQTtJQUVzQztNQUVsQztRQUFBO1FBQUE7TUFBQTtJQUFBO0lBQWlCO0lBQ2I7TUFBQTtRQUFBO1FBQUE7TUFBQTs7TUFBQTtRQUFBO1FBQUE7TUFBQTs7SUFBQTtLQUFBO0lBQW1FO01BQ25FO1FBQUE7UUFBQTtNQUFBO0lBQUE7SUFBcUI7SUFDakI7SUFBSTtNQUFBO01BQUE7SUFBQTtJQUFBO0lBQWtCO0lBQ3RCO0lBQUk7TUFBQTtNQUFBO0lBQUE7SUFBQTtJQUEyQztJQUM3QztJQUNKO01BQ047UUFBQTtRQUFBO01BQUE7SUFBQTtJQUFrQjtNQUNkO1FBQUE7UUFBQTtNQUFBO0lBQUE7SUFBbUM7SUFDL0I7SUFBTTtJQUFjO0lBQ3BCO0lBQU07TUFBQTtNQUFBO0lBQUE7SUFBQTtJQUFtRDtJQUN2RDtNQUNOO1FBQUE7UUFBQTtNQUFBO0lBQUE7SUFBbUM7SUFDL0I7SUFBTTtJQUE4QjtJQUNwQztJQUFNO01BQUE7TUFBQTtJQUFBO0lBQUE7SUFBOEU7SUFDbEY7SUFDTjtnQkFBQTs7O0lBQUE7T0FBQTtRQUFBO1FBQUE7TUFBQTtJQUFBO0lBR007SUFDSjs7O0lBSmlDO0lBQW5DLFVBQW1DLFNBQW5DOzs7SUFiUTtJQUFBO0lBQ0E7SUFBQTtJQU1FO0lBQUE7SUFJQTtJQUFBOzs7OztNQTRCVjtRQUFBO1FBQUE7TUFBQTtJQUFBO0lBQW1GO0lBQy9FO0lBQU07SUFBc0I7SUFDNUI7SUFBTTtNQUFBO01BQUE7SUFBQTtJQUFBO0lBQWdDOzs7SUFBaEM7SUFBQTs7Ozs7TUFyQmxCO1FBQUE7UUFBQTtNQUFBO01BQUE7UUFBQTtRQUFBO01BQUE7SUFBQTtNQUFBO01BQUE7TUFDSTtRQUFBO1FBQUE7TUFBQTtNQURKO0lBQUE7SUFFdUM7TUFFbkM7UUFBQTtRQUFBO01BQUE7SUFBQTtJQUFpQjtJQUNiO01BQUE7UUFBQTtRQUFBO01BQUE7O01BQUE7UUFBQTtRQUFBO01BQUE7O0lBQUE7S0FBQTtJQUFxRTtNQUNyRTtRQUFBO1FBQUE7TUFBQTtJQUFBO0lBQXFCO0lBQ2pCO0lBQUk7TUFBQTtNQUFBO0lBQUE7SUFBQTtJQUFrQjtJQUNwQjtJQUNKO01BQ047UUFBQTtRQUFBO01BQUE7SUFBQTtJQUFrQjtNQUNkO1FBQUE7UUFBQTtNQUFBO0lBQUE7SUFBbUM7SUFDL0I7SUFBTTtJQUFjO0lBQ3BCO0lBQU07TUFBQTtNQUFBO0lBQUE7SUFBQTtJQUFrQztJQUN0QztNQUNOO1FBQUE7UUFBQTtNQUFBO0lBQUE7SUFBbUM7SUFDL0I7SUFBTTtJQUFjO0lBQ3BCO0lBQU07TUFBQTtNQUFBO0lBQUE7SUFBQTtJQUFnRTtJQUNwRTtJQUNOO2dCQUFBOzs7SUFBQTtPQUFBO1FBQUE7UUFBQTtNQUFBO0lBQUE7SUFHTTtJQUNKOzs7SUFKaUM7SUFBbkMsVUFBbUMsU0FBbkM7OztJQVpRO0lBQUE7SUFNRTtJQUFBO0lBSUE7SUFBQTs7Ozs7TUF4RDlCO1FBQUE7UUFBQTtNQUFBO01BQUE7UUFBQTtRQUFBO1FBQUE7TUFBQTtJQUFBO2dCQUFBOzs7O0lBQUE7S0FBQTtNQUFBO1FBQUE7UUFBQTtNQUFBOztNQUFBO1FBQUE7UUFBQTtNQUFBOztJQUFBO0tBQUE7SUFJVztNQUVYO1FBQUE7UUFBQTtNQUFBO0lBQUE7SUFBa0I7TUFFZDtRQUFBO1FBQUE7TUFBQTtJQUFBO0lBQWdDO01BRTVCO1FBQUE7UUFBQTtNQUFBO0lBQUE7SUFBK0I7SUFFM0I7Z0JBQUE7Ozs7SUFBQTtPQUFBO1FBQUE7UUFBQTtNQUFBO0lBQUE7SUF5Qk07SUFFTjtnQkFBQTs7OztJQUFBO09BQUE7UUFBQTtRQUFBO01BQUE7SUFBQTtJQXdCTTtJQUVKO01BRU47UUFBQTtRQUFBO01BQUE7SUFBQTtJQUEwQjtNQUFJO1FBQUE7UUFBQTtNQUFBO0lBQUE7SUFBb0I7SUFBYTtJQUFRO0lBQXdCO01BQy9GO1FBQUE7UUFBQTtNQUFBO0lBQUE7SUFBMkI7SUFBZTtJQUN4Qzs7OztJQWxFTjtJQURBO0lBRkosU0FHSSxVQURBLFNBRko7SUFjZ0I7SUFGSixVQUVJLFNBRko7SUE2Qkk7SUFGSixVQUVJLFNBRko7OztJQXRDUjtJQURKLFNBQ0ksU0FESjs7Ozs7SUNBQTtnQkFBQTs7OztJQUFBO0tBQUE7OztJQUFBOzs7In0=