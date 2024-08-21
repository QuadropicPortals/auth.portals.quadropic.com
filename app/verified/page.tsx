"use client";

import React from "react";

const VerifiedMessage: React.FC = () => {
  return (
    <div>
      <span>User verified </span>
      <span role="img" aria-label="tick face">
        ✅
      </span>
    </div>
  );
};

export default VerifiedMessage;
