import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createGroup,
  getAllGroups,
  sendGroupMessage,
  getGroupMessages,
  fetchusers,
  addMemberToGroup,
  getGroupMembers,
  removeMember,
  disableGroup
} from "../controllers/group.controller.js";

const groupRouter = Router();

groupRouter.post("/create", protectRoute, createGroup);

groupRouter.get("/", protectRoute, getAllGroups);

groupRouter.get("/users", protectRoute, fetchusers);

groupRouter.post("/add-member", protectRoute, addMemberToGroup);

groupRouter.get("/members", protectRoute, getGroupMembers);

groupRouter.post("/remove-member", protectRoute, removeMember);

groupRouter.post("/disable", protectRoute, disableGroup);

groupRouter.post("/send/:groupId", protectRoute, sendGroupMessage);

groupRouter.get("/messages/:groupId", protectRoute, getGroupMessages);

export default groupRouter;
