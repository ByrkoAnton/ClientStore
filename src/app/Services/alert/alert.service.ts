import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showSuccesMessage(_title: string, _text: string)
  {
    Swal.fire({
      icon: 'success',
      confirmButtonColor:"#378f7b",
      title:_title,
      text: _text 
    });
  }

  showErrorMessage(_title: string)
  {
  Swal.fire({
    icon: 'error',
    title: _title,
    confirmButtonColor: '#378f7b'
  });
  }


}
