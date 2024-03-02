import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="footer p-10 bg-base-300 text-base-content translate-y-24">
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link href="/resources" className="link link-hover">
            Resources
          </Link>
          <Link href="/resources/subjects" className="link link-hover">
            Subjects
          </Link>
          <a
            href="https://www.github.com/imankitkalirawana/autotyper-mac"
            className="link link-hover"
            target="_blank"
          >
            AutoTyper
          </a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a
            href="https://www.divinelydeveloper.me"
            className="link link-hover"
            target="_blank"
          >
            About us
          </a>
          <a href="#contact" className="link link-hover">
            Contact
          </a>
          <a
            href="https://www.divinelydeveloper.me"
            className="link link-hover"
            target="_blank"
          >
            Portfolio
          </a>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <a
            href="https://github.com/imankitkalirawana"
            className="link link-hover"
            target="_blank"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/bhuneshvar"
            className="link link-hover"
            target="_blank"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/divinelydevs"
            className="link link-hover"
            target="_blank"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com/divinelydeveloper"
            className="link link-hover"
            target="_blank"
          >
            Instagram
          </a>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
