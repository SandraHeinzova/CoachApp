import Swal from 'sweetalert2';
import '../css/styles_alert.css';


// Základní konfigurace, která sjednocuje vzhled podle tvého CSS
const baseConfig = {
    background: '#001a33',
    color: '#ffffff',
    iconColor: '#FFD700',
    buttonsStyling: false,
    customClass: {
        popup: 'swal-custom-popup',
        confirmButton: 'swal-custom-button',
        cancelButton: 'swal-custom-secondary-button',
        title: 'swal-custom-title'
    }
};

export const showAlert = {
    // Úspěch (např. přihlášení, uložení)
    success: (title, text = '') => {
        return Swal.fire({
            ...baseConfig,
            title,
            text,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        });
    },

    // Chyba (např. špatné heslo)
    error: (title, text = '') => {
        return Swal.fire({
            ...baseConfig,
            title,
            text,
            icon: 'error',
            confirmButtonText: 'Zkusit znovu'
        });
    },

    // Potvrzení (např. deaktivace člena)
    confirm: (title, text = '') => {
        return Swal.fire({
            ...baseConfig,
            title,
            text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Potvrdit',
            cancelButtonText: 'Zrušit',
        });
    },

    // Tvoje WIP hláška
    wip: (title, text = '') => {
        return Swal.fire({
            ...baseConfig,
            title,
            text,
            icon: 'info',
            confirmButtonText: 'Jasně!'
        });
    }
};