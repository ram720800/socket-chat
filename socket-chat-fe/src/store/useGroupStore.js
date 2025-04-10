import { create } from "zustand";
import { instance } from "@/lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useGroupStore = create((set, get) => ({
  groups: [],
  users: [],
  groupMembers: [],
  loading: false,
  groupMessages: [],
  selectedGroup: null,
  isMessagesLoading: false,
  isGroupsLoading: false,

  createGroup: async (groupData) => {
    set({ loading: true });
    try {
      const res = await instance.post("/groups/create", groupData);
      set((state) => ({ groups: [...state.groups, res.data] }));
      toast.success("Group Created Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
  getGroups: async () => {
    set({ isGroupsLoading: true });
    try {
      const res = await instance.get("/groups");
      set({ groups: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isGroupsLoading: false });
    }
  },
  fetchGroupUsers: async (groupId) => {
    try {
      const res = await instance.get(`/groups/users/?groupId=${groupId}`);
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  addMemberToGroup: async (groupId, userId) => {
    set({ loading: true });
    try {
      await instance.post("/groups/add-member", { groupId, userId });
      set((state) => ({
        users: state.users.filter((user) => user._id !== userId),
      }));
      toast.success("Member added successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
  fetchGroupMembers: async (groupId) => {
    try {
      const res = await instance.get(`/groups/members/?groupId=${groupId}`);
      set({ groupMembers: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  removeMember: async (groupId, memberId) => {
    try {
      await instance.post("/groups/remove-member", {
        groupId,
        userId: memberId,
      });
      get().fetchGroupMembers(groupId);
      toast.success("Member removed");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  disableGroup: async (groupId) => {
    try {
      await instance.post("/groups/disable", { groupId });
      set((state) => ({
        groups: state.groups.filter((group) => group._id !== groupId),
        selectedGroup: null,
      }));
      toast.success("Group Disabled!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  getGroupMessages: async (groupId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await instance.get(`/groups/messages/${groupId}`);
      set({ groupMessages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendGroupMessage: async (messageData) => {
    const { selectedGroup } = get();
    try {
      await instance.post(`/groups/send/${selectedGroup._id}`, messageData);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  subscribeToGroupMessage: (groupId) => {
    const socket = useAuthStore.getState().socket;

    socket.on("newGroupMessage", (newMessage) => {
      if (newMessage.groupId !== groupId) return;
      set({
        groupMessages: [...get().groupMessages, newMessage],
      });
    });
    socket.emit("joinGroup", groupId);
  },
  unSubscribeToGroupMessage: (groupId) => {
    const socket = useAuthStore.getState().socket;
    socket.off("newGroupMessage");
    socket.emit("leaveGroup", groupId);
  },
  setSelectedGroup: (selectedGroup) => set({ selectedGroup }),
}));
