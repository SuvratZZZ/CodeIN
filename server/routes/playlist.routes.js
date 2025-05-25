import express from "express";
import { authMid } from "../middleware/auth.middleware.js";
import { addProblemToPlaylist, createPlayList, deletePlayList, getPlayAllListDetails, getPlayListDetails, removeProblemFromPlaylist } from "../controllers/playlist.controller.js";

const router = express.Router();

router.get("/" , authMid , getPlayAllListDetails)

router.get("/:playlistId" , authMid , getPlayListDetails)

router.post("/create-playlist" ,authMid ,  createPlayList)

router.post('/:playlistId/add-problem' , authMid , addProblemToPlaylist)

router.delete("/:playlistId" , authMid , deletePlayList)

router.delete("/:playlistId/remove-problem" , authMid , removeProblemFromPlaylist)


export default router;