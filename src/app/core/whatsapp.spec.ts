import { articleWhatsAppUrl, buildWhatsAppUrl } from './whatsapp';

describe('WhatsApp links', () => {
  it('encodes message content safely', () => {
    const url = buildWhatsAppUrl('Bonjour & merci !');
    expect(url).toContain('Bonjour%20%26%20merci%20!');
    expect(url).toContain('2250707810824');
  });

  it('includes the selected article name', () => {
    expect(decodeURIComponent(articleWhatsAppUrl('Huile de coco'))).toContain('Huile de coco');
  });
});
