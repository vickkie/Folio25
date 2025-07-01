import React, { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import NavBar from "../Navbar/NavBar";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import termsDefinitions from "../../assets/json/termsDefinitions.json";
import { Link } from "react-router-dom";
const companyName = import.meta.env.VITE_COMPANY_NAME;
import "./css/extras.css";

export default function Privacy() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function for the scroll
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div>
      <NavBar />
      <Menu />
      <div className="policyPage">
        <div className="HeroPrivacy">
          <div className="error-text">
            <div>PRIVACY POLICY</div>
          </div>
        </div>
        <div className="policyDetails">
          <div className="policySuperheader">
            This Data Collection and Processing Policy, or Privacy Policy (hereafter referred to as the “Policy”)
            explains how the Company collects information about You, how it is used, kept, and disclosed when You visit
            the Website.
          </div>
          <div className="subSection2">
            You hereby consent to the Processing of Your Personal Data and confirm that You have been informed of the
            procedure, purpose, and other terms of their processing in accordance with the EU Regulation No. 2016/678 of
            26.04.2016, the California State Consumer Privacy Act of 2018. (CCPA), California Online Privacy Protection
            Act of 2003 (CalOPPA) and other applicable regulations.
          </div>
          <div className="subSection2">
            By providing any of the information about Yourself via the relevant form on the Website,, You agree to Our
            Policy and give the Company permission to collect, use, and disclose information about You for the purposes
            outlined below.
          </div>
          <div className="subSection2">
            By continuing to use our Website, You acknowledge that You have the legal ability to consent to this Policy
            and to the Processing of Your Personal Data under these conditions in accordance with the laws of United
            states and Your personal applicable jurisdiction.
          </div>
          <div className="subSection2">
            We reserve the right to make changes to this Policy at any time. We will notify You of any changes by
            changing the date at the top of this text. When using the Website, We encourage You to read the Policy to
            keep informed about the methods and ways We protect Your privacy.
          </div>
          <div className="subSection2midHeader">Definitions</div>
          <div className="subSection2">
            <p>The following terms have the meanings specified below for the purposes of the Policy:</p>
            {termsDefinitions.map((definition, index) => (
              <div key={index} className="subSection2">
                <span className="heavy">“{definition.term}”</span> - {definition.definition}
              </div>
            ))}
          </div>
          <div className="subSection2midHeader">User’s rights</div>
          <div className="subSection2">
            Each individual's personal non-proprietary rights regarding Personal Data are inalienable and inviolable.
          </div>
          <div className="subSection2">The User has the following rights:</div>
          <div className="subSection2">
            - Access to Your Personal Data, as well as confirmation from the Company of the Processing of Your Personal
            Data and the status of their storage;
          </div>
          <div className="subSection2">
            - If You believe that Your fundamental rights to privacy and Data protection outweigh Our legitimate
            interest in continuing the Processing, You may withdraw Your consent. We may keep an anonymous record of the
            User's activities (except for Personal Data). The Company deletes all information it has about the User
            within 30 (thirty) days of receiving Your request for deletion of information. Please contact Us
          </div>
          <div className="subSection2">
            - Changing Your Personal Information If there is an error, it has lost its relevance, or Your Personal Data
            has been deleted as a result of the completion of the purpose for which Data has been collected.
          </div>
          <div className="subSection2">
            - Request for information about the User that the Company has on file. The Company may take up to 30
            (thirty) days to process a request, but We always make every effort to respond as soon as it is practically
            possible.
          </div>
          <div className="subSection2">
            - Obtaining a copy of the User's Personal Data in a structured, machine-readable, and widely used format.
          </div>
          <div className="subSection2midHeader">Data We collect</div>
          <div className="subSection2">
            We collect information and Personal Information from Users directly when they register on the Website in
            sections such as “Sign up” or "Contact us" as well as when they browse Our Website. We collect Personal Data
            only when You fill out the form in the above sections of the Website and with Your permission, the rest of
            the Data We collect is mostly Usage Data.
          </div>
          <div className="subSection2midHeader">Personal Data that You provide to Us</div>
          <div className="subSection2">
            When You fill out a signup form Personal Data is collected. You can also provide Us with Personal Data at
            Your discretion via social networks or support Services
          </div>
          <div className="subSection2">We may collect the following Personal Data from You:</div>
          <div className="subSection2">- Name</div>
          <div className="subSection2">- Email</div>
          <div className="subSection2">- Phone Number</div>
          <div className="subSection2">
            All Personal Data requested by is required for quality communication with You; failure to provide it may
            impede the Company's ability to provide Services or make them impossible to provide.
          </div>
          <div className="subSection2midHeader">Automatically-collected information</div>
          <div className="subSection2">
            In addition to the Personal Data You provide, We automatically collect certain information about You
            (including Personal Data). We collect Usage Data from Users directly while they browse the Website. Usage
            Data assists Us in ensuring the Website's smooth operation and improving the performance of the Services.
          </div>
          <div className="subSection2">
            When Users access or use Our Website, We collect Usage Data, which includes:
          </div>
          <div className="subSection2">- Browser type;</div>
          <div className="subSection2">- Browser version;</div>
          <div className="subSection2">- The type of device You are using;</div>
          <div className="subSection2">- Pages of Our Website that You have visited;</div>
          <div className="subSection2">- Your visit to the Website at what time and on what date;</div>
          <div className="subSection2">- The time You spent on these pages of the Website;</div>
          <div className="subSection2">- Unique device identifiers;</div>
          <div className="subSection2">- IP Address (can be collected as Personal Data as well);</div>
          <div className="subSection2">- Geolocation Data (can be collected as Personal Data as well);</div>
          <div className="subSection2">- Other diagnostic Data.</div>
          <div className="subSection2midHeader">Cookies Policy</div>
          <div className="subSection2">
            The Website has the ability to generate objects and store them on the User's device. To set up and improve
            User interaction, We use Cookies to collect certain Usage Data, such as pages visited and Services used on
            Our Website.
          </div>
          <div className="subSection2">
            Session Cookies are typically stored and used to interact with Our Service. Session Cookies save the
            information entered by the User and track the User's movement on the Website.
          </div>
          <div className="subSection2">The Data received by session Cookies is stored for one (one) calendar year.</div>
          <div className="subSection2">
            Cookies and other tracking technologies are used on this Website for the following purposes:
          </div>
          <div className="subSection2">- Obtaining standard web analytics Data;</div>
          <div className="subSection2">
            - Obtain Data collected through the use of HTML Cookies, Flash Cookies, web beacons, and other similar
            technologies;
          </div>
          <div className="subSection2">
            - Obtain demographic information and other details to assist Us in customizing the Website to Your
            preferences;
          </div>
          <div className="subSection2">
            We may share this information with partners who help Us restore, manage, or maintain Our Website (third
            parties). By clearing Your browser's browsing history, You can delete all Cookies that are already on
          </div>
          <div className="subSection2">
            Your device. You can set Your browser to prevent Cookies from being placed on Your device, but You may need
            to do so manually each time You visit the Website. If You live in the EU or are an EU citizen, You must
            comply with the provisions of the European Commission's General Data Protection Regulation if You agree to
            the use of Cookies based on a message posted on Our Website according to the art. 6 (1) (a) on the General
            Data Protection Regulation of the European Commission.
          </div>
          <div className="subSection2">
            When you visit or log in to our website, cookies and similar technologies may be used by our online data
            partners or vendors to associate these activities with other personal information they or others have about
            you, including by association with your email or home address.
          </div>
          <div className="subSection2">
            We (or service providers on our behalf) may then send communications and marketing to these email or home
            addresses. You may opt out of receiving this advertising by visiting https://app.retention.com/optout
          </div>
          <div className="subSection2midHeader" id="legal">
            Legal basis of Personal Data Processing
          </div>
          <div className="subSection2">
            We process Your Personal Data in accordance with the following legal grounds:
          </div>

          <div className="subSection2">
            With Your personal permission for one or more of the following purposes (listed below);
          </div>
          <div className="subSection2">
            As necessary for Our legitimate interests in providing the Services, provided that such interests do not
            outweigh Your fundamental rights and freedoms in terms of Data confidentiality;
          </div>
          <div className="subSection2">
            Data Processing is associated with a task carried out in the public interest or in the exercise of state
            authority.
          </div>

          <div className="subSection2">
            You have expressly agreed to the Processing of Your Personal Data for a specific purpose. If You wish to
            withdraw Your consent to the Processing of Personal Data, please contact Us
          </div>
          <div className="subSection2midHeader">Terms of Data storage</div>

          <div className="subSection2">
            We will only keep Your Personal Information for as long as it is required for the purposes outlined in this
            Policy. We will only store and use Your Personal Data to the extent required to comply with Our legal
            obligations (for example, if We are required to keep Your Data in accordance with applicable laws), resolve
            disputes, enforce Our legal agreements, and follow the rules of this Policy.
          </div>
          <div className="subSection2">
            Personal Data is processed and stored for the duration necessary for the purpose for which it was collected.
          </div>
          <div className="subSection2">
            We also keep Usage Data for internal use. Usage Data is typically kept for a shorter period of time than
            Personal Data, unless it is used to improve the security or functionality of Our Service, or We are legally
            required to keep this Data for a longer period of time.
          </div>
          <div className="subSection2">
            Usage Data must be processed and stored for as long as the purpose for which it was collected requires, but
            no longer than 6 years from the date of the last use, unless the purpose of Data Processing requires
            otherwise.
          </div>
          <div className="subSection2midHeader">Security statement</div>
          <div className="subSection2">
            We make sure that your personal data and transactions are secure by taking the following measures:
          </div>
          <div className="subSection2">
            Your password and login ID are unique, and passwords are hashed so that even our staff cannot read them. As
            such, we cannot retrieve your password if you cannot recall it. Instead, we will send you a link to set a
            new password yourself.
          </div>
          <div className="subSection2">
            All credit card details are submitted directly to the Visa/Mastercard network using the latest SSL
            encryption technology in accordance with bank policies.
          </div>
          <div className="subSection2">
            Access to your personal data is strictly prohibited for all our staff, with the exception of key our
            personnel only in circumstances where this is required for the proper performance of their duties.
          </div>
          <div className="subSection2">
            Our information security policies are based on industry best practices in access control and business
            continuity
          </div>
          <div className="subSection2">
            On a best-effort basis, we try to verify your identity and implement measures to detect fraud to help
            protect you from unauthorised access to your account. We also monitor account activity for signs of unusual
            activity that might indicate fraud. We work with the collection and law-enforcement agencies in case of
            fraud issues.
          </div>
          <div className="subSection2">
            It is your responsibility to maintain the security of your login details, any linked email address, and any
            personal computer or device on which your account is accessible (for example, by password protection and
            screen locking). We shall not be held responsible for any unauthorised use of your account when we are not
            at fault.
          </div>
          <div className="subSection2">
            Whether you use a shared device or your own device in a public place, either offline or on public WiFi,
            doing so might put the information that you enter or receive in danger of being captured. To protect your
            data in such cases, it is solely your responsibility to take the following precautions and educate yourself
            on other security measures you can take
          </div>
          <div className="subSection2">- Do not leave your device unattended.</div>
          <div className="subSection2">- Do not save your login credentials on a shared device.</div>
          <div className="subSection2">- Always log out of account-based websites at the end of the session.</div>
          <div className="subSection2">
            - You must notify us immediately if you become aware that your login details have been lost, stolen, or
            otherwise disclosed to third parties..
          </div>

          <div className="subSection2midHeader">Cross Border Data Transfer</div>
          <div className="subSection2">
            Cross Border Data Transfer may occur if the transfer is required for the conclusion or performance of a
            contract between the Controller and a Third Party, and only when it is in the data subject's best interests.
          </div>
          <div className="subSection2">Personal Data can be transferred to</div>
          <div className="subSection2">
            - The country whose legal system is deemed by the European Commission to provide “an adequate level of
            Personal Data protection”.
          </div>
          <div className="subSection2">
            Although the majority of the provisions of this Policy apply to all Users, some provisions only apply
            directly if Personal Data Processing is governed by broader standards of protection.
          </div>
          <div className="subSection2">
            If any of the following conditions are met, the following broader standards of protection apply to
            Processing:
          </div>
          <div className="subSection2">- Performed within the EU by the Owner;</div>
          <div className="subSection2">
            - Refers to the Personal Data of Users in the EU and allows the Owner to control the behavior of such Users
            in the EU.
          </div>
          <div className="subSection2">
            This applies to Personal Data of Users in the United States. The California Consumer Privacy Act 2018 (CCPA)
            can be found at
            <Link to={`https://eur-lex.europa.eu/eli/reg/2016/679/oj`}>
              https://eur-lex.europa.eu/eli/reg/2016/679/oj
            </Link>
          </div>
          <div className="subSection2">
            All other users (third countries) around the world are subject to domestic data protection laws.
          </div>
          <div className="subSection2midHeader">Disclosure of Personal Data</div>

          <div className="subSection2">
            Any information We collect or that You provide to Us may be transmitted and processed by any of the
            Company's entities. We do not sell or transfer Your Personal Information to third parties for commercial
            purposes. However, if necessary, We may transfer Personal Data to the following Third Parties:
          </div>
          <div className="subSection2">- Our professional consultants and hosting providers</div>
          <div className="subSection2">- State and controlling bodies</div>
          <div className="subSection2">- Third parties who are Processors. </div>
          <div className="subSection2">
            Furthermore, in the following circumstances, We may disclose Personal Data to Third Parties:
          </div>
          <div className="subSection2">
            - If required by law (for example: law enforcement agencies, courts and other government agencies);
          </div>
          <div className="subSection2">- To protect the Company's rights;</div>
          <div className="subSection2">
            - To share, summarize, or de-identify information with Third Parties for research, marketing, analytics, or
            other purposes if the information does not identify a specific person.
          </div>
          <div className="subSection2">
            We also do our best to protect user information offline. All of our users' personal information is
            restricted to our offices. Only employees who need to see the information to perform their jobs are allowed
            to access it.
          </div>
          <div className="subSection2">
            We use Transport Layer Security (TLS) encryption technology in order to protect certain information that you
            submit to us. This technology protects you from having your information intercepted by anyone while it is
            being transmitted to TradingView or payment processor. While on a secure page, such as our order form, the
            "lock" icon in the browser window is displayed, confirming that a secure and encrypted connection has been
            established with the Website. We work hard to ensure that our Service is secure and that we meet industry
            standards. We also use other safeguards, such as firewalls, authentication systems (i.e. passwords, and
            personal identification numbers), and access control mechanisms to control unauthorized access to systems
            and data. If you have chosen to create an account, you are responsible for doing everything you reasonably
            can to keep your access details secret. You must not share these details with anyone else.
          </div>

          <div className="subSection2midHeader">Governing law</div>

          <div className="subSection2">
            This Policy is governed and construed in accordance with, EU Regulation No. 2016/678 of 26.04.2016,
            California Consumer Privacy Act 2018. (CCPA), California Online Privacy Protection Act of 2003 (CalOPPA) and
            other applicable regulations.
          </div>
          <div className="subSection2">
            Any disputes resulting from or in connection with this Policy are finally resolved in accordance with the
            current legislation of the State of Delaware.
          </div>
          <div className="subSection2midHeader">Warranty and the limitation of the liability</div>
          <div className="subSection2">
            In order to prevent unauthorized or illegitimate access to, disclose or destruction of Personal Data, We
            take reasonable and appropriate measures to protect the Personal Data We collect via the Website.
            Unfortunately, there is no 100 percent safety guarantee for any Data transmission and storage system. Thus,
            We cannot protect or guarantee the safety of any information You provide to Us, although We endeavor to
            protect Your Data.
          </div>
          <div className="subSection2">
            Please be aware that Your Personal Information We provide to other websites are not collected or processed.
            Only the Personal Data You provide to Us on Our Website are collected, processed and stored. You use the
            Website and at Your own risk provide Us with Your information.
          </div>
          <div className="subSection2">
            In the case of any security breaches, device damage or any loss, unauthorized use or failures, We expressly
            exclude any representations and warranties, either expressly or implied.
          </div>
          <div className="subSection2midHeader">Deleting data</div>
          <div className="subSection2">
            Deleting data You have the right to refuse to use our Services and may ask us to delete or remove your
            personal data in certain circumstances. If we share your data with others, we will notify them of the edits
            wherever possible. If prompted, and wherever possible and lawful to do so, we will also notify you with whom
            we have shared your personal data so you can contact them directly if need be. Please see the "User account
            deleting" section for more details.
          </div>
          <div className="subSection2midHeader">Third Party Sites</div>
          <div className="subSection2">
            At our discretion we may add links (web links) to other websites from our Website. These websites can be run
            by third parties with separate and independent privacy policies. We, therefore, have no responsibility nor
            are we liable for any content, activities or privacy policies of these linked sites. We suggest you read the
            privacy policy of each and every site that you visit.
          </div>

          <div className="subSection2midHeader">Supplemental Notice for California Residents</div>
          <div className="subSection2">
            This Supplemental California Privacy Notice only applies to Our Processing of Personal Data that is subject
            to the California Consumer Privacy Act of 2018 (“CCPA”). The CCPA provides California residents with the
            right to know what categories of Personal Data Company has collected about them in the preceding 12 months.
          </div>
          <div className="subSection2">
            For purposes of the CCPA, the Company does not “sell” Personal Data, nor do We have actual knowledge of any
            “sale” of Personal Data of minors under 16 years of age.
          </div>
          <div className="subSection2">
            Opt-out of “Sales”. California residents may opt-out of the “sale” of their Personal Data by contacting Us
            as set forth in “Contact Us” below.
          </div>
          <div className="subSection2">
            Non-Discrimination. California residents have the right not to receive discriminatory treatment by Us for
            the exercise of their rights conferred by the CCPA.
          </div>
          <div className="subSection2">
            Authorized Agent. Only You, or someone legally authorized to act on Your behalf, may make a verifiable
            consumer request related to Your Personal Data. You may also make a verifiable consumer request on behalf of
            Your minor child. To designate an authorized agent, please contact Us as set forth in “Contact Us” below and
            provide written authorization signed by You and Your designated agent.
          </div>
          <div className="subSection2">
            If You are a California resident and would like to exercise any of Your rights under the CCPA, please
            contact Us as set forth in “Contact Us” below. We will process such requests in accordance with applicable
            laws.
          </div>
          <div className="subSection2">
            Accessibility. This Privacy Policy uses industry-standard technologies and was developed in line with the
            World Wide Web Consortium’s Web Content Accessibility Guidelines, version 2.1.
          </div>
          <div className="subSection2">
            California Shine the Light. California “Shine the Light” law permits Users who are California residents to
            request and obtain from Us once a year, free of charge, a list of the Third Parties to whom We have
            disclosed their Personal Data (if any) for their direct marketing purposes in the prior calendar year, as
            well as the type of Personal Data disclosed to those parties.
          </div>
          <div className="subSection2midHeader">Supplemental Notice for EEA and UK users'</div>
          <div className="subSection2">
            Individuals subject to European and United Kingdom ("UK") data protection laws may have data subject rights
            in relation to the personal data we hold on them (described in detail below). This may, in and of itself, be
            subject to limitations and/or restrictions. If you are located in the EEA or UK, please contact us to
            exercise your rights.
          </div>
          <div className="subSection2">
            If prompted, we will confirm whether or not we are processing your personal data and if so, we will provide
            you with a copy of that personal data along with any other pertinent details. If you require additional
            copies, we may need to charge a reasonable fee, but this can be discussed and depends on the situation.
          </div>
          <div className="subSection2">
            You may ask us to restrict or ‘block’ the processing of your personal data in certain circumstances, for
            example, if you contest the accuracy of the data or object to us processing it. We will notify you before we
            lift any restriction on processing. If we share your personal data with others, we will notify them of the
            restriction wherever possible. If prompted, and if it is possible and lawful to do so, we will also notify
            you with whom we have shared or will share your personal data so you can contact them directly.
          </div>
          <div className="subSection2">
            ask us to stop processing your personal data at any time, and we will do so. If we are relying on a
            legitimate interest to process your personal data, then it should not be a problem unless we demonstrate
            compelling legitimate grounds for processing;
          </div>
          <div className="subSection2">
            Authorized Agent. Only You, or someone legally authorized to act on Your behalf, may make a verifiable
            consumer request related to Your Personal Data. You may also make a verifiable consumer request on behalf of
            Your minor child. To designate an authorized agent, please contact Us as set forth in “Contact Us” below and
            provide written authorization signed by You and Your designated agent.
          </div>

          <div className="subSection2midHeader">Changes to this Policy</div>
          <div className="subSection2">
            We may, at Our sole discretion, review this Policy and update it with changes on a regular basis. We
            recommend reviewing Our Policy at least once a month to stay up to date on the latest changes. If We make
            changes that substantially alter Your privacy rights, We will notify You via email, in case We have it.
          </div>
          <div className="subSection2">
            We recommend that You do not use the Website if You disagree with the amendments to this Policy.
          </div>

          <div className="subSection2midHeader">Contact us</div>
          <div className="subSection2">
            Please contact Us if You have any questions or concerns about the Privacy Policy, or if You decide at any
            time that We no longer need to hold any of Your Personal Information.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
