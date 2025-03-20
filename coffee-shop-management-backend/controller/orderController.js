const Order = require('../model/Orders');
const OrderItem = require('../model/OrderItem');
const Product = require('../model/coffeeProduct');

async function getNextOrderId() {
    const lastOrder = await Order.findOne({}, {}, { sort: { id: -1 } });

    let newId = "O001";
    
    if (lastOrder && lastOrder.id) {
        const lastIdNum = parseInt(lastOrder.id.slice(1), 10); 
        const nextIdNum = lastIdNum + 1;

        newId = `O${nextIdNum.toString().padStart(3, '0')}`;
    }

    return newId;
}

const placeOrder = async (req, res) => {
    try {
        const { totalPrice, orderItems, customerName, customerAddress, customerContact } = req.body;

        const orderId = await getNextOrderId();

        const newOrder = new Order({
            id: orderId, 
            order_id: orderId,
            totalPrice,
            customerName,
            customerAddress,
            customerContact,
            createdAt: new Date()
        });
        await newOrder.save();

        const orderItemsData = orderItems.map(item => ({
            id: orderId, 
            productId: item.productId, 
            quantity: item.quantity,
            price: item.price
        }));

        await OrderItem.insertMany(orderItemsData);

        await updateQty(orderItemsData)

        res.status(201).json({ message: 'Order placed successfully', orderId });
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error: error.message });
    }
};

async function updateQty(orderItemsData, res) {
    try {
        for (const item of orderItemsData) {
            const { productId, quantity } = item;

            const product = await Product.findOne({ id: productId });

            if (!product) {
                if (res) {
                    return res.status(404).json({ message: `Product ${productId} not found` });
                } else {
                    throw new Error(`Product ${productId} not found`);
                }
            }

            let updatedQty = product.qty - quantity;

            await Product.updateOne({ id: productId }, { $set: { qty: updatedQty } });
        }
        if (res) {
            return res.status(200).json({ message: "Stock updated successfully" });
        }
    } catch (error) {

        if (res) {
            return res.status(500).json({ message: 'Error placing order', error: error.message });
        } else {
            throw error; 
        }
    }
}

const getAll = async (req, res) => {
    try {
        const orders = await Order.find({}, { id: 1, totalPrice: 1, customerName: 1, customerAddress: 1,  customerContact : 1, status: 1, createdAt: 1 }); 
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
}

const getByOrderId = async (req, res) => {
    try {
        const { id } = req.params;

        const orderItems = await OrderItem.find({ id });

        if (orderItems.length === 0) {
            return res.status(404).json({ message: 'No order items found for this order' });
        }

        res.status(200).json(orderItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order items', error: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.params;
        
        const orderItems = await OrderItem.find({ id });

        if (orderItems.length === 0) {
            return res.status(404).json({ message: 'No order items found for this order' });
        }

        await Order.updateOne({ id }, { $set: { status } });

        res.status(200).json(orderItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order items', error: error.message });
    }
};

const deleteByOrderId = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findOne({ id });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        await Order.deleteOne({ id });
        await OrderItem.deleteMany({ id: id });
        res.status(200).json("orderItems");

    } catch (error) {
        res.status(500).json({ message: 'Error fetching order items', error: error.message });
    }
};
exports.placeOrder = placeOrder;
exports.getByOrderId = getByOrderId;
exports.getAll = getAll;
exports.deleteByOrderId = deleteByOrderId;
exports.updateStatus = updateStatus;
