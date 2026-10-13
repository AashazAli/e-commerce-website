import { z } from "zod";


export const createWishlistSchema = z.object({

    productId: z
        .number()
        .int()
        .positive()

});