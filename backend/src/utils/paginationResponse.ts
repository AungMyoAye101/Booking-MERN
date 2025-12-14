export const paginationResponseFormater = (
    page: number,
    limit: number,
    total: number
) => {
    return {
        currentpage: page,
        hasPrev: page > 1,
        hasNext: page < total,
        page,
        limit,
        total,
    }
}