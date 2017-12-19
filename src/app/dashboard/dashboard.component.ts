import { Component, AnimationTransitionEvent, ViewEncapsulation, Output, EventEmitter, NgZone, OnInit } from '@angular/core';
import { SidebarModule } from 'ng-sidebar';
import { MaterializeAction } from 'angular2-materialize';
import { ERSController } from '../../providers/ers-controller/ers-controller';
import { MatSnackBar } from '@angular/material';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {

  @Output() logoutEvent: EventEmitter<any> = new EventEmitter<any>();

  amount : number = 0.00;
  description : string;
  currentUserRoleId : number;
  modalActions = new EventEmitter<string|MaterializeAction>();
  pendingPage : any = true;
  processedPage : any = false;
  newRequestPage : any = false;

  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "email";
  public sortOrder = "asc";
  
  public logo = '../../assets/logos/ers-logo.svg';

  private _opened: boolean = false;
  private _modeNum: number = 2;
  private _positionNum: number = 0;
  private _dock: boolean = false;
  private _closeOnClickOutside: boolean = true;
  private _closeOnClickBackdrop: boolean = false;
  private _showBackdrop: boolean = false;
  private _animate: boolean = true;
  private _trapFocus: boolean = true;
  private _autoFocus: boolean = true;
  private _keyClose: boolean = false;
  private _autoCollapseHeight: number = null;
  private _autoCollapseWidth: number = null;
  private _MODES: Array<string> = ['over', 'push', 'slide'];
  private _POSITIONS: Array<string> = ['left', 'right', 'top', 'bottom'];
  
  constructor(public ersApp:ERSController, public ngZone:NgZone, private router: Router) { 
    if(this.ersApp.currentUser == null || this.ersApp.currentUser == undefined){
      this.router.navigate(["login"]);
    }
  }

  ngOnInit() { 
    (this.ersApp.currentUser == null || this.ersApp.currentUser == undefined) ?
      this.router.navigate(["login"]) : this.currentUserRoleId = this.ersApp.currentUser.userRoleId; 
  }

  public switchPage(e : any){
    let target = e.target || e.srcElement || e.currentTarget;
    let id = target.attributes.id.nodeValue;
    this.ngZone.run(() => {
      if(id == "pending_requests"){
        this.pendingPage = true;
        this.processedPage = false;
        this.newRequestPage = false;
      }else if(id == "processed_requests"){
        this.pendingPage = false;
        this.processedPage = true;
        this.newRequestPage = false;   
      }else if(id == "new_request"){
        this.pendingPage = false;
        this.processedPage = false;
        this.newRequestPage = true;        
      }
    });
  }

  public submittedRequest(e : any){
    this.ngZone.run(() => {
        this.pendingPage = true;
        this.processedPage = false;
        this.newRequestPage = false;
    });
  }

  logout(){
    new Promise((resolve, reject) => {
        this.ersApp.users = null;
        this.ersApp.currentUser = null;
        this.ersApp.reimbursementRequests = null;
        this.ersApp.reimbursementStatus = null;
        this.ersApp.reimbursementTypes = null;
        if(this.ersApp.currentUser == null) resolve();   
      }).then(()=>{ this.router.navigate(["login"]); }, 
              ()=>{ });
  }

  updateAmount(a : any){
    this.amount = a;
  }

  updateDescription(d : any){
    this.description = d;
  }

  openModal(p?:any) {
    this.modalActions.emit({action:"modal",params:['open']});
  }

  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
  
  private _toggleOpened(): void {
    this._opened = !this._opened;
  }

  private _toggleMode(): void {
    this._modeNum++;

    if (this._modeNum === this._MODES.length) {
      this._modeNum = 0;
    }
  }

  private _toggleAutoCollapseHeight(): void {
    this._autoCollapseHeight = this._autoCollapseHeight ? null : 500;
  }

  private _toggleAutoCollapseWidth(): void {
    this._autoCollapseWidth = this._autoCollapseWidth ? null : 500;
  }

  private _togglePosition(): void {
    this._positionNum++;

    if (this._positionNum === this._POSITIONS.length) {
      this._positionNum = 0;
    }
  }

  private _toggleDock(): void {
    this._dock = !this._dock;
  }

  private _toggleCloseOnClickOutside(): void {
    this._closeOnClickOutside = !this._closeOnClickOutside;
  }

  private _toggleCloseOnClickBackdrop(): void {
    this._closeOnClickBackdrop = !this._closeOnClickBackdrop;
  }

  private _toggleShowBackdrop(): void {
    this._showBackdrop = !this._showBackdrop;
  }

  private _toggleAnimate(): void {
    this._animate = !this._animate;
  }

  private _toggleTrapFocus(): void {
    this._trapFocus = !this._trapFocus;
  }

  private _toggleAutoFocus(): void {
    this._autoFocus = !this._autoFocus;
  }

  private _toggleKeyClose(): void {
    this._keyClose = !this._keyClose;
  }

  private _onOpenStart(): void {
    console.info('Sidebar opening');
  }

  private _onOpened(): void {
    console.info('Sidebar opened');
  }

  private _onCloseStart(): void {
    console.info('Sidebar closing');
  }

  private _onClosed(): void {
    console.info('Sidebar closed');
  }

  
  public toInt(num: string) {
      return +num;
  }

  public sortByWordLength = (a: any) => {
      return a.city.length;
  }
}
