/**
 * location controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::location.location', ({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params

        const entity = await strapi.db.query('api::location.location').findOne({
            where: { slug: id },
            populate: {
                preview:{
                    fields: ['url', 'alternativeText']
                },
                gallery: {
                    fields: ["url", "alternativeText"],
                },
                location_stories: {
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
