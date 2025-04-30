/**
 * @file Footer.js
 * @description Footer component displaying company branding, navigation links, and contact information.
 */
import { Link } from 'react-router-dom';
import {SiFacebook, SiInstagram, SiX} from '@icons-pack/react-simple-icons' 
import icon from '@/assets/logo.png';

/**
 * Footer - Site footer with branding, company links, contact details, and copyright.
 *
 * @component
 * @returns {JSX.Element} The rendered footer section.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-gray-700">
      <div className="mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <Link to='/'>
                <img src={icon} alt='Logo' className="w-36" />
            </Link>
            <p className="text-sm leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold">COMPANY</h3>
            <Link to="/" className="text-sm hover:text-gray-900">Home</Link>
            <Link to="/about" className="text-sm hover:text-gray-900">Collections</Link>
            <Link to="/delivery" className="text-sm hover:text-gray-900">About</Link>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold">Contact</h3>
            <a href="tel:+10000000000" className="text-sm hover:text-gray-900">+1-000-000-0000</a>
            <a href="mailto:e-commerce@gmail.com" className="text-sm hover:text-gray-900">e-commerce@gmail.com</a>
            <div className='flex gap-4'>
              <Link to='https://instagram.com'>
                <SiInstagram />
              </Link>
              <Link to='https://facebook.com'>
                <SiFacebook />
              </Link>
              <Link to='https://x.com'>
                <SiX />
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="text-center text-sm text-gray-500">
          &copy; {currentYear} E-commerce - All Right Reserved.
        </div>
      </div>
    </footer>
  );
}
