import Link from 'next/link'
import {NewsletterBand, PageHero} from '@/components/CommonSections'
import {getBrands} from '@/lib/content'
import {createMetadata} from '@/lib/metadata'
import {imageAlt, imageUrl} from '@/sanity/lib/image'

export const metadata = createMetadata('Our Brands', 'A connected portfolio spanning strategic communications, independent editorial, recognition, production and education.')

export default async function OurBrandsPage() {
  const brands = await getBrands()
  return <div className="page-enter"><PageHero title="One group." accent="Distinct platforms." intro="A connected portfolio spanning strategic communications, independent editorial, recognition, production and education." crumbs={[{label: 'Home', href: '/'}, {label: 'Our Brands'}]} /><section><div className="shell"><div className="brand-grid">{brands.map((brand) => {const href = brand.href || '#'; const external = brand.external || /^https?:/.test(href); const content = <><img src={imageUrl(brand.image, 1000, 800)} alt={imageAlt(brand.image, brand.title)} /><div className="eyebrow" style={{color: '#fff'}}>{brand.type}</div><div><h3>{brand.title}</h3><p>{brand.description}</p><span className="btn btn-white">Explore {brand.title} ↗</span></div></>; return external ? <a className="brand-card" href={href} target="_blank" rel="noreferrer" key={brand.slug}>{content}</a> : <Link className="brand-card" href={href === '#' ? '/our-brands' : href} key={brand.slug}>{content}</Link>})}</div></div></section><NewsletterBand /></div>
}
