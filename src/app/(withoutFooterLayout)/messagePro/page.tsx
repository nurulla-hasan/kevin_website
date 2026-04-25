'use client';

import { useState } from 'react';
import { FiSearch, FiPaperclip, FiSend } from 'react-icons/fi';
import Image from 'next/image';
import userImg1 from '@/assests/cons1.png';
import userImg2 from '@/assests/cons3.png';
import userImg3 from '@/assests/cons2.png';
import choket from '@/assests/choket.png';
import { SlBadge } from 'react-icons/sl';
const MessageProPage = () => {
  const [selectedContact, setSelectedContact] = useState('ellie');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [activeTab, setActiveTab] = useState('ask'); // 'messages' | 'ask'
  const vipContractor = true;
  const proUser = true;
  const proContractor = true;
  const contacts = [
    {
      id: 'ellie',
      name: 'Ellie Smith',
      role: 'Handyman, Phoenix',
      time: '11:04',
      avatar: userImg1,
      online: true,
    },
    {
      id: 'berlie',
      name: 'Berlie Tuscani',
      role: 'Handyman, Phoenix',
      time: 'Thu',
      avatar: userImg2,
      online: false,
    },
    {
      id: 'abd',
      name: 'Abd Jacknish',
      role: 'Handyman, Phoenix',
      time: '08/09',
      avatar: userImg3,
      online: false,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'ellie',
      time: '10:16',
      content: 'Vel et commodo...',
      type: 'text',
    },
    {
      id: 2,
      sender: 'ellie',
      time: '10:16',
      content: '/placeholder.svg?height=120&width=200',
      type: 'image',
    },
    {
      id: 3,
      sender: 'me',
      time: '10:45',
      content: 'Est, eget est quis ornare...',
      type: 'text',
    },
    {
      id: 4,
      sender: 'ellie',
      time: '11:04',
      content: 'Vestibulum viverra lacus...',
      type: 'text',
    },
    {
      id: 5,
      sender: 'me',
      time: '12:37',
      content: 'Donec lobortis mattis...',
      type: 'text',
    },
    {
      id: 6,
      sender: 'ellie',
      time: '11:04',
      content: 'Ok lets do it!',
      type: 'text',
    },
  ];

  const selectedContactData = contacts.find(c => c.id === selectedContact);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
    if (files.length) {
      files.forEach(file => {
      });
      setFiles([]);
    }
  };

  const handleFileUpload = e => {
    const uploadedFiles = e.target.files;
    if (uploadedFiles) {
      setFiles(prev => [...prev, ...Array.from(uploadedFiles)]);
    }
  };

  return (
    <>
      {/* pro user and pro constractor messaging */}
      {proContractor && proUser ? (
        <div className="flex container mx-auto my-12 bg-muted rounded-xl overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 bg-card border-r border-border flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-4 pr-10 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                />
                <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 text-sm font-medium px-4 pt-3 mb-3">
              <button
                className={`pb-2 ${
                  activeTab === 'messages'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground'
                }`}
                onClick={() => setActiveTab('messages')}
              >
                Messages
              </button>
              <button
                className={`pb-2 relative ${
                  activeTab === 'ask'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground'
                }`}
                onClick={() => setActiveTab('ask')}
              >
                Ask a Pro
                <span className="absolute -top-2 -right-3 bg-destructive text-destructive-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  1
                </span>
              </button>
            </div>

            {/* Contact List */}
            <div className="flex-1 overflow-y-auto">
              {contacts.map(contact => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact.id)}
                  className={`flex items-center gap-3 p-4 hover:bg-muted cursor-pointer ${
                    selectedContact === contact.id ? 'bg-primary/10' : ''
                  }`}
                >
                  <div className="relative">
                    <Image
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover"
                      width={48}
                      height={48}
                    />
                    {contact.online && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      {activeTab === 'ask' && (
                        <span className="text-xs flex px-4 py-1 gap-2 justify-center items-center mb-1  bg-primary text-primary-foreground rounded">
                          <SlBadge /> Expert
                        </span>
                      )}
                      <p className="font-semibold text-sm text-foreground">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.time}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{contact.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="bg-card border-b border-border p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  <h2 className="font-medium text-foreground">
                    {selectedContactData?.name}
                  </h2>
                  <span className="ml-3 text-xs flex px-4 py-1 gap-2 justify-center items-center mb-1  bg-primary text-primary-foreground rounded">
                    <SlBadge /> Expert
                  </span>
                </div>
                {vipContractor && (
                  <div>
                    <button className="bg-primary text-primary-foreground px-5 py-1 rounded-xl">
                      Call
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 ${
                    msg.sender === 'me' ? 'justify-end' : ''
                  }`}
                >
                  {msg.sender !== 'me' && (
                    <Image
                      src={selectedContactData?.avatar || userImg1}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      width={32}
                      height={32}
                    />
                  )}
                  <div className="max-w-xs lg:max-w-md">
                    {msg.sender !== 'me' && (
                      <div className="text-xs text-muted-foreground mb-1">
                        {msg.time}
                      </div>
                    )}
                    {msg.type === 'text' ? (
                      <div
                        className={`px-4 py-2 rounded-2xl text-sm ${
                          msg.sender === 'me'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-primary/10 text-foreground'
                        }`}
                      >
                        {msg.content}
                      </div>
                    ) : (
                      <Image
                        src={choket}
                        alt="Shared image"
                        className="rounded-lg"
                        width={100}
                        height={100}
                      />
                    )}
                    {msg.sender === 'me' && (
                      <div className="text-xs text-muted-foreground mt-1 text-right">
                        {msg.time}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input for both tabs */}
            {(activeTab === 'ask' || activeTab === 'messages') && (
              <div className="bg-card border-t border-border p-4">
                {files.length > 0 && (
                  <div className="px-2 pb-3 flex gap-3 flex-wrap">
                    {files.map((file, index) => {
                      const isImage = file.type.startsWith('image/');
                      const objectUrl = URL.createObjectURL(file);
                      return (
                        <div
                          key={index}
                          className="relative group border p-2 rounded-lg bg-muted"
                        >
                          {isImage ? (
                            <Image
                              src={objectUrl}
                              alt={file.name}
                              width={100}
                              height={100}
                              className="rounded object-cover"
                              onLoad={() => URL.revokeObjectURL(objectUrl)}
                            />
                          ) : (
                            <div className="text-sm text-foreground max-w-[150px] truncate">
                              {file.name}
                            </div>
                          )}
                          <button
                            onClick={() =>
                              setFiles(prev =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 text-xs hidden group-hover:flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <label className="p-2 text-muted-foreground hover:text-foreground cursor-pointer">
                    <FiPaperclip className="w-5 h-5" />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      multiple
                    />
                  </label>
                  <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90"
                  >
                    <FiSend className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        //  normal messaging
        <div className="flex container mx-auto my-12 bg-muted rounded-xl overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 bg-card border-r border-border flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-4 pr-10 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                />
                <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 text-sm font-medium px-4 pt-3">
              <button
                className={`pb-2 mb-3 ${
                  activeTab === 'messages'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground'
                }`}
                onClick={() => setActiveTab('messages')}
              >
                Messages
              </button>
            </div>

            {/* Contact List */}
            <div className="flex-1 overflow-y-auto">
              {contacts.map(contact => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact.id)}
                  className={`flex items-center gap-3 p-4 hover:bg-muted cursor-pointer ${
                    selectedContact === contact.id ? 'bg-primary/10' : ''
                  }`}
                >
                  <div className="relative">
                    <Image
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover"
                      width={48}
                      height={48}
                    />
                    {contact.online && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm text-foreground">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.time}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{contact.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="bg-card border-b border-border p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  <h2 className="font-medium text-foreground">
                    {selectedContactData?.name}
                  </h2>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 ${
                    msg.sender === 'me' ? 'justify-end' : ''
                  }`}
                >
                  {msg.sender !== 'me' && (
                    <Image
                      src={selectedContactData?.avatar || userImg1}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      width={32}
                      height={32}
                    />
                  )}
                  <div className="max-w-xs lg:max-w-md">
                    {msg.sender !== 'me' && (
                      <div className="text-xs text-muted-foreground mb-1">
                        {msg.time}
                      </div>
                    )}
                    {msg.type === 'text' ? (
                      <div
                        className={`px-4 py-2 rounded-2xl text-sm ${
                          msg.sender === 'me'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-primary/10 text-foreground'
                        }`}
                      >
                        {msg.content}
                      </div>
                    ) : (
                      <Image
                        src={choket}
                        alt="Shared image"
                        className="rounded-lg"
                        width={100}
                        height={100}
                      />
                    )}
                    {msg.sender === 'me' && (
                      <div className="text-xs text-muted-foreground mt-1 text-right">
                        {msg.time}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input for both tabs */}
            {(activeTab === 'ask' || activeTab === 'messages') && (
              <div className="bg-card border-t border-border p-4">
                {files.length > 0 && (
                  <div className="px-2 pb-3 flex gap-3 flex-wrap">
                    {files.map((file, index) => {
                      const isImage = file.type.startsWith('image/');
                      const objectUrl = URL.createObjectURL(file);
                      return (
                        <div
                          key={index}
                          className="relative group border p-2 rounded-lg bg-muted"
                        >
                          {isImage ? (
                            <Image
                              src={objectUrl}
                              alt={file.name}
                              width={100}
                              height={100}
                              className="rounded object-cover"
                              onLoad={() => URL.revokeObjectURL(objectUrl)}
                            />
                          ) : (
                            <div className="text-sm text-foreground max-w-[150px] truncate">
                              {file.name}
                            </div>
                          )}
                          <button
                            onClick={() =>
                              setFiles(prev =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 text-xs hidden group-hover:flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <label className="p-2 text-muted-foreground hover:text-foreground cursor-pointer">
                    <FiPaperclip className="w-5 h-5" />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      multiple
                    />
                  </label>
                  <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90"
                  >
                    <FiSend className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MessageProPage;
