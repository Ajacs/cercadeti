
"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Logo } from "@/components/logo";

const navLinks = [
  { href: "/", label: "Inicio" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavContent = () => (
    <>
      {navLinks.map(link => (
         <Link
            key={link.href}
            href={link.href}
            className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary font-semibold" : "text-muted-foreground"
            )}
            onClick={() => setMobileMenuOpen(false)}
         >
            {link.label}
         </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 max-w-7xl flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
          <Logo className="h-8 w-auto text-primary" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-2xl mx-8">
          {/* Search placeholder */}
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <NavContent />
          <Button asChild variant="default" size="sm" className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500 hover:border-orange-600">
            <Link href="/registro-negocio">
              Registra tu negocio
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 p-4">
                 <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setMobileMenuOpen(false)}>
                  <Logo className="h-8 w-auto text-primary" />
                </Link>

                {/* Mobile Search placeholder */}

                <nav className="flex flex-col gap-4">
                  <NavContent />
                  <Button asChild variant="default" size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-white border-orange-500 hover:border-orange-600">
                    <Link href="/registro-negocio" onClick={() => setMobileMenuOpen(false)}>
                      Registra tu negocio
                    </Link>
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
