import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export const metadata = {
  title: "Contact Us - ECTES Ltd",
  description:
    "Get in touch with ECTES Ltd for professional engineering services and training programs",
};

export default function ContactPage() {
  return (
    <main>
      {/* Main section */}
      <Header />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#F4D03F] to-[#f0c030] py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get In Touch With Us
            </h1>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              We&apos;re here to answer your questions and provide professional
              services
            </p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className=" py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-semibold mb-8">
                  Contact Information
                </h2>

                <div className="space-y-6 w-full">
                  {/* Address */}
                  <div>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Our Location
                      </h3>
                      <p className="">
                        Located inside Eastlands College of Technology (ECT)
                        <br />
                        Donholm, Nairobi, Off Lunga Lunga Road
                        <br />
                        P. O. Box 86666 - 00200, Nairobi
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <div>
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Phone Numbers
                      </h3>
                      <p className="">
                        +254 712 88 40 78
                        <br />
                        +254 753 88 77 61
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <div className="w-12 h-12 bg-[#DC5A59] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Email Address
                      </h3>
                      <a
                        href="mailto:ectes@ect.ac.ke"
                        className="text-blue-600 hover:underline"
                      >
                        ectes@ect.ac.ke
                      </a>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div>
                    <div className="w-12 h-12 bg-[#DC5A59] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Business Hours
                      </h3>
                      <p>
                        Monday - Friday: 8:00 AM - 5:00 PM
                        <br />
                        Saturday: 9:00 AM - 2:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="flex flex-col items-center">
                <h2 className="text-3xl font-semibold mb-8 text-center">
                  Find Us Here
                </h2>
                <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.823775868947!2d36.887!3d-1.283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTYnNTguOCJTIDM2wrA1MycxMy4yIkU!5e0!3m2!1sen!2ske!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ECTES Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section>
        <Footer />
      </section>
    </main>
  );
}
