// Allowed origins
const allowedOrigins = ["http://localhost:3000", "http://localhost:3007"];

// CORS configuration
export const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD",
  credentials: true,
};
