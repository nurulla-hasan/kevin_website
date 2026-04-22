/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  useState,
  useEffect,
  ChangeEvent,
  useRef,
  useMemo,
} from "react";
import avatar from "../../../assests/avatar.png";
import { FiPaperclip, FiSend, FiSearch } from "react-icons/fi";
import Image from "next/image";
import { Socket } from "socket.io-client";
import { message as antdMessage } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { selectCurrentUser, selectCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useGetMessagesQuery,
  useGetUsersForSidebarQuery,
  useSendMessageMutation,
} from "@/redux/features/others/otherApi";
import { useAppSelector } from "@/redux/hooks";
import { getSocket, disconnectSocket } from "@/lib/socket";
import { useGetSpecefiqUserQuery } from "@/redux/features/user/userApi";

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  text: string;
  image: string | null;
}

export default function MessagingApp() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [textMessage, setTextMessage] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [activeTab, setActiveTab] = useState<"messages" | "askAPro">("messages");
  const [searchTerm, setSearchTerm] = useState("");

  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const [sendMessage] = useSendMessageMutation();
  const currentUser = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);

  const myUserId = (currentUser as any)?.user?.userId || (currentUser as any)?.userId || (currentUser as any)?._id;
  // Role is nested inside user object in JWT payload
  const myRole = (currentUser as any)?.user?.role || (currentUser as any)?.role;



  const { data: allUsers, isLoading: usersLoading } =
    useGetUsersForSidebarQuery(undefined);

  const { data: OldMessages } = useGetMessagesQuery(selectedUserId, {
    skip: !selectedUserId,
  });

  const { data: specUser } = useGetSpecefiqUserQuery(myUserId);

  // Set default tab based on role (runs once when myRole is available from JWT)
  useEffect(() => {
    if (myRole === "vipContractor" || myRole === "vipMember") {
      setActiveTab("askAPro");
    } else if (myRole === "user") {
      setActiveTab("messages");
    }
  }, [myRole]);

  // Load previous messages when user is selected
  useEffect(() => {
    if (OldMessages?.data) setMessages(OldMessages.data);
  }, [OldMessages]);

  // Scroll to bottom on new message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- SOCKET SETUP & MESSAGE HANDLING ---
  useEffect(() => {
    if (!token) return;

    const s = getSocket(token);
    socketRef.current = s;

    // Online users listener
    const handleOnlineUsers = (userIds: string[]) => {
      setOnlineUsers(userIds);
    };
    s.on("getOnlineUsers", handleOnlineUsers);

    // New message listener
    const handleNewMessage = (newMessage: any) => {
      const msg = newMessage.data || newMessage;
      const senderId = msg.senderId?.toString();
      const receiverId = msg.receiverId?.toString();
      const currentSelectedId = selectedUserId?.toString();
      const myId = myUserId?.toString();

      if ((senderId === currentSelectedId && receiverId === myId) || 
          (senderId === myId && receiverId === currentSelectedId)) {
        setMessages((prev) => {
          const exists = prev.find((m) => m._id === msg._id);
          if (exists) return prev;
          return [...prev, msg];
        });
      }
    };
    s.on("newMessage", handleNewMessage);

    return () => {
      s.off("getOnlineUsers", handleOnlineUsers);
      s.off("newMessage", handleNewMessage);
    };
  }, [token, selectedUserId, myUserId]);

  // --- FILE UPLOAD ---
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
      setPreviews(selectedFiles.map((f) => URL.createObjectURL(f)));
    }
  };

  const handleImageCancel = (idx: number) => {
    setFiles(files.filter((_, i) => i !== idx));
    setPreviews(previews.filter((_, i) => i !== idx));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --- SEND MESSAGE ---
  const handleSendMessage = async () => {
    if (!textMessage && files.length === 0) return;
    if (!selectedUserId) {
      antdMessage.warning("Select a receiver!");
      return;
    }

    const formData = new FormData();
    if (textMessage)
      formData.append("data", JSON.stringify({ text: textMessage }));
    if (files.length > 0) formData.append("image", files[0]);

    try {
      const res = await sendMessage({
        receiverId: selectedUserId,
        data: formData,
      }).unwrap();

      if (res.success) {
        setTextMessage("");
        setFiles([]);
        setPreviews([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (error: any) {
      antdMessage.error(error?.data?.message || "Something went wrong");
    }
  };

  // --- TAB ACCESS CONTROL ---
  // Messages tab: role === "user"
  // Ask a Pro tab: role === "vipMember" or "vipContractor"
  const canAccessAskAPro =
    myRole === "vipMember" || myRole === "vipContractor";

  // --- FILTER USERS BY TAB ---
  // Messages tab shows users with role "user"
  // Ask a Pro tab shows users with role "vipContractor"
  const experts = useMemo(() => {
    if (!allUsers?.data) return [];

    // If I am a vipMember, show me Pros (vipContractors)
    if (myRole === "vipMember") {
      return allUsers.data.filter((u: any) => u.role === "vipContractor" && u._id.toString() !== myUserId?.toString());
    }

    // If I am a Pro (vipContractor), show me Premium Clients (vipMembers)
    if (myRole === "vipContractor") {
      return allUsers.data.filter((u: any) => u.role === "vipMember" && u._id.toString() !== myUserId?.toString());
    }

    return [];
  }, [allUsers, myRole, myUserId]);

  const regularUsers = useMemo(() => {
    if (!allUsers?.data) return [];
    
    // Show everyone else who is not in the "experts" list to avoid losing any conversations
    // AND exclude the current user themselves
    const expertIds = new Set(experts.map((u: any) => u._id.toString()));
    return allUsers.data.filter((u: any) => !expertIds.has(u._id.toString()) && u._id.toString() !== myUserId?.toString());
  }, [allUsers, experts, myUserId]);

  const filteredUsers = useMemo(() => {
    const list = activeTab === "askAPro" ? experts : regularUsers;
    return list.filter((u: any) =>
      `${u.firstName} ${u.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [activeTab, experts, regularUsers, searchTerm]);

  const selectedContactData = allUsers?.data?.find(
    (c: any) => c._id === selectedUserId
  );

  // --- JSX ---
  return (
    <div className="flex container mx-auto my-12 bg-gray-50 rounded-xl">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-[80vh]">
        {/* Tabs */}
        <div className="border-b flex justify-around items-center py-3 text-sm font-medium">
          <button
            onClick={() => {
              setActiveTab("messages");
              setSelectedUserId("");
            }}
            className={`px-3 py-1 rounded-md ${
              activeTab === "messages" ? "bg-blue-100 text-blue-700" : ""
            }`}
          >
            Messages
          </button>

          <button
            onClick={() => {
              if (!canAccessAskAPro) {
                // Regular users get redirected to pricing
                router.push("/pricing");
                return;
              }
              setActiveTab("askAPro");
              setSelectedUserId("");
            }}
            className={`px-3 py-1 rounded-md flex items-center gap-1 relative transition-colors ${
              activeTab === "askAPro"
                ? "bg-blue-100 text-blue-700"
                : !canAccessAskAPro
                ? "opacity-60 cursor-pointer"
                : "hover:bg-gray-100"
            }`}
          >
            Ask a Pro
            {experts.length > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                {experts.length}
              </span>
            )}
            {!canAccessAskAPro && (
              <span className="absolute -right-1 -top-1 text-gray-400 text-xs">
                🔒
              </span>
            )}
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-gray-100 relative">
          <FiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto">
          {usersLoading ? (
            <div className="p-4 text-sm text-gray-500">Loading...</div>
          ) : filteredUsers.length === 0 ? (
            <p className="p-4 text-gray-500 text-sm">No users found</p>
          ) : (
            filteredUsers.map((contact: any) => {
              const isOnline = onlineUsers.includes(contact._id);
              const hasUnread = contact.lastMessage && !contact.lastMessage.isRead;
              return (
                <div
                  key={contact._id}
                  onClick={() => setSelectedUserId(contact._id)}
                  className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${
                    selectedUserId === contact._id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="relative">
                    <Image
                      src={
                        contact.image && !contact.image.includes("undefined")
                          ? contact.image
                          : avatar
                      }
                      alt="avatar"
                      width={48}
                      height={48}
                      className="rounded-full object-cover w-12 h-12"
                    />
                    {isOnline && (
                      <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div className="ml-3 flex flex-col flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium text-sm truncate ${hasUnread ? "text-gray-900 font-semibold" : "text-gray-700"}`}>
                        {contact.firstName} {contact.lastName}
                      </span>
                      {contact.lastMessage?.createdAt && (
                        <span className="text-xs text-gray-400 ml-1 shrink-0">
                          {dayjs(contact.lastMessage.createdAt).format("h:mm A")}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      {contact.role === "vipContractor" && (
                        <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-md w-fit">
                          Expert
                        </span>
                      )}
                      {contact.lastMessage?.text && (
                        <span className="text-xs text-gray-400 truncate max-w-[120px]">
                          {contact.lastMessage.text}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col h-[80vh]">
        {/* Chat Header */}
        {selectedUserId && selectedContactData && (
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
            <div className="relative">
              <Image
                src={
                  selectedContactData.image &&
                  !selectedContactData.image.includes("undefined")
                    ? selectedContactData.image
                    : avatar
                }
                alt="user"
                width={40}
                height={40}
                className="rounded-full object-cover w-10 h-10"
              />
              {onlineUsers.includes(selectedContactData._id) && (
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900">
                {selectedContactData.firstName} {selectedContactData.lastName}
              </p>
              <p className="text-xs text-gray-500">
                {onlineUsers.includes(selectedContactData._id)
                  ? "Online"
                  : "Offline"}
              </p>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!selectedUserId ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="text-5xl mb-3">💬</div>
              <p className="text-sm">Select a conversation to start messaging</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.senderId === myUserId;
              return (
                <div
                  key={msg._id}
                  className={`flex items-end gap-2 ${isMe ? "justify-end" : ""}`}
                >
                  {!isMe && (
                    <Image
                      src={
                        selectedContactData?.image &&
                        !selectedContactData.image.includes("undefined")
                          ? selectedContactData.image
                          : avatar
                      }
                      alt="user"
                      width={28}
                      height={28}
                      className="rounded-full object-cover w-7 h-7 mb-1 shrink-0"
                    />
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl text-sm ${
                      isMe
                        ? "bg-blue-500 text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                    }`}
                  >
                    {msg.text && <p>{msg.text}</p>}
                    {msg.image && !msg.image.includes("undefined") && (
                      <div className="mt-2">
                        <Image
                          src={msg.image}
                          alt="attachment"
                          width={200}
                          height={200}
                          className="rounded-md max-w-full"
                        />
                      </div>
                    )}
                    <div className={`text-xs mt-1 ${isMe ? "text-blue-100" : "text-gray-400"}`}>
                      {dayjs(msg.createdAt).format("h:mm A")}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messageEndRef} />
        </div>

        {/* Message Input */}
        {selectedUserId && (
          <div className="bg-white border-t border-gray-200 p-3">
            {previews.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {previews.map((src, idx) => (
                  <div key={idx} className="relative shrink-0">
                    <Image
                      src={src}
                      alt="preview"
                      width={80}
                      height={80}
                      className="rounded-md object-cover w-20 h-20"
                    />
                    <button
                      onClick={() => handleImageCancel(idx)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center gap-3">
              <label className="cursor-pointer text-gray-500 hover:text-gray-700">
                <FiPaperclip className="w-5 h-5" />
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileUpload}
                  accept="image/*"
                />
              </label>
              <input
                type="text"
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                disabled={!textMessage && files.length === 0}
                onClick={handleSendMessage}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                <FiSend className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
