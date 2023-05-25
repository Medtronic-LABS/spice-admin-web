import styles from './PrivacyPolicy.module.scss';
import { ReactComponent as Logo } from '../../assets/images/app-logo.svg';

const PrivacyPolicy = () => {
  return (
    <div className={styles.privacyContainer}>
      <div className='container'>
        <Logo aria-labelledby='Medtronics' className={styles.logo} />
        <h1 className={styles.privacyTitle}>Privacy Statement</h1>
        <br />
        <h3 className={styles.privacyHeader}>
          <strong>Please read this privacy statement carefully.</strong>
        </h3>
        <br />
        <h3 className={styles.privacyHeader}>
          <strong>INTRODUCTION</strong>
        </h3>
        <div className={styles.privacyText}>
          <p>
            This Privacy Statement tells you how we protect and use information that we gather through MEDTRONIC LABS
            SPICE Mobile Application (the “Application” or “App”). This Privacy Statement is intended for a global
            audience.
          </p>
          <p>
            This Privacy Statement was last revised on July 29, 2022. We may change the Privacy Statement at any time
            and for any reason.
          </p>
          <p>
            Except as written in any other disclaimers, policies, terms of use, or other notices in an Application, this
            Privacy Statement is a complete agreement between you and MEDTRONIC LABS with respect to your use of the
            Application. By using MEDTRONIC LABS SPICE Mobile Application (the “Application” or “App”), you agree to the
            terms of the most recent version of this Privacy Statement. You may be subject to additional terms that may
            apply when you access particular services or materials on certain areas in this Application, or by following
            a link from this Application.
          </p>
          <p>
            The Applications are owned and operated by MEDTRONIC LABS. MEDTRONIC LABS is the name we use to refer to our
            whole business, including MEDTRONIC LABS PBC and any of the companies that it controls, such as its
            subsidiaries and affiliates. When we use the words "we" or "our," we mean MEDTRONIC LABS. The information we
            receive, and how we use it, depends on what you do when using the Application.
          </p>
          <p>
            We collect and use both personal information (information that is identifiable to you personally) and
            non-personal information about you through the application. Please see below for a definition of personal
            and non-personal information, and how MEDTRONIC LABS may use them.
          </p>
        </div>
        <h3 className={styles.privacyHeader}>
          <strong>WHAT IS PRIVATE INFORMATION</strong>
        </h3>
        <p className={styles.privacyText}>
          Personal information is information that we can use to specifically identify you, such as your:
        </p>
        <ul className={styles.privacyText}>
          <li>First Name</li>
          <li>Last Name</li>
          <li>City/Town name</li>
          <li>Telephone number</li>
          <li>Email</li>
          <li>Date of birth</li>
          <li>Account name</li>
          <li>Geolocation information</li>
          <li>Health condition(s) and related health data</li>
          <li>Biometric data</li>
          <li>Hospital/clinic name, address, and phone number</li>
          <li>Information about how you use the App, such as links or functions you may access within the App</li>
        </ul>
        <h3 className={styles.privacyHeader}>
          <strong>HOW DOES MEDTRONIC LABS COLLECT AND USE YOUR PERSONAL INFORMATION?</strong>
        </h3>
        <p className={styles.privacyText}>
          We may collect and use personal information from you through this App to provide you with access to the App.
          You may choose not to provide us with this information, but then you may not be able to access and utilize the
          App. In addition, we may keep and use your personal information:
        </p>
        <ul className={styles.privacyText}>
          <li>If you are a Patient, to transmit data to your Health Care Provider</li>
          <li>To provide services to you through the App</li>
          <li>To send you notifications</li>
          <li>To respond to your requests</li>
          <li>To develop records, including records of your personal information</li>
          <li>
            To analyze how people use our App and to research, develop, and improve programs, products, services, and
            content
          </li>
          <li>
            To create a set of data that has only non-personal or de-identified information. In this case, we would
            remove your personal identifiers (your name, email address, biometric data, etc.) and we may treat it like
            other non-personal or de-identified information
          </li>
          <li>To enforce this Privacy Statement and other rules about your use of this App</li>
          <li>To protect our rights or property</li>
          <li>To protect someone's health, safety, or welfare</li>
          <li>To comply with a law or regulation, court order or other legal process</li>
        </ul>
        <h3 className={styles.privacyHeader}>
          <strong>DOES MEDTRONIC LABS EVER SHARE PERSONAL INFORMATION WITH THIRD PARTIES?</strong>
        </h3>
        <div className={styles.privacyText}>
          <p>
            MEDTRONIC LABS will not share your personal information collected from the App with an unrelated third-party
            without your permission, except as otherwise provided in this Privacy Statement. MEDTRONIC LABS may share
            de-identified information with approved partners and affiliates for purposes that are consistent with those
            identified in this Privacy Statement.
          </p>
          <p>
            In the ordinary course of business, we will share some personal information with companies that we hire to
            perform services or functions on our behalf. In all cases in which we share your personal information with a
            third-party, we will not authorize them to keep, disclose or use your information with others except for the
            purpose of providing the services we asked them to provide.{' '}
          </p>
          <p>
            We may be legally compelled to release your personal information in response to a court order, subpoena,
            search warrant, law, or regulation. We may cooperate with law enforcement authorities in investigating and
            prosecuting Application users who violate our rules or engage in behavior which is harmful to other visitors
            (or illegal). In addition, we may keep, disclose, and use your personal information in order to comply with
            U.S. FDA and other governmental guidance, directions, regulations, and laws.
          </p>
          <p>
            We may disclose your personal information to third parties if we feel that the disclosure is necessary to:
          </p>
        </div>
        <ul className={styles.privacyText}>
          <li>Enforce this Privacy Statement and the other rules about your use of the App</li>
          <li>Protect our rights or property</li>
          <li>Protect someone's health, safety, or welfare</li>
          <li>Comply with a law or regulation, court order or other legal process</li>
        </ul>
        <h3 className={styles.privacyHeader}>
          <strong>TRANSFERS BETWEEN COUNTRIES</strong>
        </h3>
        <ul className={styles.privacyText}>
          <li>
            <strong>
              <span>For West- and East African Users:</span>
            </strong>
            <span>
              {' '}
              By accepting this, you are giving us authorization to receive, process, and use your personal information,
              including sensitive data, and also transfer the data out of your country to our affiliates and
              subsidiaries internationally, or third parties hired by MEDTRONIC LABS to manage the App.
            </span>
          </li>
        </ul>
        <h3 className={styles.privacyHeader}>
          <strong>WHAT DOES MEDTRONIC LABS DO WITH NON-PERSONAL INFORMATION?</strong>
        </h3>
        <p className={styles.privacyText}>
          Non-personal information is information that cannot identify you. We are always looking for ways to better
          serve you and improve this App. We will use non-personal information from you to help us make this App more
          useful to visitors. We also will use non-personal information for other business purposes. For example, we may
          use non-personal information or aggregate non-personal information to:
        </p>
        <ul className={styles.privacyText}>
          <li>Create reports for internal use to develop programs, products, services, or content</li>
          <li>Share it with or sell it to third parties</li>
          <li>
            Provide aggregated information on how visitors use our site, such as 'traffic statistics' and 'response
            rates,' to third parties
          </li>
        </ul>
        <h3 className={styles.privacyHeader}>
          <strong>WHAT ABOUT PRIVACY ON OTHER APPLICATIONS?</strong>
        </h3>
        <p className={styles.privacyText}>This application does not contain links to other apps or websites.</p>
        <h3 className={styles.privacyHeader}>
          <strong>ARE THERE SPECIAL RULES ABOUT CHILDREN'S PRIVACY?</strong>
        </h3>
        <p className={styles.privacyText}>
          We care about protecting the online privacy of children. We will not intentionally collect any personal
          information (such as a child's name or e-mail address) from children under the age of 18 unless a parent or
          legal guardian has provided consent for us to do so. If you think that we have unlawfully collected personal
          information from a child under the age of 18, please contact us. For West- and East African users, please
          notify us regarding children under the age of 18.
        </p>
        <h3 className={styles.privacyHeader}>
          <strong>WHAT ABOUT APPLICATION SECURITY?</strong>
        </h3>
        <p className={styles.privacyText}>
          Security is very important to us. We also understand that security is important to you. We take reasonable
          steps to protect your personal information from loss, misuse, and unauthorized access, disclosure, alteration,
          or destruction. You should keep in mind that no Internet transmission is ever 100% secure or error-free. You
          acknowledge that you are responsible for maintaining the confidentiality and security of any of your data
          available via the App on your mobile device, by using an ID and password credentials for your mobile device.
        </p>
        <h3 className={styles.privacyHeader}>
          <strong>HOW TO CONTACT MEDTRONIC LABS</strong>
        </h3>

        <span className={styles.privacyText}>
          If you have questions or comments about this Privacy Statement, please contact us{' '}
        </span>
        <span>
          <a href='mailto:privayandsecurity@medtroniclabs.org' style={{ color: 'blue', textDecoration: 'underline' }}>
            <span>here</span>
          </a>
        </span>

        <p>
          <span className={styles.privacyText}>
            You may use the Contact Us form on our website to exercise your rights to access, rectify, update, and/or
            eliminate your personal information or ask for non-disclosure (
          </span>
          <span>
            <a href='https://www.medtroniclabs.org' style={{ color: 'blue', textDecoration: 'underline' }}>
              <span>www.medtroniclabs.org</span>
            </a>
          </span>
          <span className={styles.privacyText}>
            ). Elimination may not be possible if it can cause damage to third parties or if preserving your personal
            information is required by any law or regulation.
          </span>
        </p>
        <p className={styles.privacyText}>
          Disclaimer: This page may include information about products that may not be available in your region or
          country. Please consult the approved indications for use. Content on specific MEDTRONIC LABS products is not
          intended for users in markets that do not have authorization for use.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
