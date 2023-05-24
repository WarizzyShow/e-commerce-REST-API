 const Item = require('../models/productModel');

const newProduct = async(req, res) => {
    try {
    const newItem = new Item({
    ...req.body,
    owner: req.user._id
})
   await newItem.save()
   res.status(201).send(newItem)
} catch (error) {
res.status(400).send({message: "error"})
}
}

const ProductSearch = async(req, res) => {
    try {
    const items = await Item.find({})
    res.status(200).send(items)
  } catch (error) {
    res.status(400).send(error)
  }
  }

  const UpdateItem = async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'category', 'price']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error: 'invalid updates'})
    }

    try {
        const item = await Item.findOne({ _id: req.params.id})
    
        if(!item){
            return res.status(404).send()
        }

        updates.forEach((update) => item[update] = req.body[update])
        await item.save()
        res.send(item)
    } catch (error) {
        res.status(400).send(error)
    }
}

const deletedItem = async(req, res) => {
    try {
        const deletedItem = await Item.findOneAndDelete( {_id: req.params.id} )
   if(!deletedItem) {
    res.status(404).send({error: "Item not found"})
}
   res.send(deletedItem)
} catch (error) {
   res.status(400).send(error)
}
}

module.exports = {
    newProduct,
    ProductSearch,
    UpdateItem,
    deletedItem
}