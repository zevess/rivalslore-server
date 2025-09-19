/**
 * hero controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::hero.hero', ({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params

        const entity = await strapi.db.query('api::hero.hero').findOne({
            where: { slug: id },
            populate: {
                signature: {
                    fields: ["url", "alternativeText"],
                },
                logo: {
                    fields: ["url", "alternativeText"],
                },
                portrait: {
                    fields: ["url", "alternativeText"],
                },
                prestige: {
                    fields: ["url", "alternativeText"],
                },
                silhouette: {
                    fields: ["url", "alternativeText"],
                },
                hero_stories: {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"]
                        }
                    }
                }
            },
        })
        //['logo', 'signature', 'portrait', 'prestige', 'silhouette', 'hero_stories']
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity)
    }
}));
