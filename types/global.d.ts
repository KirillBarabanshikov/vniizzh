declare global {
    interface Window {
        API_URL: string;
        CREATE_PHOTO_HANDLER_URL: string;
        PRINT_PHOTO_HANDLER_URL: string;
        DEVICE_ID: string;
        INACTIVITY_TIMEOUT: number;
        TIMER: number;
        MAX_COUNT_PHOTO: number;
    }
}

export {};
