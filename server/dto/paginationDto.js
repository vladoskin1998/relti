class PaginationDto{
    constructor({street, price, rentOrBuy, currency }){
        this.street=street ? { $regex: street } : { $exists: true, $ne: null };
        this.price=price?.toPrice && price?.fromPrice
            ? { $gte: price?.toPrice, $lte: price?.fromPrice }
            : { $exists: true, $ne: null };
        this.rentOrBuy={ $in: rentOrBuy };
        this.currency=price?.toPrice && price?.fromPrice
            ? { $in: currency }
            : { $exists: true, $ne: null };
    }
}

export default PaginationDto