import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

type DropdownProps = {
  dropdownTitle: string;
  children: React.ReactNode;
  className?: string; // Optional className prop
  isOpen?: boolean; // Optional controlled open state
  toggle?: () => void; // Optional toggle function for controlled behavior
};

const Dropdown = ({
  dropdownTitle,
  children,
  className,
  isOpen: externalIsOpen, // Controlled open state
  toggle: externalToggle, // Controlled toggle function
}: DropdownProps) => {
  // Use internal state if external props are not provided
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen ?? internalIsOpen; // Use external state if provided, otherwise use internal state
  const toggle = externalToggle ?? (() => setInternalIsOpen((prev) => !prev)); // Use external toggle if provided, otherwise use internal toggle

  return (
    <div className={className}>
      {/* Dropdown Header */}
      <div
        className="flex justify-between items-center border-b border-black/30 h-14 cursor-pointer"
        onClick={toggle}
      >
        <p className="text-black/95 text-base">{dropdownTitle}</p>
        {isOpen ? (
          <HiChevronUp className="text-base" />
        ) : (
          <HiChevronDown className="text-base" />
        )}
      </div>

      {/* Dropdown Content */}
      <div style={{ display: isOpen ? "block" : "none" }} className="mt-4">
        <p className="text-sm">{children}</p>
      </div>
    </div>
  );
};

export default Dropdown; 