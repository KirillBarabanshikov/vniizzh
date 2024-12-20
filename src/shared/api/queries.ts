import axios from 'axios';

import { CREATE_PHOTO_HANDLER_URL, PRINT_PHOTO_HANDLER_URL } from '@/shared/consts';

import { instance } from './instance';

export async function createPhotoHandler() {
    try {
        const response = await axios.get<string>(CREATE_PHOTO_HANDLER_URL);
        return response.data.split(`\\`).at(-1);
    } catch (error) {
        throw new Error(`Failed to create photo: ${error}`);
    }
}

export async function printPhotoHandler(path: string) {
    try {
        await axios.get(PRINT_PHOTO_HANDLER_URL, { params: { path } });
    } catch (error) {
        throw new Error(`Failed to print photo: ${error}`);
    }
}

export async function fetchPhoto(photoName: string) {
    try {
        const response = await instance.post<{ original_image: string }>(
            '/generation/photo',
            { name: photoName },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );
        return { originalImage: response.data.original_image };
    } catch (error) {
        throw new Error(`Failed to fetch photo: ${error}`);
    }
}

export async function generateFrame(body: { origin: boolean }) {
    try {
        const response = await instance.post<{ generated_image: string }>('/generation/decorate', body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return { generatedImage: response.data.generated_image };
    } catch (error) {
        throw new Error(`Failed to generate frame: ${error}`);
    }
}

export async function generatePhoto() {
    try {
        await instance.post(
            '/generation/file',
            {},
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );

        return new Promise<{ generatedImage: string }>((resolve, reject) => {
            const interval = setInterval(async () => {
                try {
                    const response = await instance.get<{
                        generated_image: string;
                        status: 'generate' | 'ready' | 'error';
                    }>('/generation/file');

                    if (response.data.status === 'ready') {
                        clearInterval(interval);
                        resolve({ generatedImage: response.data.generated_image });
                    } else if (response.data.status === 'error') {
                        clearInterval(interval);
                        reject(new Error('Image generation failed'));
                    }
                } catch (error) {
                    clearInterval(interval);
                    reject(new Error(`Failed to poll status: ${error}`));
                }
            }, 1000);
        });
    } catch (error) {
        throw new Error(`Failed to generate photo: ${error}`);
    }
}

export async function sendEmail(body: { address: string; origin: boolean; decorative: boolean }) {
    try {
        await instance.post('/email/send', body);
    } catch (error) {
        throw new Error(`Failed to send email: ${error}`);
    }
}
