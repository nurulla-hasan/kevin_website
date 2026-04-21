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
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useGetMessagesQuery,
  useGetUsersForSidebarQuery,
  useSendMessageMutation,
} from "@/redux/features/others/otherApi";
import { useAppSelector } from "@/redux/hooks";
import { getSocket } from "@/lib/socket";
import { useRouter } from "next/navigation";
import { useGetSpecefiqUserQuery } from "@/redux/features/user/userApi";

interface Message {
  _id: string;
  senderId: string;
  createdAt: string;
  text: string;
  image: string;
}

export default function MessagingApp() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [textMessage, setTextMessage] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [activeTab, setActiveTab] = useState<"messages" | "askAPro">("askAPro");
  const [searchTerm, setSearchTerm] = useState("");

  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const [sendMessage] = useSendMessageMutation();
  const { user } = useAppSelector(selectCurrentUser);

  const { data: allUsers, isLoading: usersLoading } =
    useGetUsersForSidebarQuery(undefined);
  const { data: OldMessages } = useGetMessagesQuery(selectedUserId, {
    skip: !selectedUserId,
  });
  const myUserId = user?.userId;
  const { data: specUser } = useGetSpecefiqUserQuery(myUserId);
  const role = specUser?.data?.role;
  // Load previous messages
  useEffect(() => {
    if (OldMessages?.data) setMessages(OldMessages.data);
  }, [OldMessages]);

  // Scroll to bottom when new message arrives
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- SOCKET SETUP ---
  useEffect(() => {
    if (!myUserId) return;
    const socket = getSocket(myUserId);
    socketRef.current = socket;

    const handleOnlineUsers = (userIds: string[]) => {
      setOnlineUsers(userIds);
    };

    socket.on("getOnlineUsers", handleOnlineUsers);

    return () => {
      socket.off("getOnlineUsers", handleOnlineUsers);
      socket.disconnect();
    };
  }, [myUserId]);

  // --- HANDLE NEW MESSAGES ---
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handleNewMessage = (newMessage: Message) => {
      if (
        newMessage.senderId === selectedUserId ||
        newMessage.senderId === myUserId
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [selectedUserId, myUserId]);

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
        const newMsg: Message = {
          _id: res.data._id,
          senderId: myUserId,
          createdAt: res.data.createdAt,
          text: res.data.text,
          image: res.data.image,
        };
        setMessages((prev) => [...prev, newMsg]);
        setTextMessage("");
        setFiles([]);
        setPreviews([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (error: any) {
      antdMessage.error(error?.data?.message || "Something went wrong");
    }
  };

  // --- FILTER USERS ---
  const allUser = useMemo(
    () => allUsers?.data?.map((u: any) => u) || [],
    [allUsers]
  );
  const experts = useMemo(
    () =>
      allUsers?.data?.filter(
        (u: any) => u?.subscription?.status === "active"
      ) || [],
    [allUsers]
  );

  const regularUsers = useMemo(
    () =>
      allUsers?.data?.filter(
        (u: any) => u?.subscription?.status !== "active"
      ) || [],
    [allUsers]
  );

  const filteredUsers = useMemo(() => {
    const list = activeTab === "askAPro" ? experts : regularUsers;
    return list.filter((user: any) =>
      `${user.firstName} ${user.lastName}`
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
            onClick={() => setActiveTab("messages")}
            className={`px-3 py-1 rounded-md ${
              activeTab === "messages" ? "bg-blue-100 text-blue-700" : ""
            }`}
          >
            Messages
          </button>
    <button
  onClick={() => {
    // If user is NOT active, redirect appropriately
    if (specUser?.data?.subscription?.status !== "active") {
      if (role === "contractor" || role === "vipContractor") {
        router.push("/vipContractor");
      } else {
        router.push("/pricing");
      }
      return;
    }

    // If active, just switch tab normally
    setActiveTab("askAPro");
  }}
  className={`px-3 py-1 rounded-md flex items-center gap-1 relative transition-colors ${
    activeTab === "askAPro"
      ? "bg-blue-100 text-blue-700"
      : specUser?.data?.subscription?.status !== "active"
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

  {/* show lock icon only if not active */}
  {specUser?.data?.subscription?.status !== "active" && (
    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
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
              return (
                <div
                  key={contact._id}
                  onClick={() => setSelectedUserId(contact._id)}
                  className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${
                    selectedUserId === contact._id ? "bg-blue-100" : ""
                  }`}
                >
                  <div className="relative">
                    <Image
                      src={
                        contact.image ||
                        "https://tse3.mm.bing.net/th/id/OIP.kUFzwD5-mfBV0PfqgI5GrAHaHa"
                      }
                      alt="avatar"
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    {isOnline && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div className="ml-3 flex flex-col">
                    <span className="font-medium text-gray-900 text-sm">
                      {contact.firstName} {contact.lastName}
                    </span>
                    {contact?.subscription?.status === "active" && (
                      <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-md w-fit">
                        Expert
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col h-[80vh]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            const isMe = msg.senderId === myUserId;
            return (
              <div
                key={msg._id}
                className={`flex items-start ${isMe ? "justify-end" : ""}`}
              >
                {!isMe && (
                  <Image
                    src={selectedContactData?.image || avatar}
                    alt="user"
                    width={32}
                    height={32}
                    className="rounded-full mr-2"
                  />
                )}
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                    isMe
                      ? "bg-blue-500 text-white text-right"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                  {msg.image && (
                    <div className="mt-2">
                      <Image
                        src={msg.image}
                        alt="attachment"
                        width={200}
                        height={200}
                        className="rounded-md"
                      />
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    {dayjs(msg.createdAt).format("h:mm A")}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messageEndRef} />
        </div>

        {/* Message Input */}
        {selectedUserId && (
          <div className="bg-white border-t border-gray-200 p-3">
            {previews.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {previews.map((src, idx) => (
                  <div key={idx} className="relative">
                    <Image
                      src={src}
                      alt="preview"
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
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
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50"
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
