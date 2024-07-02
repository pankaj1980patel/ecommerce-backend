import Server from "./server";
import express from "express";
class ShopApplication {
  public run() {
    const app = express();
    const server = new Server(app);
    server.start();
  }
}

const shopApplication = new ShopApplication();
shopApplication.run();
