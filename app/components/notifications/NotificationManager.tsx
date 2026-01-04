"use client";

import React, { useState, useEffect, useRef } from "react";
import { BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";

interface Notification {
  type: string;
  sender_id: string;
  sender_name: string;
  post_id: string;
  post_heading: string;
  created_at: string;
  read: boolean;
}

export default function NotificationManager() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    try {
      const resp = await axios.get("/api/notifications");
      if (resp.data.status === 200) {
        setNotifications(resp.data.data);
      }
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  const clearNotifications = async () => {
    try {
      setLoading(true);
      await axios.delete("/api/notifications");
      setNotifications([]);
    } catch (error) {
      console.error("Error clearing notifications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll every 30 seconds for new notifications
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full p-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 origin-top-right rounded-2xl border border-gray-200 bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-[100] overflow-hidden backdrop-blur-sm bg-white/95">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-900">
              Notifications
            </h3>
            {notifications.length > 0 && (
              <button
                onClick={clearNotifications}
                disabled={loading}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto overflow-x-hidden p-2 space-y-1">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <div className="rounded-full bg-gray-50 p-3 mb-2">
                  <BellIcon className="h-6 w-6 text-gray-300" />
                </div>
                <p className="text-sm text-gray-500">No new notifications</p>
              </div>
            ) : (
              notifications.map((notification, index) => (
                <Link
                  key={index}
                  href={`/post/${notification.post_id}`}
                  onClick={() => setIsOpen(false)}
                  className="group relative flex flex-col rounded-xl p-3 transition-all hover:bg-gray-50/80 active:scale-[0.98]"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white ${
                        notification.type === "LIKE"
                          ? "bg-red-500"
                          : "bg-indigo-500"
                      }`}
                    >
                      <span className="text-xs font-bold">
                        {notification.sender_name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5 pr-2">
                      <p className="text-sm text-gray-900">
                        <span className="font-semibold">
                          {notification.sender_name}
                        </span>{" "}
                        {notification.type === "LIKE"
                          ? "liked your post:"
                          : "published a new post:"}
                      </p>
                      <p className="line-clamp-1 text-sm font-medium text-indigo-600">
                        &quot;{notification.post_heading}&quot;
                      </p>
                      <span className="text-[11px] text-gray-400">
                        {new Date(notification.created_at).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
