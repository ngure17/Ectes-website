"use client";

import {
  MessageCircle,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-16 text-foreground transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Contact Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            GET IN TOUCH WITH US!
          </h2>

          <div className="space-y-2">
            <p className="font-semibold">ECTES LTD</p>
            <p className="text-sm">
              LOCATED INSIDE EASTLANDS COLLEGE OF TECHNOLOGY (ECT)
            </p>
            <p className="text-sm">DONHOLM, NAIROBI, OFF LUNGA LUNGA ROAD</p>

            <p className="text-sm mt-4">
              EMAIL:{" "}
              <a
                href="mailto:ECTES@ECT.AC.KE"
                className="text-amber-600 hover:underline"
              >
                ECTES@ECT.AC.KE
              </a>
            </p>

            <p className="text-red-500 text-sm">
              +254 712 88 40 78 / +254 753 88 77 61
            </p>

            <p className="text-sm">P. O. BOX 86666 - 00200, NAIROBI.</p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center mb-8">
          <p className="mb-6 text-muted-foreground">
            Click on any of the links below to talk to us or follow us on social
            media.
          </p>

          <div className="flex justify-center items-center gap-4 flex-wrap">
            <a
              href="https://api.whatsapp.com/send/?phone=254712884078&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
            </a>

            <a
              href="https://t.me/ECTESKenya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
            >
              <Send className="w-6 h-6" />
            </a>

            <a
              href="https://facebook.com/ecteskenya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>

            <a
              href="https://www.instagram.com/ecteskenya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-lg flex items-center justify-center text-white hover:opacity-90 transition-opacity"
            >
              <Instagram className="w-6 h-6" />
            </a>

            <a
              href="https://x.com/ecteskenya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center text-white hover:bg-sky-600 transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground pt-8 border-t border-border">
          <p>
            © 2026 version-2 - Eastlands College of Technology Enterprise
            Services (ECTES) Ltd
          </p>
        </div>
      </div>
    </footer>
  );
}
