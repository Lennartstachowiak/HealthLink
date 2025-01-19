"use client";

import { useState } from "react";
import { LogOut, Settings, User } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";

export function UserSettings() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button
          className="h-10 w-12 rounded-full bg-gray-100 transition-colors hover:bg-gray-200 flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <User className="h-6 w-6 text-gray-600" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Account Settings</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <div className="flex items-center gap-4 rounded-lg px-4 py-2">
              <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">HealthLink User</p>
                <p className="text-sm text-gray-500">user@healthlink.com</p>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100">
                <Settings className="size-5" />
                Settings
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-red-600 transition-colors hover:bg-red-50">
                <LogOut className="size-5" />
                Log out
              </button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
