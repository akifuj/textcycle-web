import express from 'express';
import post from '../../models/post'

let router = express.Router();

router.post('/', (request, response) => {
  const { user_id, buyer_id, title, author, publisher, listPrice, category, condition, price, image } = request.body
  new post({ user_id, buyer_id, title, author, publisher, listPrice, category, condition, price, image }).save(err => {
    if (err) response.status(500).send(err)
    else response.status(200).send(`${title} was successfully created.`)
  })
})

router.get('/', (request, response) => {
  post.find({ buyer_id: "" }, (err, postsArray) => {
    if (err) response.status(500).send();
    else response.status(200).send(postsArray);
  })
})

router.get('/private/:user_id', (request, response) => {
  post.find({ user_id: request.params.user_id }, (err, postsArray) => {
    if (err) response.status(500).send();
    else response.status(200).send(postsArray);
  })
})

router.get('/text/:text', (request, response) => {
  const { text } = request.params.text
  post.find({ $and: [{ $or: [ { title: request.params.text }, { author: request.params.text } ] }, {buyer_id: ""}] }, (err, postsArray) => {
    if (err) response.status(500).send();
    else response.status(200).send(postsArray);
  })
})

router.get('/category/:category', (request, response) => {
  post.find({ $and: [ { category: request.params.category }, {buyer_id: ""} ] }, (err, postsArray) => {
    if (err) response.status(500).send();
    else response.status(200).send(postsArray);
  })
})

router.put('/:id', (request, response) => {
  post.findByIdAndUpdate(request.params.id, { $set: request.body }, err => {
    if (err) response.status(500).send()
    else response.status(200). send()
  })
})

router.delete('/:id', (request, response) => {
  post.findByIdAndRemove(request.params.id, err => {
    if (err) response.status(500).send(err);
    else response.status(200).send();
  })
})

/*
router.get('/all/:number', (request, response) => {
  post.find({})
  .limit(parseInt(request.params.number))
  .exec(function (err, postsArray) {
    if (err) response.status(500).send();
    else response.status(200).send(postsArray);
  })
})
*/

export default router;
