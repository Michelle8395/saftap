import { Router, type Router as ExpressRouter } from "express";
import { fundWallet, getWalletBalance } from "./wallet.controller.js";

export const walletRouter: ExpressRouter = Router();

walletRouter.post("/fund", fundWallet);
walletRouter.get("/balance", getWalletBalance);
