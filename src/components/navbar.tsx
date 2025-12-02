'use client';

import { ChevronDown, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { PrivateAlphaModal } from '@/app/(logged-out)/home/components/private-alpha-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

type NavbarProps = {
  variant?: 'standard';
  showNavigation?: boolean;
  className?: string;
};

const solutions = [
  {
    title: 'Kosuke Platform',
    href: '/solutions/kosuke-platform',
  },
  {
    title: 'Kosuke Engineers',
    href: '/solutions/ship-with-engineers',
  },
  {
    title: 'Kosuke for Teams',
    href: '/solutions/enabling-collaboration',
  },
];

export default function Navbar({
  variant = 'standard',
  showNavigation = false,
  className,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  // Standard navbar for most pages
  if (variant === 'standard') {
    return (
      <>
        <div className="w-full border-b border-border relative z-50">
          <header className={cn('bg-background w-full h-14', className)}>
            <div className="w-full h-full px-6 sm:px-8 md:px-16 lg:px-24 flex justify-between items-center max-w-screen-2xl mx-auto">
              <Link
                href="/"
                className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
              >
                <Image
                  src="/logo-dark.svg"
                  alt="Kosuke"
                  width={24}
                  height={24}
                  className="block dark:hidden"
                  priority
                />
                <Image
                  src="/logo.svg"
                  alt="Kosuke"
                  width={24}
                  height={24}
                  className="hidden dark:block"
                  priority
                />
                <span className="ml-2 text-xl text-foreground">Kosuke</span>
              </Link>

              {/* Desktop Navigation */}
              {showNavigation && (
                <div className="hidden min-[900px]:flex items-center gap-2">
                  {/* Solutions Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Solutions
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {solutions.map(solution => (
                        <DropdownMenuItem key={solution.href} asChild>
                          <Link href={solution.href} className="cursor-pointer">
                            {solution.title}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Link href="/pricing">
                    <Button variant="ghost" size="sm">
                      Pricing
                    </Button>
                  </Link>

                  <Link href="/blog">
                    <Button variant="ghost" size="sm">
                      Blog
                    </Button>
                  </Link>

                  <a
                    href="https://links.kosuke.ai/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="sm">
                      Contact Us
                    </Button>
                  </a>

                  <Button size="sm" onClick={() => setModalOpen(true)}>
                    Get Started
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              {showNavigation && (
                <div className="min-[900px]:hidden">
                  <Sheet
                    open={mobileMenuOpen}
                    onOpenChange={open => {
                      setMobileMenuOpen(open);
                      if (!open) setSolutionsOpen(false);
                    }}
                  >
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                        <Menu className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full sm:w-[400px] p-0">
                      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                      <SheetDescription className="sr-only">
                        Access navigation links and get started with Kosuke
                      </SheetDescription>
                      <div className="flex flex-col h-full px-6 pt-20 pb-8">
                        <nav className="flex flex-col gap-8">
                          {/* Solutions Section */}
                          <div className="flex flex-col gap-3">
                            <button
                              onClick={() => setSolutionsOpen(!solutionsOpen)}
                              className="flex items-center justify-between text-2xl font-medium tracking-tight text-foreground transition-colors hover:text-muted-foreground text-left"
                            >
                              Solutions
                              <ChevronDown
                                className={cn(
                                  'h-5 w-5 transition-transform duration-200',
                                  solutionsOpen && 'rotate-180'
                                )}
                              />
                            </button>
                            {solutionsOpen && (
                              <div className="flex flex-col gap-2 pl-4 border-l border-border">
                                {solutions.map(solution => (
                                  <Link
                                    key={solution.href}
                                    href={solution.href}
                                    onClick={() => {
                                      setSolutionsOpen(false);
                                      setMobileMenuOpen(false);
                                    }}
                                    className="text-base font-normal text-muted-foreground transition-colors hover:text-foreground"
                                  >
                                    {solution.title}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          <Link
                            href="/pricing"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-2xl font-medium tracking-tight transition-colors hover:text-muted-foreground"
                          >
                            Pricing
                          </Link>

                          <Link
                            href="/blog"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-2xl font-medium tracking-tight transition-colors hover:text-muted-foreground"
                          >
                            Blog
                          </Link>

                          <a
                            href="https://links.kosuke.ai/contact"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl font-medium tracking-tight transition-colors hover:text-muted-foreground"
                          >
                            Contact Us
                          </a>
                        </nav>

                        {/* Bottom CTA */}
                        <div className="mt-auto pt-8">
                          <Button
                            className="w-full"
                            size="lg"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setModalOpen(true);
                            }}
                          >
                            Get Started
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              )}
            </div>
          </header>
        </div>

        {/* Private Alpha Modal */}
        {showNavigation && <PrivateAlphaModal open={modalOpen} onOpenChange={setModalOpen} />}
      </>
    );
  }

  return null;
}
