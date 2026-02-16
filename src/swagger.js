export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Review REST API",
    version: "1.0.0",
    description: "API documentation for the Review",
  },
  servers: [
    {
      url: "/",
      description: "Current Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
        },
      },
      Review: {
        type: "object",
        required: ["rating", "comment", "userId"],
        properties: {
          id: { type: "string", format: "uuid" },
          rating: { type: "integer", minimum: 1, maximum: 5 },
          comment: { type: "string" },
          userId: { type: "string", format: "uuid" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
  paths: {
    "/auth/register": {
      post: {
        tags: ["Authentication"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "User registered successfully" },
          400: { description: "User already exists" },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Login successful" },
          401: { description: "Invalid credentials" },
        },
      },
    },
    "/auth/logout": {
      post: {
        tags: ["Authentication"],
        summary: "Logout user and clear cookies",
        responses: {
          200: { description: "Logged out successfully" },
        },
      },
    },
    "/review": {
      get: {
        tags: ["Reviews"],
        summary: "Get all reviews",
        description:
          "Returns a list of all reviews with associated user information.",
        responses: {
          200: {
            description: "A list of reviews",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    results: { type: "integer" },
                    data: {
                      type: "object",
                      properties: {
                        reviews: {
                          type: "array",
                          items: { $ref: "#/components/schemas/Review" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Reviews"],
        summary: "Add a new review",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["rating", "comment", "userId"],
                properties: {
                  rating: { type: "integer" },
                  comment: { type: "string" },
                  userId: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Review created successfully" },
          500: { description: "Server error" },
        },
      },
    },
  },
};
