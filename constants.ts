import { NavItem, Service, Project } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Expertise', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Get a Quote', href: '#contact' },
  { label: 'Contact', href: '#contact' },
];

export const SERVICES: Service[] = [
  {
    id: 1,
    title: 'High-End Finishing',
    description: 'Impeccable detailing for luxury residential interiors using premium eco-friendly paints.',
    icon: 'brush',
  },
  {
    id: 2,
    title: 'Commercial Spaces',
    description: 'Transforming retail and office environments with bold colors and durable coatings.',
    icon: 'briefcase',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'The Gilded Loft',
    category: 'Residential',
    imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Onyx Corporate',
    category: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Marble Hallway',
    category: 'Residential',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Azure Penthouse',
    category: 'Residential',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
  },
];