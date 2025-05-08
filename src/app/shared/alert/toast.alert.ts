import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';

export class ToastAlert {
  static successSave(message = 'Saved successfully') {
    this.showToast('success', message);
  }

  static successDelete(message = 'Deleted successfully') {
    this.showToast('success', message);
  }

  static successUpdate(message = 'Updated successfully') {
    this.showToast('success', message);
  }

  static failedSave(message = 'Saving failed') {
    this.showToast('error', message);
  }

  static errorMessage(message: any) {
    const errorMessages = message.message;
    errorMessages.forEach((errorMessage: string) => {
      this.showToast('error', errorMessage);
    });
  }

  static failedUpdate(message = 'Update failed') {
    this.showToast('error', message);
  }

  static failedDelete(message = 'Deleting failed') {
    this.showToast('error', message);
  }

  static success(message = 'Success') {
    this.showToast('success', message);
  }

  static error(message = 'Something went wrong!', position: SweetAlertPosition = 'top-end') {
    this.showToast('error', message, position);
  }

  static info(message: string) {
    this.showToast('info', message);
  }

  static warning(message: string) {
    this.showToast('warning', message);
  }

  private static showToast(type: SweetAlertIcon, message: string, position: SweetAlertPosition = 'top-end') {
    const Toast = Swal.mixin({
      toast: true,
      position: position,
      timer: 1000,
      showConfirmButton: false,
      timerProgressBar: false,
    });

    Toast.fire({
      icon: type,
      title: message,
    });
  }
}
