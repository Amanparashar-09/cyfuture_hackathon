import { Link } from "react-router-dom"
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Water Management", href: "#" },
        { name: "Fertilizer Optimization", href: "#" },
        { name: "Analytics", href: "#" },
        { name: "Mobile App", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Partners", href: "#" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "API Reference", href: "#" },
        { name: "Community", href: "#" },
        { name: "Status", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { name: "Facebook", href: "#", icon: <FaFacebook /> },
    { name: "Twitter", href: "#", icon: <FaSquareXTwitter /> },
    { name: "Instagram", href: "#", icon: <BsInstagram /> },
    { name: "LinkedIn", href: "#", icon: <FaYoutube /> },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600">
                    <span className="text-white font-bold">🍃</span>
                </div>
                <span className="text-xl font-bold">AgriOptimize</span>
            </Link>
            <p className="text-gray-400 text-sm">
                Empowering farmers with intelligent tools to optimize resource usage and promote sustainable agricultural
                practices.
            </p>
            <div className="flex space-x-4">
                {socialLinks.map((social) => (
                    <a
                        key={social.name}
                        href={social.href}
                        className="text-gray-400 hover:text-white transition-colors text-3xl"
                        aria-label={social.name}
                    >
                        {social.icon}
                    </a>
                ))}
            </div>
        </div>

        
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith("#") ? (
                      <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                        {link.name}
                      </a>
                    ) : (
                      <Link to={link.href} className="text-gray-400 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {currentYear} AgriOptimize. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
