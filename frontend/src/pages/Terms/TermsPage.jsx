import PageLayout from '../../components/layout/PageLayout';
import Container from '../../components/ui/Container';

const termsSections = [
  {
    id: 'acceptance',
    title: '1. Acceptance & Eligibility',
    paragraphs: [
      'By downloading, installing, accessing, or using the Acecore Powercore App in any manner, you agree to be legally bound by these Terms of Service and all policies incorporated herein by reference.',
      'If you do not agree to these Terms in their entirety, you must immediately cease all use of the App and delete it from your device.',
      'You must be at least 18 years old, or the age of legal majority in your jurisdiction, to register an account or use our Services. We reserve the right to suspend or terminate access for accounts found to violate this requirement without notice or liability.',
      'If you are using the App on behalf of a company, organization, or legal entity, you represent that you have authority to bind that entity to these Terms.',
    ],
  },
  {
    id: 'services',
    title: '2. Description of Services',
    paragraphs: [
      'The Acecore Powercore App provides digital services including but not limited to energy management dashboards, real-time power systems monitoring, battery status and health tracking, solar performance analytics, system alerts, firmware update management, and related clean-energy product integrations.',
      'The App functions in conjunction with Acecore Powercell hardware products manufactured and supplied by Acecore Incorporations. We reserve the right to modify, suspend, or discontinue any feature or aspect of the App or Services at any time and without prior notice.',
    ],
  },
  {
    id: 'compliance',
    title: '3. SON Compliance & Regulatory Disclosures',
    paragraphs: [
      'Acecore Incorporations operates in compliance with the Standards Organisation of Nigeria Act 2015 and applicable product standards enforced by SON. All Acecore Powercell hardware products associated with this App are subject to mandatory SON conformity assessment and certification requirements before placement on the Nigerian market.',
      'Only SON-certified Acecore Powercell hardware units are supported and covered under any applicable warranty or liability provisions. The use of counterfeit, uncertified, or unauthorized third-party hardware in conjunction with this App is strictly prohibited and voids all warranties and indemnities.',
      'Acecore Incorporations reserves the right to cooperate fully with SON, NERC, or any other regulatory authority exercising jurisdiction over our products or services. Users must not modify, tamper with, or bypass any hardware feature integral to SON compliance.',
    ],
    list: [
      'Use Acecore Powercell hardware only within the operational parameters and environment specified in product documentation and installation manuals.',
      'Promptly report defects, safety incidents, or malfunctions through support@acecore.tech.',
      'Do not tamper with SON certification marks, serial numbers, or compliance labels.',
      'Comply with all applicable electrical installation regulations in your state or local government area.',
    ],
  },
  {
    id: 'account',
    title: '4. Account Registration & Security',
    paragraphs: [
      'To access certain features of the App, you must register for an account. You agree to provide accurate, current, and complete information during registration and promptly update it if it changes.',
      'You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account, whether or not authorized by you.',
      'We reserve the right to disable any account at any time, with or without notice, if we reasonably believe the account security has been compromised or these Terms have been violated.',
    ],
    list: [
      'Never share your login credentials with any third party.',
      'Notify us immediately if you become aware of any unauthorized use or security breach.',
      'Log out of your account at the end of each session, especially on shared or public devices.',
    ],
  },
  {
    id: 'safety',
    title: '5. Hardware Connectivity, Compatibility & Safety',
    paragraphs: [
      'The App is designed to operate exclusively with Acecore Powercell hardware carrying valid SON certification and supplied through authorized Acecore distribution channels. Use with unsupported, counterfeit, or third-party hardware is at the user’s sole risk.',
      'Acecore Incorporations is not responsible for hardware malfunctions, physical defects, electrical failures, telemetry errors, or consequential damage arising from improper installation, misuse, unauthorized modification, weak connectivity, power surges, or network instability.',
      'Acecore Powercell hardware involves high-voltage electrical systems. Installation must be performed by a qualified and licensed electrician in accordance with the Nigerian Electrical Code and applicable local regulations. Acecore Incorporations disclaims liability for injury, death, or property damage caused by improper or non-compliant installation.',
      'Unauthorized modification, rooting, jailbreaking, tampering with the App or connected hardware voids warranties and may constitute an offence under applicable regulations. We reserve the right to terminate App access if such modifications are detected.',
    ],
  },
  {
    id: 'ip',
    title: '6. Intellectual Property Rights',
    paragraphs: [
      'All content, software, source code, object code, firmware, designs, graphics, trademarks, service marks, trade dress, logos, and features of the App and Services are the exclusive property of Acecore Incorporations and/or its licensors.',
      'Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the App on a personal device you own or control, solely for personal or internal business use in connection with Acecore Powercell hardware.',
      'You agree not to copy, reproduce, redistribute, reverse engineer, decompile, create derivative works, or use our trademarks without prior written permission. You also agree not to remove, obscure, or alter proprietary notices embedded in the App.',
    ],
  },
  {
    id: 'conduct',
    title: '7. User Conduct & Prohibited Activities',
    paragraphs: [
      'You agree to use the App only for lawful purposes and in a manner that does not infringe the rights of others or compromise public safety. The following activities are strictly prohibited:',
    ],
    list: [
      'Using the App for any purpose that violates applicable Nigerian laws, regulations, or international legal obligations.',
      'Attempting to gain unauthorized access to our servers, databases, connected hardware, or other users’ accounts.',
      'Transmitting or distributing viruses, malware, ransomware, spyware, or other destructive code.',
      'Decompiling, reverse engineering, or tampering with the App, firmware, or backend infrastructure.',
      'Using bots, scrapers, crawlers, or any automated tools to extract or monitor App data without authorization.',
      'Engaging in any activity that overloads, disables, or impairs the App’s servers or network infrastructure.',
    ],
  },
];

export default function TermsPage() {
  return (
    <PageLayout>
      <section className="terms-page">
        <Container className="terms-page__shell">
          <header className="terms-page__header">
            <p className="terms-page__eyebrow">Legal</p>
            <h1 className="terms-page__title">Terms of Service</h1>
            <div className="terms-page__meta-wrap">
              <p>Effective Date: September 10, 2026</p>
              <p>Last Updated: September 10, 2026</p>
            </div>
          </header>

          <div className="terms-page__notice">
            <strong>Important:</strong> By using the Acecore Powercore App, you agree to be
            legally bound by these terms and all incorporated policies.
          </div>

          <div className="terms-page__content">
            {termsSections.map((section) => (
              <article key={section.id} className="terms-page__section">
                <h2 className="terms-page__section-title">{section.title}</h2>

                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="terms-page__paragraph">
                    {paragraph}
                  </p>
                ))}

                {section.list ? (
                  <ul className="terms-page__list">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
