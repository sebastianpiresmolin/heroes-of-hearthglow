import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
    const spec = createSwaggerSpec({
        apiFolder: 'app/api',
        definition: {
            openapi: '3.1.0',
            info: {
                title: 'Heroes of HearthGlow API',
                version: '1.0.0',
                description: 'API for Heroes of HearthGlow'
            },
            components: {
                securitySchemes: {
                    BearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    },
                },
            },
            security: [],
        },
    })
    return spec;
}