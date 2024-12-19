declare global {
    interface Window {
        VITE_API_URL: string;
        VITE_CREATE_PHOTO_HANDLER_URL: string;
        VITE_PRINT_PHOTO_HANDLER_URL: string;
        VITE_INACTIVITY_TIMEOUT: number;
        VITE_DEVICE_ID: string;
    }
}

export {};
