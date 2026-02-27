import type { Metadata } from "next";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy — Garden Prayer Campaign Engine",
  description:
    "Privacy Policy for the Garden Prayer Campaign Engine, a marketing automation platform by Garden Prayer Publishing LLC.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.company}>Garden Prayer Publishing LLC</div>
          <h1 className={styles.headerTitle}>Privacy Policy</h1>
          <p className={styles.effective}>
            Effective Date: February 23, 2026 &nbsp;|&nbsp; Last Updated:
            February 23, 2026
          </p>
        </div>
      </header>

      {/* Main content */}
      <div className={styles.main}>
        <section className={styles.section}>
          <h2>1. Introduction</h2>
          <p>
            Garden Prayer Publishing LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
            or &ldquo;our&rdquo;) operates the Garden Prayer Campaign Engine
            (&ldquo;Campaign Engine&rdquo;), a marketing automation platform
            accessible at{" "}
            <a href="https://campaigns.gardenprayerpublishing.com">
              campaigns.gardenprayerpublishing.com
            </a>
            . This Privacy Policy explains how we collect, use, store, and
            protect information when you use the Campaign Engine, including its
            integration with Meta platforms (Facebook and Instagram).
          </p>
          <p>
            By using the Campaign Engine, you agree to the practices described in
            this policy. If you do not agree with this policy, please do not use
            the Campaign Engine.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Information We Collect</h2>

          <h3>2.1 Information You Provide</h3>
          <ul>
            <li>
              <strong>Account information:</strong> Name and email address used
              to access the Campaign Engine.
            </li>
            <li>
              <strong>Business information:</strong> Business name, industry,
              target audience details, and marketing strategy content entered
              into campaign playbooks.
            </li>
            <li>
              <strong>Content:</strong> Text, images, and other media you create
              or upload for social media campaigns.
            </li>
          </ul>

          <h3>2.2 Information from Meta Platforms</h3>
          <p>
            When you connect your Meta (Facebook/Instagram) account to the
            Campaign Engine, we access the following data through the Meta Graph
            API with your explicit authorization:
          </p>

          <table>
            <thead>
              <tr>
                <th>Data Type</th>
                <th>Purpose</th>
                <th>Meta Permission</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>List of Facebook Pages you manage</td>
                <td>Allow you to select which Page to post to</td>
                <td>pages_show_list</td>
              </tr>
              <tr>
                <td>Page content and engagement metrics</td>
                <td>
                  Measure post performance and optimize future content
                </td>
                <td>pages_read_user_content</td>
              </tr>
              <tr>
                <td>Ability to publish to your Page</td>
                <td>Create and schedule posts on your behalf</td>
                <td>pages_manage_posts</td>
              </tr>
              <tr>
                <td>Instagram business profile information</td>
                <td>
                  Identify linked Instagram account for cross-posting
                </td>
                <td>instagram_basic</td>
              </tr>
              <tr>
                <td>Ability to publish to Instagram</td>
                <td>
                  Create and schedule Instagram posts on your behalf
                </td>
                <td>instagram_content_publish</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.highlightBox}>
            <p>
              We only access the Meta data necessary to provide the Campaign
              Engine&apos;s features. We do not access your personal Facebook
              profile, private messages, friend lists, or any data unrelated to
              Page and Instagram management.
            </p>
          </div>

          <h3>2.3 Automatically Collected Information</h3>
          <ul>
            <li>
              <strong>Usage data:</strong> Pages visited within the Campaign
              Engine, feature interactions, and timestamps.
            </li>
            <li>
              <strong>Performance data:</strong> Post engagement metrics (likes,
              comments, shares, reach) collected from Meta&apos;s API to score
              content performance.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>
              <strong>Operate the Campaign Engine:</strong> Create, schedule, and
              publish social media content to your connected Facebook Page and
              Instagram account.
            </li>
            <li>
              <strong>Generate content:</strong> Use your playbook strategy
              (audience segments, messaging pillars, brand positioning) to
              generate AI-powered social media posts tailored to your business.
            </li>
            <li>
              <strong>Analyze performance:</strong> Score published posts based
              on engagement data to inform recommendations and improve future
              content generation.
            </li>
            <li>
              <strong>Automate scheduling:</strong> Queue posts at optimal times
              for each platform based on your configured cadence and timezone.
            </li>
            <li>
              <strong>Maintain your connection:</strong> Manage and refresh Meta
              access tokens to ensure uninterrupted service.
            </li>
          </ul>

          <div className={styles.highlightBox}>
            <p>
              We do not sell, rent, or share your data with third parties for
              advertising or marketing purposes. Your Meta data is used solely to
              provide Campaign Engine services to you.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>4. Data Storage and Security</h2>
          <ul>
            <li>
              <strong>Hosting:</strong> The Campaign Engine is hosted on Vercel
              with data stored in Supabase (PostgreSQL), both utilizing
              industry-standard encryption in transit (TLS) and at rest.
            </li>
            <li>
              <strong>Access tokens:</strong> Meta access tokens are stored
              securely in our database and are only used to perform authorized
              actions on your behalf. Tokens are automatically refreshed before
              expiration.
            </li>
            <li>
              <strong>Access control:</strong> The Campaign Engine is
              access-controlled. Only authenticated users can view or manage
              campaign data.
            </li>
            <li>
              <strong>Retention:</strong> We retain your data for as long as your
              account is active. Upon disconnecting your Meta account or
              requesting data deletion, we remove associated Meta tokens and
              cached platform data within 30 days.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>5. Data Sharing</h2>
          <p>
            We do not share your personal information or Meta data with third
            parties except in the following limited circumstances:
          </p>
          <ul>
            <li>
              <strong>Service providers:</strong> We use Vercel (hosting),
              Supabase (database), and Anthropic (AI content generation) as
              infrastructure providers. These services process data on our behalf
              under their respective privacy policies and data processing
              agreements.
            </li>
            <li>
              <strong>Meta Platforms:</strong> Content you create and approve is
              published to your Facebook Page and/or Instagram account through
              Meta&apos;s API, as directed by you.
            </li>
            <li>
              <strong>Legal requirements:</strong> We may disclose information if
              required by law, court order, or governmental regulation.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>6. Your Rights and Controls</h2>
          <p>You have the following rights regarding your data:</p>
          <ul>
            <li>
              <strong>Disconnect Meta:</strong> You can disconnect your Meta
              account from the Campaign Engine at any time through the business
              settings page. This revokes our access to your Facebook Page and
              Instagram account.
            </li>
            <li>
              <strong>Revoke via Facebook:</strong> You can remove the Campaign
              Engine&apos;s access at any time through{" "}
              <a href="https://www.facebook.com/settings/?tab=business_tools">
                Facebook Settings &rarr; Business Integrations
              </a>
              .
            </li>
            <li>
              <strong>Data deletion:</strong> You may request deletion of your
              data by contacting us at the email address below. We will process
              deletion requests within 30 days.
            </li>
            <li>
              <strong>Access and portability:</strong> You may request a copy of
              the data we hold about you by contacting us.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>7. Meta Platform Terms</h2>
          <p>
            Our use of information received from Meta APIs adheres to the{" "}
            <a href="https://developers.facebook.com/terms/">
              Meta Platform Terms
            </a>{" "}
            and{" "}
            <a href="https://developers.facebook.com/devpolicy/">
              Developer Policies
            </a>
            , including:
          </p>
          <ul>
            <li>
              We only request permissions necessary to provide Campaign Engine
              functionality.
            </li>
            <li>
              We do not use Meta data for purposes unrelated to the Campaign
              Engine&apos;s core features.
            </li>
            <li>We do not sell Meta user data to third parties.</li>
            <li>
              We do not use Meta data for surveillance or to discriminate against
              individuals.
            </li>
            <li>
              We provide a mechanism for users to request deletion of their data.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>8. Data Deletion Requests</h2>
          <p>
            To comply with Meta Platform requirements, we support data deletion
            requests. If you wish to have your data deleted:
          </p>
          <ul>
            <li>
              Disconnect your Meta account from the Campaign Engine, or
            </li>
            <li>
              Remove the Garden Prayer Campaigns app from your{" "}
              <a href="https://www.facebook.com/settings/?tab=business_tools">
                Facebook Business Integrations
              </a>
              , or
            </li>
            <li>
              Email us at the address below with the subject line &ldquo;Data
              Deletion Request&rdquo;
            </li>
          </ul>
          <p>
            Upon receiving a deletion request, we will delete your Meta-related
            data (access tokens, page information, post metrics, and cached
            content) within 30 days. We will confirm deletion via email.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Children&apos;s Privacy</h2>
          <p>
            The Campaign Engine is a business tool and is not directed at
            children under 13. We do not knowingly collect personal information
            from children under 13. If we learn that we have collected such
            information, we will take steps to delete it promptly.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            users of material changes by posting the updated policy at this URL
            and updating the &ldquo;Last Updated&rdquo; date above. Continued
            use of the Campaign Engine after changes constitutes acceptance of
            the revised policy.
          </p>
        </section>

        <section className={styles.section}>
          <h2>11. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or wish to exercise
            your data rights, please contact us:
          </p>
          <div className={styles.highlightBox}>
            <p>
              <strong>Garden Prayer Publishing LLC</strong>
              <br />
              14205 Burnet Rd Ste 570
              <br />
              Austin, TX 78728
              <br />
              United States
              <br />
              <br />
              Email:{" "}
              <a href="mailto:privacy@gardenprayerpublishing.com">
                privacy@gardenprayerpublishing.com
              </a>
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <p>&copy; 2026 Garden Prayer Publishing LLC. All rights reserved.</p>
        <p>
          <a href="https://campaigns.gardenprayerpublishing.com">
            Campaign Engine
          </a>{" "}
          &nbsp;|&nbsp;{" "}
          <a href="https://gardenprayerpublishing.com">
            Garden Prayer Publishing
          </a>
        </p>
      </div>
    </div>
  );
}
