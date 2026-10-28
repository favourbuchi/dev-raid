import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  ChevronDown,
  Search,
  Bell,
  Check,
  User,
  Settings,
  HelpCircle,
} from 'lucide-react';
import CommunityScore from './CommunityScore';
import { MOCK_COMMUNITIES, MOCK_USER } from '../../data/mockData';
import { ROUTES } from '../../utils/constants';

/**
 * Clean, responsive Topbar for DevRaid.
 * Includes community selector dropdown, search placeholder, community score,
 * notification indicator, and user profile menu.
 */
export function Topbar({ onToggleMobileMenu }) {
  const [selectedCommunity, setSelectedCommunity] = useState(MOCK_COMMUNITIES[0]);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const communityMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Close dropdowns on outside click and Escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        communityMenuRef.current &&
        !communityMenuRef.current.contains(event.target)
      ) {
        setIsCommunityOpen(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsCommunityOpen(false);
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="h-16 border-b border-border-subtle bg-card-bg/95 backdrop-blur-xs sticky top-0 z-30">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left Section: Mobile Menu Toggle & Community Selector */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          {/* Mobile menu button (visible on screens smaller than lg) */}
          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-label="Open navigation menu"
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-[#F1F3F5] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Community Selector Dropdown */}
          <div className="relative" ref={communityMenuRef}>
            <button
              type="button"
              onClick={() => {
                setIsCommunityOpen(!isCommunityOpen);
                setIsProfileOpen(false);
              }}
              aria-expanded={isCommunityOpen}
              aria-haspopup="true"
              aria-label="Select community"
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-lg border border-border-subtle bg-card-bg hover:bg-[#F8F9FA] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 transition-colors"
            >
              <div className="h-2 w-2 rounded-full bg-accent-primary shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-text-primary truncate max-w-[130px] sm:max-w-[200px]">
                {selectedCommunity.name}
              </span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-text-secondary transition-transform duration-150 ${
                  isCommunityOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Community Dropdown Popover */}
            {isCommunityOpen && (
              <div className="absolute left-0 mt-1.5 w-64 rounded-lg border border-border-subtle bg-card-bg p-1.5 shadow-md z-50 animate-in fade-in-50 duration-100">
                <div className="px-3 py-1.5 border-b border-border-subtle mb-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                    Available Communities
                  </span>
                </div>
                <div className="space-y-0.5" role="menu">
                  {MOCK_COMMUNITIES.map((community) => {
                    const isSelected = community.id === selectedCommunity.id;
                    return (
                      <button
                        key={community.id}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setSelectedCommunity(community);
                          setIsCommunityOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-md text-left transition-colors ${
                          isSelected
                            ? 'bg-green-subtle text-text-success font-medium'
                            : 'text-text-primary hover:bg-[#F8F9FA]'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{community.name}</span>
                          <span className="text-[11px] text-text-secondary">
                            {community.memberCount} members • {community.tier}
                          </span>
                        </div>
                        {isSelected && (
                          <Check className="h-3.5 w-3.5 text-text-success shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center Section: Compact Search Field (visible on md+) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              readOnly
              placeholder="Search targets, activity..."
              className="w-full pl-9 pr-12 py-1.5 text-xs rounded-lg border border-border-subtle bg-[#F8F9FA] text-text-primary placeholder:text-text-secondary/70 focus:outline-none focus:border-border-subtle cursor-pointer hover:bg-[#F3F4F6] transition-colors"
              title="Search placeholder (Phase 2)"
            />
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
              <kbd className="px-1.5 py-0.5 text-[10px] font-sans font-medium text-text-secondary bg-card-bg border border-border-subtle rounded shadow-2xs">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right Section: Community Score, Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Community Score (Full on desktop, compact on mobile/tablet) */}
          <div className="hidden sm:block">
            <CommunityScore />
          </div>
          <div className="sm:hidden">
            <CommunityScore compact />
          </div>

          {/* Notifications Button */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-[#F1F3F5] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 transition-colors"
            title="Notifications placeholder"
          >
            <Bell className="h-4 w-4" />
            {/* Subtle notification dot */}
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-accent-primary ring-2 ring-card-bg" />
          </button>

          {/* User Profile Dropdown */}
          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsCommunityOpen(false);
              }}
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
              aria-label="User profile menu"
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-[#F8F9FA] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-subtle border border-[#D6E5DA] text-text-success text-xs font-semibold shrink-0">
                {MOCK_USER.initials}
              </div>
              <span className="hidden xl:inline-block text-xs font-medium text-text-primary max-w-[100px] truncate">
                {MOCK_USER.name}
              </span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-text-secondary transition-transform duration-150 ${
                  isProfileOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-1.5 w-56 rounded-lg border border-border-subtle bg-card-bg p-1.5 shadow-md z-50 animate-in fade-in-50 duration-100">
                <div className="px-3 py-2 border-b border-border-subtle mb-1">
                  <p className="text-xs font-semibold text-text-primary">
                    {MOCK_USER.name}
                  </p>
                  <p className="text-[11px] text-text-secondary truncate">
                    {MOCK_USER.email}
                  </p>
                </div>
                <div className="space-y-0.5" role="menu">
                  <Link
                    to={ROUTES.PROFILE}
                    onClick={() => setIsProfileOpen(false)}
                    role="menuitem"
                    className="flex items-center gap-2 px-3 py-2 text-xs rounded-md text-text-secondary hover:text-text-primary hover:bg-[#F8F9FA] transition-colors"
                  >
                    <User className="h-3.5 w-3.5" />
                    <span>Your Profile</span>
                  </Link>
                  <Link
                    to={ROUTES.SETTINGS}
                    onClick={() => setIsProfileOpen(false)}
                    role="menuitem"
                    className="flex items-center gap-2 px-3 py-2 text-xs rounded-md text-text-secondary hover:text-text-primary hover:bg-[#F8F9FA] transition-colors"
                  >
                    <Settings className="h-3.5 w-3.5" />
                    <span>Account Settings</span>
                  </Link>
                </div>
                <div className="mt-1 pt-1.5 border-t border-border-subtle px-3 py-1 text-[10px] text-text-secondary flex items-center gap-1.5">
                  <HelpCircle className="h-3 w-3 text-text-secondary" />
                  <span>Phase 2 Guest Session</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
