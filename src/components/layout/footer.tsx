'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Footer = () => {
  return (
    <footer className="w-full bg-[#1C1F26] border-t border-gray-800">
      <div className="container px-4 py-12 mx-auto">
        {/* Help Section */}
        <Card className="p-8 mb-12 bg-[#232731] border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-white">Need Help?</h3>
              <p className="text-gray-400">Check our FAQ or contact our 24/7 support team</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-gray-700 hover:bg-gray-800 text-gray-300" asChild>
                <Link href="/help">FAQ & Help Center</Link>
              </Button>
              <Button size="lg" className="w-full sm:w-auto bg-[#4CAF50] hover:bg-[#45a049] text-white" asChild>
                <Link href="/support">Contact Support</Link>
              </Button>
            </div>
          </div>
        </Card>

        {/* Mobile App Section */}
        <Card className="p-8 mb-12 bg-[#232731] border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-white">Get Our Mobile App</h3>
              <p className="text-gray-400">Exchange currencies on the go with our mobile apps</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link 
                href="https://apps.apple.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] rounded-lg"
              >
                <div className="relative w-[120px] h-[40px]">
                  <Image
                    src="/app-store-badge.svg"
                    alt="Download on App Store"
                    fill
                    className="object-contain rounded-lg"
                    priority
                  />
                </div>
              </Link>
              <Link 
                href="https://play.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] rounded-lg"
              >
                <div className="relative w-[135px] h-[40px]">
                  <Image
                    src="/play-store-badge.svg"
                    alt="Get it on Google Play"
                    fill
                    className="object-contain rounded-lg"
                    priority
                  />
                </div>
              </Link>
            </div>
          </div>
        </Card>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mb-12">
          {/* For You */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">For You</h4>
            <ul className="space-y-3">
              <li><Link href="/trades?tradeType=buy&assetType=EUR" className="text-gray-400 hover:text-[#4CAF50] transition-colors">Buy EUR</Link></li>
              <li><Link href="/trades?tradeType=sell&assetType=EUR" className="text-gray-400 hover:text-[#4CAF50] transition-colors">Sell EUR</Link></li>
              <li><Link href="/trades?tradeType=buy&assetType=USD" className="text-gray-400 hover:text-[#4CAF50] transition-colors">Buy USD</Link></li>
              <li><Link href="/trades?tradeType=sell&assetType=USD" className="text-gray-400 hover:text-[#4CAF50] transition-colors">Sell USD</Link></li>
              <li><Link href="/trades?tradeType=buy&assetType=GBP" className="text-gray-400 hover:text-[#4CAF50] transition-colors">Buy GBP</Link></li>
              <li><Link href="/trades?tradeType=sell&assetType=GBP" className="text-gray-400 hover:text-[#4CAF50] transition-colors">Sell GBP</Link></li>
            </ul>
          </div>

          {/* For Your Business */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">For Your Business</h4>
            <ul className="space-y-3">
              <li><Link href="/business/payment-solutions" className="text-gray-400 hover:text-[#4CAF50] transition-colors">Payment Solutions</Link></li>
              <li><Link href="/business/virtual-kiosk" className="text-gray-400 hover:text-[#4CAF50] transition-colors">Virtual Exchange Kiosk</Link></li>
              <li><Link href="/api" className="text-gray-400 hover:text-[#4CAF50] transition-colors">API Documentation</Link></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Useful Links</h4>
            <ul className="space-y-3">
              <li><Link href="/calculator" className="text-gray-400 hover:text-[#4CAF50] transition-colors">Currency Calculator</Link></li>
              <li><Link href="/market-prices" className="text-gray-400 hover:text-[#4CAF50] transition-colors">P2P Market Prices</Link></li>
              <li><Link href="/rewards" className="text-gray-400 hover:text-[#4CAF50] transition-colors">Rewards Program</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">About</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-[#4CAF50] transition-colors">About Us</Link></li>
              <li><Link href="/business-contacts" className="text-gray-400 hover:text-[#4CAF50] transition-colors">Business Contacts</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-[#4CAF50] transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-[#4CAF50] transition-colors">Blog</Link></li>
              <li><Link href="/reviews" className="text-gray-400 hover:text-[#4CAF50] transition-colors">Reviews</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-12">
          {['x', 'linkedin', 'instagram', 'facebook', 'youtube', 'medium'].map((platform) => (
            <Link 
              key={platform}
              href={`https://${platform}.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#4CAF50] transition-transform hover:scale-110"
            >
              <Image
                src={`/icons/${platform}.svg`}
                alt={`${platform} icon`}
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </Link>
          ))}
        </div>

        <div className="border-t pt-8">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400 mb-6">
            <Link href="/terms" className="hover:text-[#4CAF50] transition-colors">Terms & Conditions</Link>
            <Link href="/vendor-terms" className="hover:text-[#4CAF50] transition-colors">Vendor Terms</Link>
            <Link href="/aml-policy" className="hover:text-[#4CAF50] transition-colors">AML Policy</Link>
            <Link href="/privacy" className="hover:text-[#4CAF50] transition-colors">Privacy Policy</Link>
            <Link href="/cookie-policy" className="hover:text-[#4CAF50] transition-colors">Cookie Policy</Link>
            <Link href="/restricted-countries" className="hover:text-[#4CAF50] transition-colors">Restricted Countries</Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-center text-gray-400">
            <p className="mb-3"> {new Date().getFullYear()} Your P2P Exchange. All rights reserved.</p>
            <p className="max-w-2xl mx-auto">
              Trading currencies carries a high level of risk and may not be suitable for all investors.
              Please ensure that you fully understand the risks involved before trading.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
