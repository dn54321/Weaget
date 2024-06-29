import { ZodError } from "zod";

export function extractQueryParams(url: string) {
    const { searchParams } = new URL(url);
    return Object.fromEntries(searchParams);
}

export function handleNextResponseError(err: Error, message: string) {
    console.error(err);
    if (err instanceof ZodError) {
        const errorId = crypto.randomUUID();
        const errorMessage = "Failed to meet API requirements.";
        return Response.json({
            id: errorId,
            message: errorMessage,
            errors: err.issues,
        }, { status: 400 });
    }

    const errorId = crypto.randomUUID();
    const errorMessage = message;
    return Response.json({
        id: errorId,
        message: errorMessage,
    }, { status: 500 });
}

export function createNextResponseError(message: string, statusCode: number) {
    const errorId = crypto.randomUUID();
    return Response.json({
        id: errorId,
        message: message,
    }, { status: statusCode });
}
