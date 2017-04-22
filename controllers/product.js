import Product from '../models/product';

export const indexProducts = (req, res, next) => {
  Product.find()
    .then(docs => res.send({ docs }))
    .catch(next);
};
