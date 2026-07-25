import {ContactForm, PageHero} from '@/components/CommonSections'
import {getSiteSettings} from '@/lib/content'
import {createMetadata} from '@/lib/metadata'

export const metadata = createMetadata('Contact', 'Tell us about your ambitions, your audience and the conversation you want to lead.', undefined, '/contact')

export default async function ContactPage() {
  const settings = await getSiteSettings()
  return <div className="page-enter"><PageHero title="Let’s shape what comes" accent="next." intro="Tell us about your ambitions, your audience and the conversation you want to lead." crumbs={[{label: 'Home', href: '/'}, {label: 'Contact'}]} /><section><div className="shell contact-grid"><div className="contact-info"><div className="eyebrow">Start a conversation</div><h2>For brands and experts ready to influence the industry.</h2><p>Whether you are looking for strategic PR, personal positioning, premium content, media training, podcast production, an event partner or a broader integrated campaign, share your brief below.</p><div className="contact-details"><div className="contact-item"><small>Email</small><b>{settings.email}</b></div><div className="contact-item"><small>Telephone</small><b>{settings.phone}</b></div><div className="contact-item"><small>Markets</small><b>{settings.locations}</b></div></div></div><ContactForm /></div></section></div>
}
