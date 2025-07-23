import Swal, { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

/**
 * Custom hook for using SweetAlert2 alerts and toasts in a generic way
 * @returns Object with functions for different types of alerts and toasts
 */
export const useAlerts = () => {
  // Base function for full alerts
  const showAlert = async (
    title: string,
    text: string = '',
    icon: SweetAlertIcon = 'info',
    options: SweetAlertOptions = {}
  ): Promise<SweetAlertResult<any>> => {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'OK',
      ...options,
    });
  };

  // Base function for toast notifications
  const showToast = (
    title: string,
    icon: SweetAlertIcon = 'info',
    options: SweetAlertOptions = {}
  ): void => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
      ...options,
    });

    Toast.fire({
      icon,
      title,
    });
  };

  // Full alert variants
  const successAlert = (title: string, text?: string, options?: SweetAlertOptions) =>
    showAlert(title, text, 'success', options);

  const errorAlert = (title: string, text?: string, options?: SweetAlertOptions) =>
    showAlert(title, text, 'error', options);

  const warningAlert = (title: string, text?: string, options?: SweetAlertOptions) =>
    showAlert(title, text, 'warning', options);

  const infoAlert = (title: string, text?: string, options?: SweetAlertOptions) =>
    showAlert(title, text, 'info', options);

  const questionAlert = (title: string, text?: string, options?: SweetAlertOptions) =>
    showAlert(title, text, 'question', options);

  // Toast variants
  const successToast = (title: string, options?: SweetAlertOptions) =>
    showToast(title, 'success', options);

  const errorToast = (title: string, options?: SweetAlertOptions) =>
    showToast(title, 'error', options);

  const warningToast = (title: string, options?: SweetAlertOptions) =>
    showToast(title, 'warning', options);

  const infoToast = (title: string, options?: SweetAlertOptions) =>
    showToast(title, 'info', options);

  // Confirmation dialog
  const confirmDialog = async (
    title: string,
    text: string = '¿Estás seguro?',
    options: SweetAlertOptions = {}
  ): Promise<boolean> => {
    const result = await Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      ...options,
    });

    return result.isConfirmed;
  };

  // Loading dialog
  const loadingAlert = (title: string = 'Cargando...') => {
    Swal.fire({
      title,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  // Close any open alert
  const closeAlert = () => {
    Swal.close();
  };

  return {
    // Base functions
    showAlert,
    showToast,

    // Full alert variants
    successAlert,
    errorAlert,
    warningAlert,
    infoAlert,
    questionAlert,

    // Toast variants
    successToast,
    errorToast,
    warningToast,
    infoToast,

    // Special alerts
    confirmDialog,
    loadingAlert,
    closeAlert,
  };
};

export default useAlerts;
