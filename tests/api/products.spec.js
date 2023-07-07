const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../src/app');
const Product = require('../../src/models/product.model');


describe('API for products', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/idtienda');
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('GET /api/products', () => {

        let response;
        beforeAll(async () => {
            response = await request(app).get('/api/products').send();
        });

        it('should return status 200', () => {
            expect(response.statusCode).toBe(200);
        });

        it('should return a JSON', () => {
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('should return an array', () => {
            expect(response.body).toBeInstanceOf(Array);
        });

    });

    describe('POST /api/products', () => {
        let response;
        const body = { name: 'microondas', description: 'calienta cosas', price: 70, department: 'gama blanca', available: true, stock: 32 };
        beforeAll(async () => {
            response = await request(app).post('/api/products').send(body);
        });

        afterAll(async () => {
            await Product.deleteMany({ department: 'gama blanca' });
        });

        it('should work the url', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('should has defined _id', () => {
            expect(response.body._id).toBeDefined();
        });

        it('should insert same data as body', () => {
            expect(response.body.name).toBe(body.name);
            expect(response.body.description).toBe(body.description);
            expect(response.body.price).toBe(body.price);
            expect(response.body.department).toBe(body.department);
            expect(response.body.available).toBe(body.available);
            expect(response.body.stock).toBe(body.stock);
        });

    });

    describe('PUT /api/products/IDPRODUCT', () => {

        const body = { name: 'microondas', description: 'calienta cosas', price: 70, department: 'gama blanca', available: true, stock: 32 };
        let product;
        let response;
        beforeAll(async () => {
            product = await Product.create(body);
            response = await request(app).put(`/api/products/${product._id}`).send({
                available: false,
                price: 90,
                stock: 3
            });
        });

        afterAll(async () => {
            await Product.findByIdAndDelete(product._id);
        });

        it('should work the url', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('should check the updates in DB', () => {
            expect(response.body.available).toBe(false);
            expect(response.body.price).toBe(90);
            expect(response.body.stock).toBe(3);
        });

    });

    describe('DELETE /api/products/IDPRODUCT', () => {

        const body = { name: 'microondas', description: 'calienta cosas', price: 70, department: 'gama blanca', available: true, stock: 32 };
        let product;
        let response;

        beforeAll(async () => {
            product = await Product.create(body);
            response = await request(app).delete(`/api/products/${product._id}`).send();
        });

        afterAll(async () => {
            await Product.findByIdAndDelete(product._id);
        });

        it('should work the url', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it("shouldn't be product in DB", async () => {
            const deletedProduct = await Product.findById(product._id);
            expect(deletedProduct).toBeNull();
        });

    });

});