import app from "./express.server";
const PORT = process.env.PORT || 3001;

export const StartServer = async () => {
  // Your server initialization logic here

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  process.on("SIGINT", () => {
    console.log("SIGINT signal received: closing HTTP server");
    process.exit(0);
  });
  process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server");
    process.exit(0);
  });
  process.on("uncaughtException", (err) => {
    console.error("There was an uncaught error", err);
    process.exit(8); //mandatory (as per the Node.js docs)
  });
};

StartServer()
  .then((res) => {
    console.log("Server started successfully");
  })
  .catch((err) => {
    console.error("Error starting server: ", err);
  });
