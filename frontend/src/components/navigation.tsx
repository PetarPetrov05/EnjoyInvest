"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrendingUp, Menu, X } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/contexts/auth-context"
import { UserMenu } from "@/components/auth/user-menu"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslation } from 'react-i18next'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, isLoading } = useAuth()
  const { t } = useTranslation()

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Enjoy Invest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              {t('nav.home')}
            </Link>
            <Link href="/offers" className="text-foreground hover:text-primary transition-colors">
              {t('nav.offers')}
            </Link>
            <Link href="/company" className="text-foreground hover:text-primary transition-colors">
              {t('nav.about')}
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              {t('nav.contact')}
            </Link>

            {!isLoading && isAuthenticated && (
              <Link href="/messages" className="text-foreground hover:text-primary transition-colors">
                Messages
              </Link>
            )}

            <LanguageSwitcher />

            {!isLoading && (
              isAuthenticated ? (
                <UserMenu />
              ) : (
                <Button asChild>
                  <Link href="/login">{t('nav.login')}</Link>
                </Button>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link
                href="/offers"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.offers')}
              </Link>
              <Link
                href="/company"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>
              <Link
                href="/contact"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>

              {!isLoading && isAuthenticated && (
                <Link
                  href="/messages"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Messages
                </Link>
              )}

              <LanguageSwitcher />

              {!isLoading && !isAuthenticated && (
                <Button asChild className="w-fit">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    {t('nav.login')}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
