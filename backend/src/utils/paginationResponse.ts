export const paginationResponseFormater = (
    page: number,
    limit: number,
    total: number
) => {
    return {
        page: page,
        limit:limit,
        total:total,
        totalPages:Math.ceil(total / limit),
        hasPrev: page > 1,
        hasNext: page * limit < total,

      
    }
}