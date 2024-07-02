import express, { Application } from "express";
import "dotenv/config";
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
  private setupRoutes(): void {}
  private setupGlobalError(): void {}

  private startServer() {
    const port = Number(process.env.PORT || 5050);
    const server = this.app.listen(port, () => {
      console.log("Server started serving");
      console.log(server.address());
    });
  }
}

export default Server;
