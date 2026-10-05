import { services } from '@/content/services';
import { insights } from '@/content/insights';
import type { Locale, Service, Insight } from './types';

export interface ContentRepository {
  listServices(locale: Locale): Promise<Service[]>;
  getService(locale: Locale, slug: string): Promise<Service | null>;
  listInsights(locale: Locale): Promise<Insight[]>;
  getInsight(locale: Locale, slug: string): Promise<Insight | null>;
}
export const contentRepository: ContentRepository = {
  async listServices() { return services; },
  async getService(_locale, slug) { return services.find((service) => service.slug === slug) ?? null; },
  async listInsights() { return insights; },
  async getInsight(_locale, slug) { return insights.find((insight) => insight.slug === slug) ?? null; },
};

