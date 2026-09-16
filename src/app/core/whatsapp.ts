import { SITE_CONFIG } from './site.config';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SITE_CONFIG.whatsappDigits}?text=${encodeURIComponent(message)}`;
}

export function articleWhatsAppUrl(name: string): string {
  return buildWhatsAppUrl(`Bonjour Zakiya Bio, je souhaite avoir plus d’informations concernant l’article : ${name}.`);
}
