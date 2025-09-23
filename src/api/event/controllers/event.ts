/**
 * event controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::event.event', ({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params

        const entity = await strapi.db.query('api::event.event').findOne({
            where: { slug: id },
            populate: {
                season: true,
                event_stories: {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"]
                        }
                    }
                }
            },
        })
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity)
    }
}));
