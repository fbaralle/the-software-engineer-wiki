// Theme config: navbar and footer used by docs layout
import { Footer, Navbar } from 'nextra-theme-docs'

export const navbar = (
  <Navbar
    logo={<span className="font-semibold">Software Engineering Wiki</span>}
    projectLink="https://github.com"
  />
)

export const footer = (
  <Footer>
    MIT {new Date().getFullYear()} — Software Engineering Wiki. Built with{' '}
    <a href="https://nextra.site" target="_blank" rel="noopener noreferrer">
      Nextra
    </a>
    .
  </Footer>
)
