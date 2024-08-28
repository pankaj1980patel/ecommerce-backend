import express, { Application } from "express";
import "dotenv/config";
import appRoute from "./globals/routes/appRoutes";
class Server {
  private app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  public start() {
    this.setupMiddleware();
    this.setupRoutes();
    this.setupGlobalError();
    this.startServer();
  }
  private setupMiddleware(): void {
    this.app.use(express.json());
  }
  private setupRoutes(): void {
    appRoute(this.app);
  }
  private setupGlobalError(): void {
    this.app.all("*", (req, res, next) => {
      res.status(404).json({
        status: false,
        message: `Can't find ${req.originalUrl} on this server.`
      });
    });
  }

  private startServer() {
    const port = Number(process.env.PORT || 5050);
    const server = this.app.listen(port, () => {
      console.log("Server started serving");
      console.log(server.address());
    });
  }
}

export default Server;
