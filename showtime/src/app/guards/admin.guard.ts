import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem("role") != "customer"){
    return true;
  }else{
    return false;
  }

  
};
