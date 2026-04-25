'use client';

import { useState } from 'react';

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    projectUpdates: {
      inApp: true,
      email: true,
      sms: false,
    },
    message: {
      inApp: true,
      email: false,
      sms: true,
    },
  });

  const handleToggle = (section, type) => {
    setNotifications((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [type]: !prev[section][type],
      },
    }));
  };

  const renderOption = (checked, label) => (
    <div className="flex items-center gap-1 cursor-pointer">
      <span
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
          checked ? 'border-primary' : 'border-border'
        }`}
      >
        {checked && (
          <span className="w-2 h-2 bg-primary rounded-full"></span>
        )}
      </span>
      <span className="text-sm text-foreground">{label}</span>
    </div>
  );

  return (
    <div className="bg-card border border-border p-6 min-h-screen rounded-lg w-full max-w-7xl mx-auto  h-[450px]">
      <h2 className="text-2xl font-semibold text-foreground mb-4">Notifications</h2>
      <div className="border-b border-border mb-6"></div>

      {/* Notification options */}
      <div className="space-y-6">
        {/* Project Updates */}
        <div className="flex xl:mt-48 items-center justify-between">
          <span className="font-medium text-foreground">Project Updates</span>
          <div className="flex gap-6">
            <div onClick={() => handleToggle('projectUpdates', 'inApp')}>
              {renderOption(notifications.projectUpdates.inApp, 'In-app')}
            </div>
            <div onClick={() => handleToggle('projectUpdates', 'email')}>
              {renderOption(notifications.projectUpdates.email, 'Email')}
            </div>
            <div onClick={() => handleToggle('projectUpdates', 'sms')}>
              {renderOption(notifications.projectUpdates.sms, 'SMS')}
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-foreground">Message</span>
          <div className="flex gap-6">
            <div onClick={() => handleToggle('message', 'inApp')}>
              {renderOption(notifications.message.inApp, 'In-app')}
            </div>
            <div onClick={() => handleToggle('message', 'email')}>
              {renderOption(notifications.message.email, 'Email')}
            </div>
            <div onClick={() => handleToggle('message', 'sms')}>
              {renderOption(notifications.message.sms, 'Email')}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-10 w-full">
        <button className="w-1/2 px-6 py-2 border border-border rounded-md text-foreground hover:bg-muted">
          Cancel
        </button>
        <button className="w-1/2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          Update
        </button>
      </div>
    </div>
  );
}
