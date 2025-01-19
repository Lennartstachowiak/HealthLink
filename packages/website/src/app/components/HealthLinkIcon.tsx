"use client";

import Image from "next/image";

const HealthLinkIcon = () => {
  return (
    <>
      {/* Mobile View: healthlink-icon.svg */}
      <Image
        src="/healthlink-icon.svg"
        alt="HealthLink Logo"
        width={32}
        height={32}
        className="block sm:hidden h-8"
      />

      {/* Desktop View: healthlink-text.svg */}
      <Image
        src="/healthlink-text.svg"
        alt="HealthLink Logo"
        width={140}
        height={32}
        className="hidden sm:block h-8"
      />
    </>
  );
};

export default HealthLinkIcon;
