import {ManagedForm} from '@/components/Form'
import {PageHero} from '@/components/CommonSections'
import {getMediaDesk} from '@/lib/content'
import {createMetadata} from '@/lib/metadata'

export async function generateMetadata() {
  const data = await getMediaDesk()
  return createMetadata('Media Desk for Journalists', 'Request expert comments, interviews, case studies or background information from trusted professionals across the aesthetics industry.', data?.seo)
}

export default async function MediaDeskPage() {
  const data = await getMediaDesk()
  const requestTypes = data?.requestTypes || [
    {title: 'Expert comments', description: 'Matched to your subject and deadline'},
    {title: 'Interviews', description: 'Clinicians, founders, brands and industry leaders'},
    {title: 'Case studies', description: 'Relevant businesses, treatments and industry perspectives'},
    {title: 'Media resources', description: 'Press information, approved imagery and supporting assets'}
  ]
  const futureResources = data?.futureResources || [
    {title: 'Expert directory', description: 'Searchable profiles organised by specialty, subject and market.'},
    {title: 'Press resources', description: 'Approved biographies, imagery, company information and background documents.'},
    {title: 'Current topics', description: 'Timely expert perspectives linked to industry news and editorial deadlines.'}
  ]
  return <div className="page-enter journalists-page"><PageHero title="Expert access for" accent="journalists." intro={data?.intro || 'Request expert comments, interviews, case studies or background information from trusted professionals across the aesthetics industry.'} crumbs={[{label: 'Home', href: '/'}, {label: 'Media Desk'}]} /><section className="cmg-journalists"><div className="shell cmg-journalists-grid"><div className="cmg-journalists-copy"><div className="cmg-section-no">01 — Media & journalists</div><h2>Find the right expert. <em>Fast.</em></h2><p>Share your subject, deadline and the type of expertise required. Cosmetic Media Group will connect relevant media requests with suitable clinicians, founders, brands and industry leaders.</p><div className="cmg-journalist-details">{requestTypes.map((item) => <div key={item.title}><span>{item.title}</span><b>{item.description}</b></div>)}</div></div><ManagedForm type="mediaRequest" className="cmg-media-request" successMessage="Thank you. Your media request has been sent."><h3>Request a comment or interview.</h3><p>Share the subject, deadline and type of expert required. The request will be routed to the relevant media contact.</p><div className="cmg-request-row"><input type="text" name="name" required placeholder="Your name" /><input type="email" name="email" required placeholder="Work email" /></div><div className="cmg-request-row"><input type="text" name="publication" placeholder="Publication" /><select name="requestType"><option>Expert comment</option><option>Interview request</option><option>Case study</option><option>Background information</option><option>Other media request</option></select></div><input type="text" name="deadline" required placeholder="Deadline" /><textarea name="message" required placeholder="Topic, questions and the expertise you need..." /><button className="btn btn-dark" type="submit">Send media request ↗</button></ManagedForm></div></section><section className="media-desk-resources"><div className="shell"><div className="section-head"><div><div className="eyebrow">Future media resources</div><h2>Everything a journalist needs in one place.</h2></div><p>The platform can later expand to include downloadable press information, approved imagery, biographies, expert directories and current media topics.</p></div><div className="values">{futureResources.map((item, index: number) => <div className="value" key={item.title}><strong>{String(index + 1).padStart(2, '0')}</strong><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></div></section></div>
}
