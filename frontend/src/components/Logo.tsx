/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  light?: boolean;
}

export function LogoIcon({ className = "h-10 w-10" }: { className?: string }) {
  return <img src="/logo.png" alt="Indore Colleges" className={className} />;
}

export default function Logo({ className = "", iconOnly = false, light = false }: LogoProps) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      {iconOnly ? (
        <LogoIcon className="h-14 w-14 object-contain transition-transform duration-300 group-hover:scale-105" />
      ) : (
        <LogoIcon className="h-16 w-16 sm:h-20 sm:w-20 object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
      )}
    </div>
  );
}
