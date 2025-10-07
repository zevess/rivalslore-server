/**
 * storyline controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::storyline.storyline', ({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params

        const entity = await strapi.db.query('api::storyline.storyline').findOne({
            where: { slug: id },
            populate: {
                season: {
                    populate: {
                        cover: {
                            fields: ['url', 'alternativeText']
                        },
                    }
                }
            },
        })
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity)
    }
}));
