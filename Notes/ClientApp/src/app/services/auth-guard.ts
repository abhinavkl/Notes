import { Injectable } from "@angular/core";
import { CanActivate, CanActivateChild, CanDeactivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from './auth.service';
import { RouteData } from "../components/auth/route-data.model";
import { commonCount } from "src/app/shared/functions";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate, CanActivateChild{

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;

    let routeData=next.data as RouteData
    let isAuthenticated=(/true/i).test(sessionStorage.getItem('isAuthenticated')??'')
    let userClaims = JSON.parse(sessionStorage.getItem('claims')??'[]') as string[]
    let userRoles= JSON.parse(sessionStorage.getItem('roles')??'[]') as string[]

    //if user has to be not authenticated 
    if(!routeData.authenticated && routeData.authenticated===isAuthenticated){
      return true;
    }

    let hasIncludeClaims=commonCount(routeData.includeClaims,userClaims)
    if(hasIncludeClaims){
      return true;
    }

    let hasIncludeRoles=commonCount(routeData.includeRoles,userRoles)
    if(hasIncludeRoles){
      return true;
    }

    let hasExcludeClaims=commonCount(routeData.excludeClaims,userClaims)
    if(hasExcludeClaims){
      this.router.navigate(['access-denied'])
      return false;
    }

    let hasExcludeRoles=commonCount(routeData.excludeRoles,userRoles)
    if(hasExcludeRoles){
      this.router.navigate(['access-denied'])
      return false;
    }

    this.router.navigate(['access-denied'])
    return false;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }
}

