// Footer.js
import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'react-feather'; // Make sure you have these icons installed

const Footer = () => {
  return (
    <MDBFooter bgColor='secondary' className='text-white text-center text-lg-left'>
      <MDBContainer className='p-4'>
        <MDBRow className="mb-4">
          <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>S2S</h5>
            <p className='text-left'>
            Uncover the power of S2S a world of expertise and opportunities designed to inspire and elevate you. <br />
            Share your knowledge, connect with a dynamic community, and stay at the cutting edge of collaboration. <br />
             
              
            </p>
          </MDBCol>
          <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase mb-0'>Contact Us</h5>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail size={20} className="text-blue-500" />
                <span>contact@s2s.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={20} className="text-blue-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={20} className="text-blue-500" />
                <span>123 Innovation Street, Tech City</span>
              </div>
            </div>
          </MDBCol>
          <MDBCol lg='3' md='6' className='mb-4 mb-md-0 flex justify-center md:justify-end'>
            <div className="space-y-4 md:space-y-0">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4 justify-center md:justify-end">
                <a href="#" className="hover:text-blue-500 transition">
                  <Facebook size={24} />
                </a>
                <a href="#" className="hover:text-blue-500 transition">
                  <Twitter size={24} />
                </a>
                <a href="#" className="hover:text-blue-500 transition">
                  <Instagram size={24} />
                </a>
                <a href="#" className="hover:text-blue-500 transition">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </MDBCol>
        </MDBRow>

        {/* Footer Bottom: "© Innoverse" */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} S2S. All Rights Reserved.
          </p>
        </div>
      </MDBContainer>
    </MDBFooter>
  );
};

export default Footer;
