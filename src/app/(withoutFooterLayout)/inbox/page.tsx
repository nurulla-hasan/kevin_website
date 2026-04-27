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
    <div className="flex container mx-auto my-12 bg-muted rounded-xl">
      {/* Sidebar */}
      <div className="w-80 bg-card border-r border-border flex flex-col h-[80vh]">
        {/* Tabs */}
        <div className="border-b border-border flex justify-around items-center py-3 text-sm font-medium">
          <button
            onClick={() => {
              setActiveTab("messages");
              setSelectedUserId("");
            }}
            className={`px-3 py-1 rounded-md ${
              activeTab === "messages" ? "bg-secondary/10 text-secondary" : ""
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
                ? "bg-secondary/10 text-secondary"
                : !canAccessAskAPro
                ? "opacity-60 cursor-pointer"
                : "hover:bg-muted"
            }`}
          >
            Ask a Pro
            {experts.length > 0 && (
              <span className="bg-secondary text-secondary-foreground text-xs rounded-full px-2 py-0.5 ml-1">
                {experts.length}
              </span>
            )}
            {!canAccessAskAPro && (
              <span className="absolute -right-1 -top-1 text-muted-foreground text-xs">
                🔒
              </span>
            )}
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-border relative">
          <FiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto">
          {usersLoading ? (
            <div className="p-4 text-sm text-muted-foreground">Loading...</div>
          ) : filteredUsers.length === 0 ? (
            <p className="p-4 text-muted-foreground text-sm">No users found</p>
          ) : (
            filteredUsers.map((contact: any) => {
              const isOnline = onlineUsers.includes(contact._id);
              const hasUnread = contact.lastMessage && !contact.lastMessage.isRead;
              return (
                <div
                  key={contact._id}
                  onClick={() => setSelectedUserId(contact._id)}
                  className={`flex items-center p-4 cursor-pointer hover:bg-muted ${
                    selectedUserId === contact._id ? "bg-primary/10" : ""
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
                      <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>
                  <div className="ml-3 flex flex-col flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium text-sm truncate ${hasUnread ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                        {contact.firstName} {contact.lastName}
                      </span>
                      {contact.lastMessage?.createdAt && (
                        <span className="text-xs text-muted-foreground ml-1 shrink-0">
                          {dayjs(contact.lastMessage.createdAt).format("h:mm A")}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      {contact.role === "vipContractor" && (
                        <span className="text-xs text-secondary font-semibold bg-secondary/10 px-2 py-0.5 rounded-md w-fit">
                          Expert
                        </span>
                      )}
                      {contact.lastMessage?.text && (
                        <span className="text-xs text-muted-foreground truncate max-w-[120px]">
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
          <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3">
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
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
              )}
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">
                {selectedContactData.firstName} {selectedContactData.lastName}
              </p>
              <p className="text-xs text-muted-foreground">
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
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
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
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
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
                    <div className={`text-xs mt-1 ${isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
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
          <div className="bg-card border-t border-border p-3">
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
                      className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center gap-3">
              <label className="cursor-pointer text-muted-foreground hover:text-foreground">
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
                className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
              <button
                disabled={!textMessage && files.length === 0}
                onClick={handleSendMessage}
                className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 transition-colors"
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
