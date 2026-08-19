import {ManagedForm} from '@/components/Form'
import {getMembership} from '@/lib/content'
import {createMetadata} from '@/lib/metadata'

const FALLBACK_BENEFITS = [
  {title: 'Member intelligence', description: 'Premium reports, deeper trend analysis and early access to annual guides.'},
  {title: 'Practical resources', description: 'Downloadable templates, training sessions, courses and implementation toolkits.'},
  {title: 'Industry access', description: 'Selected events, conversations, opportunities and member-only content.'}
]

export async function generateMetadata() {
  const membership = await getMembership()
  return createMetadata('Membership', 'Membership is coming soon. Register for future access to reports, toolkits, events, courses and editorial content.', membership?.seo, '/membership')
}

export default async function MembershipPage() {
  const membership = await getMembership()
  const benefits = membership?.benefits?.length ? membership.benefits : FALLBACK_BENEFITS
  return (
    <div className="page-enter">
      <section className="membership-hero">
        <div className="membership-content">
          <span className="coming">{membership?.comingSoonLabel || 'Coming soon'}</span>
          <h1>{membership?.heroTitle || 'Closer to the'} <span className="serif pink">{membership?.heroAccent || 'industry.'}</span></h1>
          <p>{membership?.intro || 'A future membership for professionals and brands who want deeper insight, better resources and meaningful access to the conversations shaping aesthetics.'}</p>
          <ManagedForm type="membership" className="membership-signup" successMessage="Thank you. Your interest has been registered.">
            <input type="email" name="email" required placeholder="Join the priority list" />
            <button className="btn btn-pink" type="submit">Keep me informed ↗</button>
          </ManagedForm>
        </div>
      </section>
      <section>
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">{membership?.benefitsEyebrow || 'The future member experience'}</div>
              <h2>{membership?.benefitsHeading || 'Useful access. Not more noise.'}</h2>
            </div>
            <p>{membership?.benefitsIntro || 'The membership is planned around practical value, credible intelligence and the ability to participate more closely in the Cosmetic Media Group ecosystem.'}</p>
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
