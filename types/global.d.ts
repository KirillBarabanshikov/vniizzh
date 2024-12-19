declare global {
    interface Window {
        API_URL: string;
        CREATE_PHOTO_HANDLER_URL: string;
        PRINT_PHOTO_HANDLER_URL: string;
        INACTIVITY_TIMEOUT: number;
        DEVICE_ID: string;
        TIMER: number;
    }
}

export {};
