"use client";

import React, { useEffect, useState, useRef, RefObject } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

import { useClickOutside } from "@lib/hooks/useClickOutside";
import { useWindowDimensions } from "@lib/hooks/useWindowDimensions";

import logo from "@assets/images/logo-white.png";
import defaultProfile from "@assets/images/profile.png";
import classNames from "classnames";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from "next-auth/react";
import { Session } from "next-auth";
import MessagesCount from "@/components/common/MessagesCount";

// Types
type MenuLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  isUserMenu?: boolean;
};

type UserMenuProps = {
  isOpen: boolean;
  toggleMenu: () => void;
  ref: React.RefObject<HTMLDivElement | null>;
  session: Session;
};

// Reusable Components
const MenuLink: React.FC<MenuLinkProps> = ({
  href,
  label,
  isActive,
  onClick,
  isUserMenu = false,
}) => (
  <Link
    href={href}
    className={classNames(
      "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium",
      { "bg-gray-900": isActive, "text-gray-900": isUserMenu }
    )}
    onClick={onClick}
  >
    {label}
  </Link>
);

const UserMenu: React.FC<UserMenuProps> = ({
  isOpen,
  toggleMenu,
  ref,
  session,
}) => (
  <div className="relative ml-3" ref={ref}>
    <button
      type="button"
      className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      onClick={toggleMenu}
    >
      <span className="sr-only">Open user menu</span>
      <Image
        className="h-8 w-8 rounded-full"
        src={session?.user?.image || defaultProfile}
        alt="User profile"
        width={240}
        height={240}
        loading="lazy"
      />
    </button>
    {isOpen && (
      <div
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
      >
        <MenuLink
          href="/profile"
          label="Your Profile"
          isActive={false}
          isUserMenu={true}
          onClick={() => {
            toggleMenu();
          }}
        />
        <MenuLink
          href="/properties/saved"
          label="Saved Properties"
          isActive={false}
          isUserMenu={true}
          onClick={() => {
            toggleMenu();
          }}
        />
        <MenuLink
          href="#"
          label="Sign Out"
          isActive={false}
          isUserMenu={true}
          onClick={() => {
            toggleMenu();
            signOut();
          }}
        />
      </div>
    )}
  </div>
);

// Main Navbar Component
const Navbar: React.FC = () => {
  const { width } = useWindowDimensions();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isMobile = width < 768;
  const isActive = (path: string): boolean => pathname === path;
  const isSessionLoading = status === "loading";

  useClickOutside(userMenuRef as RefObject<HTMLElement>, () =>
    setIsUserMenuOpen(false)
  );

  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    // Create an async function inside the useEffect
    const fetchData = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    fetchData(); // Call the async function
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

  const handleSignIn = (providerId: string) => {
    signIn(providerId);
  };

  const isLoggedIn = session && !isSessionLoading;

  return (
    <nav className="bg-blue-700 border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {isMobile && (
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleMobileMenu}
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Logo */}
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Link className="flex flex-shrink-0 items-center" href="/">
              <Image
                className="h-10 w-auto"
                src={logo}
                alt="PropertyPulse"
                loading="lazy"
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                PropertyPulse
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-2">
                <MenuLink href="/" label="Home" isActive={isActive("/")} />
                <MenuLink
                  href="/properties"
                  label="Properties"
                  isActive={isActive("/properties")}
                />
                {isLoggedIn && (
                  <MenuLink
                    href="/properties/add"
                    label="Add Property"
                    isActive={isActive("/properties/add")}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Side Menu */}
          {!session && !isSessionLoading && (
            <div className="hidden md:block md:ml-6">
              {Object.values(providers || {}).map(({ id }) => {
                return (
                  <button
                    className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                    onClick={() => handleSignIn(id)}
                    key={id}
                  >
                    <FaGoogle className="mr-2" />
                    <span>Login or Register</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* User Menu */}
          {isLoggedIn && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              <MessagesCount />
              <UserMenu
                isOpen={isUserMenuOpen}
                toggleMenu={toggleUserMenu}
                ref={userMenuRef}
                session={session}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="space-y-1 px-2 pb-3 pt-2">
          <MenuLink
            href="/"
            label="Home"
            isActive={isActive("/")}
            onClick={toggleMobileMenu}
          />
          <MenuLink
            href="/properties"
            label="Properties"
            isActive={isActive("/properties")}
            onClick={toggleMobileMenu}
          />
          {isLoggedIn && (
            <MenuLink
              href="/properties/add"
              label="Add Property"
              isActive={isActive("/properties/add")}
              onClick={toggleMobileMenu}
            />
          )}
          {!session &&
            !isSessionLoading &&
            Object.values(providers || {}).map(({ id }) => {
              return (
                <button
                  className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-4"
                  key={id}
                  onClick={() => handleSignIn(id)}
                >
                  <FaGoogle className="mr-2" />
                  <span>Login or Register</span>
                </button>
              );
            })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
