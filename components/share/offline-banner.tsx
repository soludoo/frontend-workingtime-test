"use client";

import { WifiOff } from "lucide-react";
import { useNetworkStatus } from "@/hooks/use-network-status";
import { useEffect, useState } from "react";

const OfflineBanner = () => {
  const isOnline = useNetworkStatus();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isOnline) {
      setVisible(true);

      timer = setTimeout(() => {
        setVisible(false);
      }, 30000);
    } else {
      setVisible(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOnline]);

  if (!mounted || !visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-9999 flex items-center justify-center gap-2 bg-yellow-500 px-4 py-2 text-sm font-medium text-white shadow-md">
      <WifiOff className="size-4" />
      <span>You&apos;re in offline mode</span>
    </div>
  );
};

export default OfflineBanner;
