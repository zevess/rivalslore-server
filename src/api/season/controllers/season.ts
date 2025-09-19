/**
 * season controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::season.season', ({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params

        const entity = await strapi.db.query('api::season.season').findOne({
            where: { slug: id },
            populate: {
                cover:{
                    fields: ['url', 'alternativeText']
                },

                season_stories: {
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
