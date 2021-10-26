import { Injectable } from '@angular/core';
import { SweetAlertConstants, TechnicalConstants } from 'src/app/app-constants';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showSuccesMessage(_title: string, _text: string = TechnicalConstants.EmptyString)
  {
    Swal.fire({
      icon: SweetAlertConstants.IconSuccess,
      confirmButtonColor:SweetAlertConstants.ConfirmButtonColorGreen,
      title:_title,
      text: _text 
    });
  }

  showErrorMessage(_title: string)
  {
  Swal.fire({
    icon: SweetAlertConstants.IconError,
    title: _title,
    confirmButtonColor: SweetAlertConstants.ConfirmButtonColorGreen
  });
  }


}
