import express from 'express';
const router=express.Router();
import {verifyToken} from "../middleware/auth";
import {deleteController} from '../controllers/deleteController';

router.delete('/:id',verifyToken,deleteController);

export default router;
