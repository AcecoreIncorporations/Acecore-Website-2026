import { Link } from 'react-router-dom';
import logoWhite from '../../assets/logos/acecore-white.svg';
import facebookIcon from '../../assets/logos/facebook.svg';
import instagramIcon from '../../assets/logos/instagram.svg';
import linkedinIcon from '../../assets/logos/linkedin.svg';
import twitterIcon from '../../assets/logos/x-twitter.svg';
import { footerGroups, footerMeta } from '../../data/footer';

const socialIcons = {
  x: twitterIcon,
  instagram: instagramIcon,
  linkedin: linkedinIcon,
  facebook: facebookIcon,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <Link to="/" className="footer__brand" aria-label="Acecore home">
            <img src={logoWhite} alt="Acecore" className="footer__logo" />
          </Link>

          <nav className="footer__nav" aria-label="Footer">
            {footerGroups.map((group) => (
              <div key={group.title} className="footer__group">
                <h2 className="footer__title">{group.title}</h2>
                <ul className="footer__links">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.to ? (
                        <Link to={link.to}>{link.label}</Link>
                      ) : link.href ? (
                        <a
                          href={link.href}
                          {...(String(link.href).endsWith('.pdf')
                            ? {
                                download: true,
                                target: '_blank',
                                rel: 'noopener noreferrer',
                              }
                            : {})}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <span aria-disabled="true">{link.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <p className="footer__legal">
            {footerMeta.legal.map((item, index) => (
              <span key={item.label} className="footer__legal-item">
                {index > 0 ? <span className="footer__legal-sep">|</span> : null}
                <Link to={item.to}>{item.label}</Link>
              </span>
            ))}
          </p>

          <div className="footer__meta-right">
            <p className="footer__copyright">
              Acecore {year}; All Rights Reserved
            </p>
            <ul className="footer__social">
              {footerMeta.social.map((item) => (
                <li key={item.id}>
                  {item.href ? (
                    <a
                      className="footer__social-link"
                      href={item.href}
                      aria-label={item.label}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={socialIcons[item.id]} alt="" />
                    </a>
                  ) : (
                    <span className="footer__social-link" aria-label={`${item.label} link unavailable`}>
                      <img src={socialIcons[item.id]} alt="" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
