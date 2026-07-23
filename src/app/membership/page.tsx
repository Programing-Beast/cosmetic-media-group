import {ManagedForm} from '@/components/Form'
import {getMembership} from '@/lib/content'
import {createMetadata} from '@/lib/metadata'

const FALLBACK_BENEFITS = [
  {title: 'Exclusive intelligence', description: 'Reports, research, trend analysis and editorial content reserved for members.'},
  {title: 'Practical resources', description: 'Templates, guides, courses and tools designed for aesthetics professionals and businesses.'},
  {title: 'Industry access', description: 'Events, interviews, expert content and opportunities to join important industry conversations.'}
]

export async function generateMetadata() {
  const membership = await getMembership()
  return createMetadata('Membership', 'Membership is coming soon. Register for future access to reports, toolkits, events, courses and editorial content.', membership?.seo)
}

export default async function MembershipPage() {
  const membership = await getMembership()
  const benefits = membership?.benefits?.length ? membership.benefits : FALLBACK_BENEFITS
  return (
    <div className="page-enter">
      <section className="membership-hero">
        <div className="membership-content">
          <span className="coming">{membership?.comingSoonLabel || 'Coming soon'}</span>
          <h1>{membership?.heroTitle || 'Closer to the'} <span className="serif pink">{membership?.heroAccent || 'conversation.'}</span></h1>
          <p>{membership?.intro || 'Future membership will provide access to exclusive reports, toolkits, editorial content, events, education and opportunities designed for industry leaders.'}</p>
          <ManagedForm type="membership" className="membership-signup" successMessage="Thank you. Your interest has been registered.">
            <input type="email" name="email" required placeholder="Your email address" />
            <button className="btn btn-pink" type="submit">Join the waiting list ↗</button>
          </ManagedForm>
        </div>
      </section>
      <section>
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">{membership?.benefitsEyebrow || 'Planned member benefits'}</div>
              <h2>{membership?.benefitsHeading || 'A platform designed to grow with the industry.'}</h2>
            </div>
            <p>{membership?.benefitsIntro || 'The features below are prepared for future phases and will be scoped separately when the membership is ready to launch.'}</p>
          </div>
          <div className="values">
            {benefits.map((benefit, index) => (
              <div className="value" key={benefit.title}>
                <strong>{String(index + 1).padStart(2, '0')}</strong>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
