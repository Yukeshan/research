import React from 'react'
import { FaDribbble, FaFacebook, FaFacebookF, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white rounded-md">
  <div className="mx-auto max-w-screen-xl space-y-8 px-4 pb-10 pt-16 sm:px-6 lg:space-y-14 lg:px-8">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div>
        <div className="text-teal-600">
            <img src="/logo.png" alt="" />
        </div>

        <p className="mt-4 max-w-xs text-gray-500">
          Cook It is a game changing intelligent cooking recipe application which enhace the cooking experience of beginners and make cooking more enjoyable.
        </p>

        <ul className="mt-8 flex gap-6">
          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-btnColor transition hover:opacity-75"
            >
              <span className="sr-only">Facebook</span>

              <FaFacebook className="h-6 w-6" />
            </a>
          </li>

          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-btnColor transition hover:opacity-75"
            >
              <span className="sr-only">Instagram</span>

              <FaInstagram className="h-6 w-6" />
            </a>
          </li>

          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-btnColor transition hover:opacity-75"
            >
              <span className="sr-only">Twitter</span>

              <FaTwitter className="h-6 w-6" />
            </a>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
        <div>
          <p className="font-medium text-gray-900">Explore</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75"> Recipes </a>
            </li>
            

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75"> About </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75"> Contact </a>
            </li>


          </ul>
        </div>

        <div>
          <p className="font-medium text-gray-900">Features</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75"> Freshness Detection</a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75"> Voice Assistant </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75"> Reverse Recipe Search </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-medium text-gray-900">Helpful Links</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75"> Contact </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75"> FAQs </a>
            </li>

          </ul>
        </div>

        <div>
          <p className="font-medium text-gray-900">Legal</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75"> Accessibility </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75"> Terms and Conditions </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75"> User Policy </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75"> Privacy Policy </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <hr />
    <p className="text-xs text-gray-500 text-center">&copy; 2025. Yukeshan Yoganathan. All rights reserved.</p>
  </div>
</footer>
  )
}

export default Footer