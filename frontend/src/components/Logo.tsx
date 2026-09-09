/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import logoUrl from '../../../src/assets/images/logo.svg';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  light?: boolean;
}

export function LogoIcon({ className = "h-10 w-10" }: { className?: string }) {
  return <img src={logoUrl} alt="Indore Colleges" className={`${className} max-w-[calc(100vw-2rem)]`} />;
}

export default function Logo({ className = "", iconOnly = false, light = false }: LogoProps) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      {iconOnly ? (
        <LogoIcon className="h-12 w-auto object-contain" />
      ) : (
        <LogoIcon className="h-14 w-auto sm:h-20 object-contain" />
      )}
    </div>
  );
}
