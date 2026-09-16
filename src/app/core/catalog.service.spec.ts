import { CatalogService } from './catalog.service';

describe('CatalogService', () => {
  const service = new CatalogService();

  it('filters articles by name without being case sensitive', () => {
    const results = service.filter('HUILE', '');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(item => `${item.name} ${item.shortDescription}`.toLocaleLowerCase('fr').includes('huile'))).toBe(true);
  });

  it('combines category and text filters', () => {
    const results = service.filter('pot', 'Saveurs');
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe('mon-pot-epices');
  });
});
